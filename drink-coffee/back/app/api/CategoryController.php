<?php

namespace App\API;

class CategoryController
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
			$post = [
				"id" => $id,
				"created_at" => strtotime("now"),
				"name" => ucfirst($name),
			];

			$db->insert("category")->set($post)->binding($post)->add();
		}

		$db->run();

		return json(["status" => "success"], 201);
	}

	public function all($req, $res)
	{
		$record = db()->read("category")->orderBy("`name` asc")->add()->run();
		$record = $record ? $record : [];

		return json($record, 201);
	}

	public function index($req, $res)
	{
		$queryParams = $req->getQueryParams();
		$page = isset($queryParams["page"]) ? --$queryParams["page"] : 1;
		$record = db()->read("category")
			->orderBy("`name` asc")
			->offset($page * 10)->limit(10)
			->add()->run();

		$count = db()->fetchMode("column")->column("count(id)")->read("category")->add()->run();
		$count = $count[0] ? $count[0] : 0;

		$record = $record ? $record : [];

		return json([
			"categories" => $record,
			"count" => $count,
		], 201);
	}

	public function show($req, $res, $params)
	{
		$record = db()->read("category")
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

		if ($error = categoryValidator()->store($post))
			return json(["status" => "error", "error" => $error]);

		db()->insert("category")->set($post)->binding($post)
			->add()->run();

		$record = db()->read("category")->where("`id`=:id")
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

		if ($error = categoryValidator()->update($post))
			return json(["status" => "error", "error" => $error]);

		db()->update("category")->where("`id`=:id")
			->set($post)->binding($post)
			->add()->run();

		return json(["status" => "success"]);
	}

	public function delete($req, $res, $args)
	{
		if ($error = categoryValidator()->delete(["id" => $args["id"]]))
			return json(["status" => "error", "error" => $error]);

		db()->delete("category")->where("`id`=:id")
			->binding(["id" => $args["id"]])->add()->run();

		$record = db()->read("category")->where("`id`=:id")
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
