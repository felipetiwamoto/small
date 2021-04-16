<?php

function db()
{
    return new \Helper\Database();
}

function moment()
{
    return \Helper\Moment::getInstance();
}

function text()
{
    return \Helper\Text::getInstance();
}

function vector()
{
    return \Helper\Vector::getInstance();
}

function bcrypt()
{
    return \Helper\Bcrypt::getInstance();
}

function validate(array $data, array $validations)
{
    return \Helper\Validator::validate($data, $validations);
}

function dump()
{
    echo "<pre style='background-color:#333; color:#fff; padding:15px;'>";
    foreach (func_get_args() as $key => $arg) {
        echo "<h3 style='color:orange; margin:0px; padding:0px;'>Index " . str_pad(++$key, 4, 0, STR_PAD_LEFT) . " -> </h3>";
        print_r($arg);
        echo "<br>";
    }
    echo "</pre>";
}

function dd()
{
    dump(func_get_args());
    die();
}

function randBetween(array $options = [])
{
    return ($options) ?
        $options[rand(0, (count($options) - 1))] : "";
}

function json(array $data = [], $status = 201)
{
    http_response_code($status);
    header("Content-type: application/json; chartset=utf-8");
    die(json_encode($data));
}
