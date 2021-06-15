<?php

namespace App\Validator;

class OrderItemValidator
{
    public function store(array $data)
    {
        $validations = [
            "product_id" => ["required" => true, "length" => 19],
            "added" => ["required" => true, "minValue" => 1],
            "each_price" => ["required" => true, "minValue" => 0],
            "total" => ["required" => true, "minValue" => 0],
        ];

        return validate($data, $validations);
    }

    public function update(array $data)
    {
        $validations = [
            "product_id" => ["required" => true, "length" => 19],
            "added" => ["required" => true, "minValue" => 1],
            "each_price" => ["required" => true, "minValue" => 0],
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