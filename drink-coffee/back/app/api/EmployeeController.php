<?php

namespace App\API;

class EmployeeController
{
    public function login($req, $res)
    {
        $post = $req->getParsedBody();

        if ($error = employeeValidator()->login($post))
            return json(["status" => "error", "error" => $error]);

        $record = db()->read("employee")->where("`email`=:email")
            ->binding(["email" => $post["username"]])->add()->run();

        if (!$record)
            return json(["status" => "error", "message" => "Usuário ou senha incorretos"]);

        $record = $record[0];

        if (!bcrypt()->verify($post["password"], $record["password"]))
            return json(["status" => "error", "message" => "Usuário ou senha incorretos"]);

        return json(["status" => "success", "employee" => $record]);
    }

    public function index($req, $res)
    {
        $record = db()->read("employee")
            ->orderBy("`name` asc")->add()->run();

        $record = $record ? $record : [];

        return json($record, 201);
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
                "message" => "Houve um erro na criação do funcionário. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function update($req, $res, $args)
    {
        $post = $req->getParsedBody();
        
        $post["id"] = $args["id"];
        $post["updated_at"] = strtotime("now");

        if ($error = employeeValidator()->update($post))
            return json(["status" => "error", "error" => $error]);

        $post["password"] = bcrypt()->hash($post["password"]);

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
                "message" => "Houve um erro na exclusão do funcionário. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function bulkAction($req, $res)
    {
        return json(["status" => "success"]);
    }
}
