<?php
use Slim\Factory\AppFactory;

header('Access-Control-Allow-Origin: *');

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/helper/main.php';
require __DIR__ . '/config.php';
require __DIR__ . '/app/validator/main.php';

$app = AppFactory::create();

$app->get('/api/faker/person', "\\App\\API\\FakerController:person");
$app->get('/api/faker/person/{number}', "\\App\\API\\FakerController:persons");

$app->get('/api/faker/address', "\\App\\API\\FakerController:address");
$app->get('/api/faker/address/{number}', "\\App\\API\\FakerController:addresses");

$app->get('/api/faker/text', "\\App\\API\\FakerController:text");
$app->get('/api/faker/text/{number}', "\\App\\API\\FakerController:texts");

$app->run();
