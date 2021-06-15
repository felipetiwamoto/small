<?php

namespace Helper;

use Core\Model\BaseModel;

class Validator
{
    protected static $instance = null;
    protected static $model;
    protected static $errors = [];
    protected static $validations = [];
    protected static $inputs = [];
    protected static $labels = [];
    protected static $ignores = [];

    protected static $types = [
        "required", "unique", "enum",
        "length", "minLength", "maxLength",
        "value", "minValue", "maxValue",
        "date", "time", "datetime"
    ];

    public static $messages = [
        "required" => "Este campo é obrigatório.",
        "unique" => "Já existe um registro com esse valor.",
        "enum" => "Valor não encontrado entre {enum}",
        "length" => "Valor deve ter exatamente {length} caracteres.",
        "minLength" => "Valor deve ter no mínimo {minLength} caracteres.",
        "maxLength" => "Valor deve ter no máximo {maxLength} caracteres.",
        "value" => "Valor deve ser exatamente {value} caracteres.",
        "minValue" => "Valor mínimo deve ser {minValue}.",
        "maxValue" => "Valor máximo deve ser {maxValue}.",
        "date" => [
            "length" => "Data deve ter 10 caracteres.",
            "format" => "Formato da data deve ser dd/mm/yyyy.",
            "february" => "Fevereiro não pode ter 30 dias.",
            "day" => "Dia pode ser entre 01 - 31.",
            "month" => "Mês pode ser entre 01 - 12.",
            "year" => "Ano deve ser no mínimo 1900.",
        ],
        "time" => [
            "length" => "Hora deve ter 8 caracteres.",
            "format" => "Formato da data deve ser hh:mm:ss.",
            "sec" => "Segundos pode ser entre 0 - 59.",
            "min" => "Minutos pode ser entre 0 - 59.",
            "hour" => "Horas não podem ser menores que 0.",
        ],
        "datetime" => [
            "length" => "Data&Hora deve ter 19 caracteres."
        ],
    ];

    public static function getInstance()
    {
        if (!isset(static::$instance)) {
            static::$instance = (new static);
        }

        return static::$instance;
    }

    public static function validate(array $inputs = [], array $validations = [])
    {
        self::$inputs = self::$inputs ? self::$inputs : $inputs;
        self::$validations = self::$validations ? self::$validations : $validations;

        foreach (self::$types as $type) {
            foreach (self::$validations as $key => $validation) {
                if (!in_array($key, self::$ignores)) {
                    if (in_array($type, array_keys($validation)) && $validation[$type]) {
                        if (!isset(self::$inputs[$key])) {
                            self::$errors[$key] = "A chave '{$key}' não foi encontrada.";
                            continue;
                        }
                        self::$type($key, self::$inputs[$key]);
                    }
                }
            }
        }
        
        $errors = self::$errors;

        self::$errors = [];
        self::$inputs = [];
        self::$validations = [];
        
        return $errors;
    }

    private static function getMaxLength(array $field)
    {
        $type = explode("(", $field["type"]);

        switch ($type[0]) {
            case "varchar":
                return substr($type[1], 0, -1);
        }
    }

    public static function ignore(array $ignores = [])
    {
        self::$ignores = $ignores;
        return static::$instance;
    }

    protected static function required($key, $input)
    {
        if (strlen(trim($input)) <= 0) {
            return self::$errors[$key][] = self::$messages["required"];
        }
    }

    protected static function length($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if (strlen(trim($input)) != self::$validations[$key]["length"]) {
            return self::$errors[$key][] = self::$messages["length"];
        }
    }

    protected static function minLength($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if (strlen(trim($input)) < self::$validations[$key]["minLength"]) {
            return self::$errors[$key][] = self::$messages["minLength"];
        }
    }

    protected static function maxLength($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if (strlen(trim($input)) > self::$validations[$key]["maxLength"]) {
            return self::$errors[$key][] = self::$messages["maxLength"];
        }
    }

