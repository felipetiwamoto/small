<?php

namespace App\Validator;

class OrderItemValidator
{
    public function store(array $data)
    {
        $validations = [
            "id" => ["required" => true, "length" => 19],
            "created_at" => ["required" => true],
            "order_id" => ["required" => true, "length" => 19],
            "product_id" => ["required" => true, "length" => 19],
            "amount" => ["required" => true, "minValue" => 1],
            "total_each" => ["required" => true, "minValue" => 0],
            "total" => ["required" => true, "minValue" => 0],
        ];

        return validate($data, $validations);
    }

    public function update(array $data)
    {
        $validations = [
            "id" => ["required" => true, "length" => 19],
            "updated_at" => ["required" => true],
            "order_id" => ["required" => true, "length" => 19],
            "product_id" => ["required" => true, "length" => 19],
            "amount" => ["required" => true, "minValue" => 1],
            "total_each" => ["required" => true, "minValue" => 0],
            "total" => ["required" => true, "minValue" => 0],
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