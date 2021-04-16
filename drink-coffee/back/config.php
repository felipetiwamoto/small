<?php

$config = [
    "prod" => [
        "app_key" => text()->unique(),
        "db_host" => "localhost",
        "db_name" => "drink_coffee",
        "db_user" => "root",
        "db_pass" => "qwe123@",
        "log" => true,
    ],
    "dev" => [
        "app_key" => text()->unique(),
        "db_host" => "localhost",
        "db_name" => "drink_coffee",
        "db_user" => "root",
        "db_pass" => "qwe123@",
        "log" => true,
    ]
];

define("env", $config["dev"]);