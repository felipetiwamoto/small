<?php

namespace App\API;

class OrderController
{
    public function index($req, $res)
    {
        $record = db()->read("order")
            ->orderBy("`name` asc")->add()->run();
            
        foreach ($record as $key => $value) {
            $record[$key]["order_items"] = db()->read("order_item")
                ->where("`order_id`=:order_id")->binding(["order_id" => $value["order_id"]])
                ->add()->run();
        }

        return json($record, 201);
    }

    public function show($req, $res, $params)
    {
        $record = db()->read("order")
            ->where("`id`=:id")->binding(["id" => $params["id"]])
            ->add()->run();

        $record = $record ? $record[0] : [];

        if ($record) {
            $record["order_items"] = db()->read("order_item")
                ->where("`order_id`=:order_id")->binding(["order_id" => $record["order_id"]])
                ->add()->run();
        }

        return json($record, 201);
    }

    public function store($req, $res)
    {
        $post = $req->getParsedBody();

        $post["id"] = text()->unique();
        $post["created_at"] = strtotime("now");

        if (!$post["order_item"])
            return json(["status" => "error", "message" => "Pedido precisa ter pelo menos 1 item"]);

        if ($error = orderValidator()->store($post))
            return json(["status" => "error", "error" => $error]);

        if ($error = orderItemValidator()->store($post["order_item"]))
            return json(["status" => "error", "error" => $error]);

        $orderItems = $post["order_item"];
        unset($post["order_item"]);

        db()->insert("order")->set($post)->binding($post)
            ->add()->run();

        foreach ($orderItems as $orderItem) {
            $orderItem["order_id"] = $post["id"];
            $orderItem["created_at"] = $post["created_at"];

            db()->insert("order_item")->set($orderItem)->binding($orderItem)->add();
        }

        db()->run();

        $record = db()->read("order")->where("`id`=:id")
            ->binding(["id" => $post["id"]])->add()->run();

        if (!$record) {
            return json([
                "status" => "error",
                "message" => "Houve um erro na criação do pedido. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function update($req, $res, $args)
    {
        $post = $req->getParsedBody();

        $post["id"] = text()->unique();
        $post["updated_at"] = strtotime("now");

        if (!$post["order_item"])
            return json(["status" => "error", "message" => "Pedido precisa ter pelo menos 1 item"]);

        if ($error = orderValidator()->update($post))
            return json(["status" => "error", "error" => $error]);

        if ($error = orderItemValidator()->update($post["order_item"]))
            return json(["status" => "error", "error" => $error]);

        db()->update("order")->where("`id`=:id")
            ->set($post)->binding($post)
            ->add()->run();

        $orderItems = $post["order_item"];
        unset($post["order_item"]);

        db()->delete("order_item")->where("`id`=:id")->add()->run();

        foreach ($orderItems as $orderItem) {
            $orderItem["order_id"] = $post["id"];
            $orderItem["updated_at"] = $post["updated_at"];

            db()->insert("order_item")->set($orderItem)->binding($orderItem)->add();
        }

        db()->run();

        $record = db()->read("order")->where("`id`=:id")
            ->binding(["id" => $post["id"]])->add()->run();

        if (!$record) {
            return json([
                "status" => "error",
                "message" => "Houve um erro na criação do pedido. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function delete($req, $res, $args)
    {
        if ($error = orderValidator()->delete(["id" => $args["id"]]))
            return json(["status" => "error", "error" => $error]);

        db()->delete("order")->where("`id`=:id")
            ->binding(["id" => $args["id"]])->add()->run();

        $record = db()->read("order")->where("`id`=:id")
            ->binding(["id" => $args["id"]])->add()->run();

        if ($record) {
            return json([
                "status" => "error",
                "message" => "Houve um erro na exclusão do pedido. Por favor tente novamente."
            ]);
        }

        return json(["status" => "success"]);
    }

    public function bulkAction($req, $res)
    {
        return json(["status" => "success"]);
    }
}
