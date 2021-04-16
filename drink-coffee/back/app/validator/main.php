<?php

function clientValidator()
{
    return new \App\Validator\ClientValidator();
}

function employeeValidator()
{
    return new \App\Validator\EmployeeValidator();
}

function orderValidator()
{
    return new \App\Validator\OrderValidator();
}

function orderItemValidator()
{
    return new \App\Validator\OrderItemValidator();
}

function productValidator()
{
    return new \App\Validator\ProductValidator();
}

function categoryValidator()
{
    return new \App\Validator\CategoryValidator();
}