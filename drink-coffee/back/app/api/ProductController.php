<?php

namespace App\API;

class ProductController
{
	public function seed($req, $res)
	{
		$categories = [
			"juice" => "547r-zjzq-zqn9-mmpg",
			"snack" => "v56w-gkus-i1tk-n1xc",
			"dessert" => "vc7e-drql-jtvo-gdim",
			"other" => "xdut-43sg-yywq-ylg2",
		];
		$db = db();
		foreach ($categories as $name => $id) {
			for ($i = 1; $i <= rand(5, 15); $i++) {
				$post = [
					"id" => text()->unique(),
					"created_at" => strtotime("now"),
					"name" => ucfirst($name) . " " . str_pad($i, 3, 0, STR_PAD_LEFT),
					"amount" => 1,
					"price" => rand(1, 99),
					"category_id" => $id
				];

				$db->insert("product")->set($post)->binding($post)->add();
			}
		}

		$db->run();

		return json(["status" => "success"], 201);
	}

	public function all($req, $res)
	{
		$db = db()->read("product")->orderBy("`name` asc");
		$record = $db->add()->run();

		$record = $record ? $record : [];

		foreach ($record as $key => $value) {
			$category = db()->read("category")->where("`id`=:id")
				->binding(["id" => $value["category_id"]])->add()->run();

			$record[$key]["category"] = $category ? $category[0] : [];
		}

		return json($record, 201);
	}

	public function index($req, $res)
	{
		$queryParams = $req->getQueryParams();
		$page = isset($queryParams["page"]) ? --$queryParams["page"] : 1;
		$categoryId = isset($queryParams["category_id"]) ? $queryParams["category_id"] : null;

		$db = db()->read("product")->orderBy("`name` asc")->offset($page * 10)->limit(10);

		if (!empty($categoryId)) {
			$db->where("`category_id`=:category_id")->binding(["category_id" => $categoryId]);
		}

		$record = $db->add()->run();

		$count = db()->fetchMode("column")->column("count(id)")->read("product")->add()->run();
		$count = $count[0] ? $count[0] : 0;

		$record = $record ? $record : [];

		foreach ($record as $key => $value) {
			$category = db()->read("category")->where("`id`=:id")
				->binding(["id" => $value["category_id"]])->add()->run();

			$record[$key]["category"] = $category ? $category[0] : [];
		}

		return json([
			"products" => $record,
			"count" => $count,
		], 201);
	}

	public function show($req, $res, $params)
	{
		$record = db()->read("product")
			->where("`id`=:id")->binding(["id" => $params["id"]])
			->add()->run();

		$record = $record ? $record[0] : [];

		return json($record, 201);
	}

	public function store($req, $res)
	{
		$post = $req->getParsedBody();

		$post["id"] = text()->unique();
		$post["created_at"] = strtotime("now");

		if ($error = productValidator()->store($post))
			return json(["status" => "error", "error" => $error]);

		db()->insert("product")->set($post)->binding($post)
			->add()->run();

		$record = db()->read("product")->where("`id`=:id")
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


		$post["id"] = $args["id"];
		$post["updated_at"] = strtotime("now");

		if ($error = productValidator()->update($post))
			return json(["status" => "error", "error" => $error]);

		db()->update("product")->where("`id`=:id")
			->set($post)->binding($post)
			->add()->run();

		return json(["status" => "success"]);
	}

	public function delete($req, $res, $args)
	{
		if ($error = productValidator()->delete(["id" => $args["id"]]))
			return json(["status" => "error", "error" => $error]);

		db()->delete("product")->where("`id`=:id")
			->binding(["id" => $args["id"]])->add()->run();

		$record = db()->read("product")->where("`id`=:id")
			->binding(["id" => $args["id"]])->add()->run();

		if ($record) {
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