    protected static function value($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if ($input != self::$validations[$key]["value"]) {
            return self::$errors[$key][] = self::$messages["value"];
        }
    }

    protected static function minValue($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if ($input < self::$validations[$key]["minValue"]) {
            return self::$errors[$key][] = self::$messages["minValue"];
        }
    }

    protected static function maxValue($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }
        
        if ($input > self::$validations[$key]["maxValue"]) {
            return self::$errors[$key][] = self::$messages["maxValue"];
        }
    }

    protected static function date($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if (strlen(trim($input)) != 10) {
            return self::$errors[$key][] = self::$messages["date"]["length"];
        }

        $format = explode("/", $input);

        if (
            (!is_array($format) && count($format) != 3) &&
            (strlen($format[0]) != 2 || strlen($format[2]) != 2 || strlen($format[4]) != 4)
        ) {
            return self::$errors[$key][] = self::$messages["date"]["format"];
        }

        foreach ($format as $index => $value) {
            if (is_numeric($value)) {
                $format[$index] *= 1;
            }
            if (!is_numeric($format[$index])) {
                return self::$errors[$key][] = self::$messages["date"]["format"];
            }
        }

        if ($format[0] < 1 || $format[0] > 31) {
            return self::$errors[$key][] = self::$messages["date"]["day"];
        }

        if ($format[1] < 1 || $format[1] > 12) {
            return self::$errors[$key][] = self::$messages["date"]["month"];
        }

        if ($format[1] == 2 && $format[0] > 29) {
            return self::$errors[$key][] = self::$messages["date"]["february"];
        }

        if ($format[2] < 1900) {
            return self::$errors[$key][] = self::$messages["date"]["year"];
        }
    }

    protected static function time($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if (strlen(trim($input)) != 8) {
            return self::$errors[$key][] = self::$messages["time"]["length"];
        }

        $format = explode(":", $input);

        if (
            (!is_array($format) || count($format) != 3) &&
            (strlen($format[0]) != 2 || strlen($format[1]) != 2 || strlen($format[2]) != 2)
        ) {
            return self::$errors[$key][] = self::$messages["time"]["format"];
        }

        foreach ($format as $index => $value) {
            if (is_numeric($value)) {
                $format[$index] *= 1;
            }
            if (!is_numeric($format[$index])) {
                return self::$errors[$key][] = self::$messages["time"]["format"];
            }
        }

        if ($format[2] < 0 || $format[2] > 59) {
            return self::$errors[$key][] = self::$messages["time"]["sec"];
        }

        if ($format[1] < 0 || $format[1] > 59) {
            return self::$errors[$key][] = self::$messages["time"]["min"];
        }

        if ($format[0] < 0) {
            return self::$errors[$key][] = self::$messages["time"]["hour"];
        }
    }

    protected static function datetime($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if (strlen(trim($input)) != 19) {
            return self::$errors[$key][] = self::$messages["datetime"]["length"];
        }

        $datetime = explode(" ", $input);

        self::date($key, $datetime[0]);
        self::time($key, $datetime[1]);
    }

    protected static function unique($key, $input)
    {
        $table = self::$validations[$key]["unique"];
        $bindings = ["{$key}" => $input];

        if (isset(self::$inputs["id"])) {
            $bindings += ["id" => self::$inputs["id"]];
            $query = "SELECT * FROM `{$table}` WHERE `{$key}` = :{$key} AND `id` <> :id;";
        } else {
            $query = "SELECT * FROM `{$table}` WHERE `{$key}` = :{$key};";
        }

        if (db()->add($query, $bindings)->run()) {
            return self::$errors[$key][] = self::$messages["unique"];
        }
    }

    protected static function enum($key, $input)
    {
        if(!self::$validations[$key]["required"] && strlen($input) == 0){
            return true;
        }

        if (!in_array($input, self::$validations[$key]["enum"])) {
            self::$errors[$key] = ["enum" => self::$messages["enum"]];
        }
    }
}
