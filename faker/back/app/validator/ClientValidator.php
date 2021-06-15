<?php

namespace App\Validator;

class FakerValidator
{
    public function generates(array $data)
    {
        $validations = [
            "number" => ["required" => true],
        ];

        return validate($data, $validations);
    }
}