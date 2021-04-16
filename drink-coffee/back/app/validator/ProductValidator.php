<?php

namespace App\Validator;

class ProductValidator
{
    public function store(array $data)
    {
        $validations = [
            "id" => ["required" => true, "length" => 19],
            "created_at" => ["required" => true],
            "name" => ["required" => true],
            "price" => ["required" => true],
            "amount" => ["required" => true, "minValue" => 0],
        ];

        return validate($data, $validations);
    }

    public function update(array $data)
    {
        $validations = [
            "id" => ["required" => true, "length" => 19],
            "updated_at" => ["required" => true],
            "name" => ["required" => true],
            "price" => ["required" => true],
            "amount" => ["required" => true, "minValue" => 0],
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
