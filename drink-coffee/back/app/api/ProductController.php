<?php

namespace App\API;

class ProductController
{
    public function index($req, $res)
    {
        $record = db()->read("product")
            ->orderBy("`name` asc")->add()->run();

        $record = $record ? $record : [];

        foreach ($record as $key => $value) {
            $category = db()->read("category")->where("`id`=:id")
                ->binding(["id" => $value["category_id"]])->add()->run();

            $record[$key]["category"] = $category ? $category[0] : [];
        }

        return json($record, 201);
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
                "message" => "Houve um erro na criação do produto. Por favor tente novamente."
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
                "message" => "Houve um erro na exclusão do produto. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function bulkAction($req, $res)
    {
        return json(["status" => "success"]);
    }
}
