<?php

namespace App\API;

class OrderController
{
	public function index($req, $res)
	{
		$queryParams = $req->getQueryParams();
		$page = isset($queryParams["page"]) ? --$queryParams["page"] : 1;
		$record = db()->read("`order`")
			->where("`status` not in ('canceled', 'finished')")
			->orderBy("`created_at` desc")
			->offset($page * 10)->limit(10)
			->add()->run();

		$count = db()->fetchMode("column")->column("count(id)")->read("`order`")->add()->run();
		$count = $count[0] ? $count[0] : 0;

		foreach ($record as $key => $value) {
			$orderItems = db()->read("order_item")
				->where("`order_id`=:order_id")->binding(["order_id" => $value["id"]])
				->add()->run();

			$record[$key]["order_items"] = $orderItems;

			foreach ($orderItems as $addedKey =>  $addedValue) {
				$product = db()->read("product")
					->where("`id`=:id")->binding(["id" => $addedValue["product_id"]])
					->add()->run();

				$product = $product ? $product[0] : [];

				$record[$key]["order_items"][$addedKey]["product"] = $product;
			}
		}

		return json([
			"orders" => $record,
			"count" => $count,
		], 201);
	}

	public function show($req, $res, $params)
	{
		$record = db()->read("order")
			->where("`id`=:id")->binding(["id" => $params["id"]])
			->add()->run();

		$record = $record ? $record[0] : [];

		if ($record) {
			$record["order_items"] = db()->read("order_item")
				->where("`order_id`=:order_id")->binding(["order_id" => $record["order_id"]])
				->add()->run();
		}

		return json($record, 201);
	}

	public function store($req, $res)
	{
		$post = $req->getParsedBody();
		$post["order_item"] = json_decode($post["order_item"], true);

		$post["id"] = text()->unique();
		$post["created_at"] = strtotime("now");
		$post["total"] = 0;

		foreach ($post["order_item"] as $value) {
			$post["total"] += $value["total"];
		}
		if (!$post["order_item"])
			return json(["status" => "error", "message" => "Order must have at least 1 item."]);

		foreach ($post["order_item"] as $orderItem) {
			if ($error = orderItemValidator()->store($orderItem))
				return json(["status" => "error", "error" => $error]);
		}

		if ($error = orderValidator()->store($post))
			return json(["status" => "error", "error" => $error]);

		foreach ($post["order_item"] as $orderItem) {
			$orderItem["id"] = text()->unique();
			$orderItem["order_id"] = $post["id"];
			$orderItem["created_at"] = strtotime("now");
			if ($error = orderItemValidator()->store($orderItem))
				return json(["status" => "error", "error" => $error]);
		}

		$orderItems = $post["order_item"];
		unset($post["order_item"]);

		db()->insert("`order`")->set($post)->binding($post)
			->add()->run();

		$dbOrderItem = db();
		foreach ($orderItems as $orderItem) {
			unset($orderItem["name"]);
			$orderItem["id"] = text()->unique();
			$orderItem["order_id"] = $post["id"];
			$orderItem["created_at"] = $post["created_at"];

			$dbOrderItem->insert("order_item")->set($orderItem)->binding($orderItem)->add();
		}

		$dbOrderItem->run();

		$record = db()->read("`order`")->where("`id`=:id")
			->binding(["id" => $post["id"]])->add()->run();

		if (!$record) {
			return json([
				"status" => "error",
				"message" => "There was a error. Please try again later."
			]);
		}

		return json(["status" => "success"]);
	}

	public function update($req, $res, $args)
	{
		$post = $req->getParsedBody();
		$post["order_item"] = json_decode($post["order_item"], true);

		$post["id"] = $args["id"];
		$post["updated_at"] = strtotime("now");
		$post["total"] = 0;

		foreach ($post["order_item"] as $value) {
			$post["total"] += $value["each_price"] * $value["added"];
		}
		if (!$post["order_item"])
			return json(["status" => "error", "message" => "Order must have at least 1 item."]);

		foreach ($post["order_item"] as $orderItem) {
			if ($error = orderItemValidator()->update($orderItem))
				return json(["status" => "error", "error" => $error]);
		}

		if ($error = orderValidator()->update($post))
			return json(["status" => "error", "error" => $error]);

		foreach ($post["order_item"] as $orderItem) {
			$orderItem["id"] = text()->unique();
			$orderItem["order_id"] = $post["id"];
			$orderItem["updated_at"] = strtotime("now");
			if ($error = orderItemValidator()->update($orderItem))
				return json(["status" => "error", "error" => $error]);
		}

		$orderItems = $post["order_item"];
		unset($post["order_item"]);

		db()->update("`order`")->where("`id`=:id")
			->set($post)->binding($post)
			->add()->run();

		$dbOrderItem = db();
		$dbOrderItem->delete("order_item")->where("`order_id`=:order_id")
			->binding(["order_id" => $args["id"]])->add()->run();

		foreach ($orderItems as $orderItem) {
			unset($orderItem["name"]);
			$orderItem["id"] = text()->unique();
			$orderItem["order_id"] = $post["id"];
			$orderItem["created_at"] = $post["updated_at"];
			unset($orderItem["product"]);

			$dbOrderItem->insert("order_item")->set($orderItem)->binding($orderItem)->add();
		}

		$dbOrderItem->run();

		$record = db()->read("`order`")->where("`id`=:id")
			->binding(["id" => $post["id"]])->add()->run();

		if (!$record) {
			return json([
				"status" => "error",
				"message" => "There was a error. Please try again later."
			]);
		}

		return json(["status" => "success"]);
	}

	public function delete($req, $res, $args)
	{
		if ($error = orderValidator()->delete(["id" => $args["id"]]))
			return json(["status" => "error", "error" => $error]);

		db()->delete("`order`")->where("`id`=:id")
			->binding(["id" => $args["id"]])->add()->run();

		db()->delete("order_item")->where("`order_id`=:order_id")
			->binding(["order_id" => $args["id"]])->add()->run();

		$recordOrder = db()->read("`order`")->where("`id`=:id")
			->binding(["id" => $args["id"]])->add()->run();

		$recordOrderItem = db()->read("order_item")->where("`order_id`=:order_id")
			->binding(["order_id" => $args["id"]])->add()->run();

		if ($recordOrder || $recordOrderItem) {
			return json([
				"status" => "error",
				"message" => "There was a error. Please try again later."
			]);
		}

		return json(["status" => "success"]);
	}

	public function bulkAction($req, $res)
	{
		return json(["status" => "success"]);
	}
}
