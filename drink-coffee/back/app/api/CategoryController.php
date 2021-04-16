<?php

namespace App\API;

class CategoryController
{
    public function index($req, $res)
    {
        $record = db()->read("category")
            ->orderBy("`name` asc")->add()->run();

        $record = $record ? $record : [];

        return json($record, 201);
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
                "message" => "Houve um erro na criação da categoria. Por favor tente novamente."
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
                "message" => "Houve um erro na exclusão da categoria. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function bulkAction($req, $res)
    {
        return json(["status" => "success"]);
    }
}
