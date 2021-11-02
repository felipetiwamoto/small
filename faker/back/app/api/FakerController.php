<?php

namespace App\API;

class FakerController
{
	public function person($req, $res, $params)
	{
		$amount = ($params["amount"] && is_numeric($params["amount"])) ? $params["amount"] : 0;
		$post = (isset($_GET["post"]) && is_numeric($_GET["post"])) ? $_GET["post"] : 0;
		$comment = (isset($_GET["comment"]) && is_numeric($_GET["comment"])) ? $_GET["comment"] : 0;
		$todo = (isset($_GET["todo"]) && is_numeric($_GET["todo"])) ? $_GET["todo"] : 0;

		$total = 0;
		$total += $amount;
		$total *= $post > 0 ? $post : 1;
		$total *= $comment > 0 ? $comment : 1;
		$total *= $todo > 0 ? $todo : 1;

		if ($total > LIMIT)
			return json([
				"status" => "error", 
				"total" => $total,
				"message" => "Max value of ({person}*{post}*{comment}*{todo}) should be ".LIMIT."."
			]);

		$record = [];

		for ($i = 0; $i < $amount; $i++) {
			$person = faker()->person();
			$record[$i] = $person;

			if (isset($_GET["post"]) && is_numeric($_GET["post"])) {
				for ($j = 0; $j < $_GET["post"]; $j++) {
					$record[$i]["post"][$j] = faker()->post();
					$record[$i]["post"][$j]["person_id"] = $person["id"];
				}
			}

			if (isset($_GET["comment"]) && is_numeric($_GET["comment"])) {
				for ($j = 0; $j < $_GET["comment"]; $j++) {
					$record[$i]["comment"][$j] = faker()->comment();
					$record[$i]["comment"][$j]["person_id"] = $person["id"];
				}
			}

			if (isset($_GET["todo"]) && is_numeric($_GET["todo"])) {
				for ($j = 0; $j < $_GET["todo"]; $j++) {
					$record[$i]["todo"][$j] = faker()->todo();
					$record[$i]["todo"][$j]["person_id"] = $person["id"];
				}
			}
		}

		$record = $record ? $record : [];

		return json($record, 201);
	}

	public function post($req, $res, $params)
	{
		$amount = $params["amount"] ? $params["amount"] : 0;
		$comment = (isset($_GET["comment"]) && is_numeric($_GET["comment"])) ? $_GET["comment"] : 0;

		$total = 0;
		$total += $amount;
		$total *= $comment > 0 ? $comment : 1;

		if ($total > LIMIT)
			return json([
				"status" => "error", 
				"total" => $total,
				"message" => "Max value of ({post}*{comment}) should be ".LIMIT."."
			]);

		$record = [];

		for ($i = 0; $i < $amount; $i++) {
			$post = faker()->post();
			$record[$i] = $post;

			if (isset($_GET["comment"]) && is_numeric($_GET["comment"])) {
				for ($j = 0; $j < $_GET["comment"]; $j++) {
					$record[$i]["comment"][$j] = faker()->comment();
					$record[$i]["comment"][$j]["post_id"] = $post["id"];
				}
			}
		}

		$record = $record ? $record : [];

		return json($record, 201);
	}

	public function comment($req, $res, $params)
	{
		$amount = $params["amount"] ? $params["amount"] : 0;

		$record = [];

		for ($i = 0; $i < $amount; $i++) {
			$comment = faker()->comment();
			$record[$i] = $comment;
		}

		$record = $record ? $record : [];

		return json($record, 201);
	}

	public function todo($req, $res, $params)
	{
		$amount = $params["amount"] ? $params["amount"] : 0;

		$record = [];

		for ($i = 0; $i < $amount; $i++) {
			$todo = faker()->todo();
			$record[$i] = $todo;
		}

		$record = $record ? $record : [];

		return json($record, 201);
	}
}
