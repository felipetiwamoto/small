<?php

namespace App\Validator;

class OrderValidator
{
	public function store(array $data)
	{
		$status = [
			"waiting approval",
			"preparing",
			"delivered",
			"finished",
			"canceled",
		];

		$validations = [
			"id" => ["required" => true, "length" => 19],
			"created_at" => ["required" => true],
			"employee_id" => ["required" => true, "length" => 19],
			"total" => ["required" => true, "minValue" => 0],
			"status" => ["required" => true, "enum" => $status]
		];

		return validate($data, $validations);
	}

	public function update(array $data)
	{
		$status = [
			"waiting approval",
			"preparing",
			"delivered",
			"finished",
			"canceled",
		];

		$validations = [
			"id" => ["required" => true, "length" => 19],
			"updated_at" => ["required" => true],
			"total" => ["required" => true, "minValue" => 0],
			"status" => ["required" => true, "enum" => $status]
		];

		return validate($data, $validations);
	}

	public function delete(array $data)
	{
		$validations = [
			"id" => ["required" => true, "length" => 19],
		];

		return validate($data, $validations);
	}
}
