<?php

namespace App\API;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

class EmployeeController
{
	public function login($req, $res)
	{
		$post = $req->getParsedBody();

		if ($error = employeeValidator()->login($post))
			return json(["status" => "error", "error" => $error]);

		$record = db()->read("employee")->where("`email`=:email")
			->binding(["email" => $post["email"]])->add()->run();

		// User not found actually. But we can't say that to the user =D.
		if (!$record)
			return json(["status" => "error", "message" => "User or password are incorrect.."]);

		$record = $record[0];

		// Only password is incorrect. But we can't say that either =D.
		if (!bcrypt()->verify($post["password"], $record["password"]))
			return json(["status" => "error", "message" => "User or password are incorrect."]);

		return json(["status" => "success", "employee" => $record]);
	}

	public function register($req, $res)
	{
		return $this->store($req, $res);
	}

	public function forgotPassword($req, $res)
	{
		$post = $req->getParsedBody();

		$record = db()->read("employee")->where("`email`=:email")
			->binding(["email" => $post["email"]])->add()->run();

		if ($record) {
			$record = $record ? $record[0] : [];

			$data = [
				"id" => $record["id"],
				"forgot_password_token" => text()->unique()
			];
			db()->update("employee")->where("`id`=:id")
				->set($data)->binding($data)->add()->run();

			// Here is the core to send the e-mail, but i'll not leave my information here...

			// $buttonStyle = " 
			// 	padding: 5px 15px; min-height: 40px; font-size: 16px; transition: 0.3s;
			// 	border: 1px solid #bbb; background-color: #ddd; color: #555; outline: none;
			// 	display: inline-flex; justify-content: center; align-items: center; cursor: pointer;
			// ";
			// $mailBody = "
			// 	<p style='font-size:16px;'>
			// 		Hi " . $record["name"] . " " . $record["surname"] . ", you've request for a password recovery 
			// 		for your account in <strong>Drink Coffee</strong>'s System. Please click in the link bellow
			// 		to reset your password.
			// 	</p>
			// 	<br>
			// 	<a target="_blank" style='" . $buttonStyle . "' href="/https://drink-coffee.com/password-recovery/".$data["forgot_password_token"]."">Click here to reset your password</a>
			// ";

			// if (!mail($record["email"], "Password recovery - Drink Coffee", trim($mailBody))) {
			// 	return json([
			// 		"status" => "error",
			// 		"message" => "Something went wrong. Please try again in a few minutes."
			// 	], 500);
			// }

			return json([
				"status" => "success",
				"token_message" => "Please, access [/reset-password/{$data["forgot_password_token"]}] to recovery your password.",
				"message" => "We sent you a email with the link to reset your password. (Check the network tab to get your token)",
			], 201);
		}
	}

	public function checkForgotPasswordToken($req, $res)
	{
		$post = $req->getParsedBody();

		$record = db()->read("employee")->where("`forgot_password_token`=:forgot_password_token")
			->binding(["forgot_password_token" => $post["forgot_password_token"]])->add()->run();

		if (!$record)
			return json([
				"status" => "error",
				"message" => "This is a invalid token. Redirecting in 5 seconds."
			]);

		return json([
			"status" => "success",
			"message" => "Valid token."
		]);
	}

	public function resetPassword($req, $res)
	{
		$post = $req->getParsedBody();

		if ($error = employeeValidator()->resetPassword($post)) {
			return json([
				"status" => "error",
				"error" => $error
			]);
		}

		$record = db()->read("employee")->where("`forgot_password_token`=:forgot_password_token")
			->binding(["forgot_password_token" => $post["forgot_password_token"]])->add()->run();

		if ($record) {
			$record = $record ? $record[0] : [];

			$data = [
				"id" => $record["id"],
				"forgot_password_token" => "",
				"password" => bcrypt()->hash($post["password"])
			];
			db()->update("employee")->where("`id`=:id")
				->set($data)->binding($data)->add()->run();

			return json([
				"status" => "success",
				"message" => "Password reseted!"
			]);
		}

		return json([
			"status" => "success",
			"message" => "Something went wrong. Please try again in a few minutes."
		]);
	}

	public function index($req, $res)
	{
		$queryParams = $req->getQueryParams();
		$page = isset($queryParams["page"]) ? --$queryParams["page"] : 1;
		$record = db()->read("employee")
			->orderBy("`name` asc")
			->offset($page * 10)->limit(10)
			->add()->run();

		$count = db()->fetchMode("column")->column("count(id)")->read("employee")->add()->run();
		$count = $count[0] ? $count[0] : 0;

		$record = $record ? $record : [];

		return json([
			"employees" => $record,
			"count" => $count,
		], 201);
	}

	public function show($req, $res, $params)
	{
		$record = db()->read("employee")
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

		if ($error = employeeValidator()->store($post))
			return json(["status" => "error", "error" => $error]);

		$post["password"] = bcrypt()->hash($post["password"]);

		db()->insert("employee")->set($post)->binding($post)
			->add()->run();

		$record = db()->read("employee")->where("`id`=:id")
			->binding(["id" => $post["id"]])->add()->run();

		if (!$record) {
			return json([
				"status" => "error",
				"message" => "There was a error. Please try again later."
			]);
		}

		return json([
			"status" => "success",
			"message" => "Account created with success."
		]);
	}

	public function update($req, $res, $args)
	{
		$post = $req->getParsedBody();

		$post["id"] = $args["id"];
		$post["updated_at"] = strtotime("now");

		if ($error = employeeValidator()->update($post))
			return json(["status" => "error", "error" => $error]);

		if (!empty($post["password"])) {
			$post["password"] = bcrypt()->hash($post["password"]);
		} else {
			unset($post["password"]);
		}

		db()->update("employee")->where("`id`=:id")
			->set($post)->binding($post)
			->add()->run();

		return json(["status" => "success"]);
	}

	public function delete($req, $res, $args)
	{
		if ($error = employeeValidator()->delete(["id" => $args["id"]]))
			return json(["status" => "error", "error" => $error]);

		db()->delete("employee")->where("`id`=:id")
			->binding(["id" => $args["id"]])->add()->run();

		$record = db()->read("employee")->where("`id`=:id")
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
