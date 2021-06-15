<?php

namespace App\API;

class FakerController
{
	public function generate($req, $res)
	{
		$record = faker()->person()->generate();
		$record = $record ? $record : [];

		return json($record, 201);
	}

	public function generates($req, $res, $params)
	{
		$number = $params["number"] ? $params["number"] : 0;
		$record = [];
		
		for ($i = 1; $i <= $number; $i++) {
			$record[] = faker()->person()->generate();
		}
		
		$record = $record ? $record : [];

		return json($record, 201);
	}
}
