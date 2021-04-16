<?php

namespace App\Validator;

class EmployeeValidator
{
    public function login(array $data)
    {
        $validations = [
            "username" => ["required" => true],
            "password" => ["required" => true, "minLength" => 6]
        ];

        return validate($data, $validations);
    }

    public function store(array $data)
    {
        $validations = [
            "id" => ["required" => true, "length" => 19],
            "created_at" => ["required" => true],
            "name" => ["required" => true],
            "surname" => ["required" => true],
            "email" => ["required" => true],
            "password" => ["required" => true, "minLength" => 6],
        ];

        return validate($data, $validations);
    }

    public function update(array $data)
    {
        $validations = [
            "id" => ["required" => true, "length" => 19],
            "updated_at" => ["required" => true],
            "name" => ["required" => true],
            "surname" => ["required" => true],
            "email" => ["required" => true],
            "password" => ["required" => true, "minLength" => 6],
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
