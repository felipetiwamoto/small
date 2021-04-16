<?php

namespace App\Validator;

class OrderValidator
{
    public function store(array $data)
    {
        $status = ["Pendente", "Preparando", "Entregue", "Concluído", "Pago"];

        $validations = [
            "id" => ["required" => true, "length" => 19],
            "created_at" => ["required" => true],
            "employee_id" => ["required" => true, "length" => 19],
            "total" => ["required" => true, "minValue" => 0],
            "status" => ["required" => true, "enum" => $status]
        ];

        return validate($data, $validations);
    }

    public function update(array $data)
    {
        $status = ["Pendente", "Preparando", "Entregue", "Concluído", "Pago"];

        $validations = [
            "id" => ["required" => true, "length" => 19],
            "created_at" => ["required" => true],
            "employee_id" => ["required" => true, "length" => 19],
            "total" => ["required" => true, "minValue" => 0],
            "status" => ["required" => true, "enum" => $status]
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