<?php

date_default_timezone_set('America/Sao_Paulo');

define("LIMIT", 5000);

$config = [
    "prod" => [
        "app_key" => text()->unique(),
        "db_host" => "localhost",
        "db_name" => "faker_api",
        "db_user" => "root",
        "db_pass" => "",
        "log" => true,
    ],
    "dev" => [
        "app_key" => text()->unique(),
        "db_host" => "localhost",
        "db_name" => "faker_api",
        "db_user" => "root",
        "db_pass" => "",
        "log" => true,
    ]
];

define("env", $config["dev"]);