<?php

namespace App\API;

class ClientController
{
    public function login($req, $res)
    {
        $post = $req->getParsedBody();

        if ($error = employeeValidator()->login($post))
            return json(["status" => "error", "error" => $error]);

        $binding = [
            "email" => $post["username"],
            "cpf" => $post["username"],
        ];

        $record = db()->read("employee")->where("`email`=:email or `cpf`=:cpf")
            ->binding($binding)->add()->run();

        if (!$record)
            return json(["status" => "error", "message" => "Usuário ou senha incorretos"]);

        $record = $record[0];

        if (!bcrypt()->verify($post["password"], $record["password"]))
            return json(["status" => "error", "message" => "Usuário ou senha incorretos"]);

        return json(["status" => "success", "employee" => $record]);
    }
    
    public function index($req, $res)
    {
        $record = db()->read("client")
            ->orderBy("`name` asc")->add()->run();

        $record = $record ? $record : [];

        return json($record, 201);
    }

    public function show($req, $res, $params)
    {
        $record = db()->read("client")
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

        if ($error = clientValidator()->store($post))
            return json(["status" => "error", "error" => $error]);

        $post["password"] = bcrypt()->hash($post["password"]);
        $usernameType = strpos($post["username"], "@") !== false ? "email" : "cpf";
        $post[$usernameType] = $post["username"];
        unset($post["username"]);

        db()->insert("client")->set($post)->binding($post)
            ->add()->run();

        $record = db()->read("client")->where("`id`=:id")
            ->binding(["id" => $post["id"]])->add()->run();

        if (!$record) {
            return json([
                "status" => "error",
                "message" => "Houve um erro na criação do cliente. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function update($req, $res, $args)
    {
        $post = $req->getParsedBody();


        $post["id"] = $args["id"];
        $post["updated_at"] = strtotime("now");

        if ($error = clientValidator()->update($post))
            return json(["status" => "error", "error" => $error]);

        $post["password"] = bcrypt()->hash($post["password"]);
        $usernameType = strpos($post["username"], "@") !== false ? "email" : "cpf";
        $post[$usernameType] = $post["username"];
        unset($post["username"]);

        db()->update("client")->where("`id`=:id")
            ->set($post)->binding($post)
            ->add()->run();

        return json(["status" => "success"]);
    }

    public function delete($req, $res, $args)
    {
        if ($error = clientValidator()->delete(["id" => $args["id"]]))
            return json(["status" => "error", "error" => $error]);

        db()->delete("client")->where("`id`=:id")
            ->binding(["id" => $args["id"]])->add()->run();

        $record = db()->read("client")->where("`id`=:id")
            ->binding(["id" => $args["id"]])->add()->run();

        if ($record) {
            return json([
                "status" => "error",
                "message" => "Houve um erro na exclusão do cliente. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function bulkAction($req, $res)
    {
        return json(["status" => "success"]);
    }
}
