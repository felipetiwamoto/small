<?php
use Slim\Factory\AppFactory;

header('Access-Control-Allow-Origin: *');

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/helper/main.php';
require __DIR__ . '/config.php';
require __DIR__ . '/app/validator/main.php';

$app = AppFactory::create();

$app->get('/api/person/{amount}', "\\App\\API\\FakerController:person");
$app->get('/api/post/{amount}', "\\App\\API\\FakerController:post");
$app->get('/api/comment/{amount}', "\\App\\API\\FakerController:comment");
$app->get('/api/todo/{amount}', "\\App\\API\\FakerController:todo");

$app->run();
