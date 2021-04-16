<?php
use Slim\Factory\AppFactory;

header('Access-Control-Allow-Origin: *');

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/helper/main.php';
require __DIR__ . '/config.php';
require __DIR__ . '/app/validator/main.php';

$app = AppFactory::create();

$app->get('/api/client', "\\App\\API\\ClientController:index");
$app->get('/api/client/{id}', "\\App\\API\\ClientController:show");
$app->post('/api/client', "\\App\\API\\ClientController:store");
$app->post('/api/client/{id}', "\\App\\API\\ClientController:update");
$app->get('/api/client/delete/{id}', "\\App\\API\\ClientController:delete");

$app->post('/api/employee/login', "\\App\\API\\EmployeeController:login");
$app->get('/api/employee', "\\App\\API\\EmployeeController:index");
$app->get('/api/employee/{id}', "\\App\\API\\EmployeeController:show");
$app->post('/api/employee', "\\App\\API\\EmployeeController:store");
$app->post('/api/employee/{id}', "\\App\\API\\EmployeeController:update");
$app->get('/api/employee/delete/{id}', "\\App\\API\\EmployeeController:delete");

$app->get('/api/product', "\\App\\API\\ProductController:index");
$app->get('/api/product/{id}', "\\App\\API\\ProductController:show");
$app->post('/api/product', "\\App\\API\\ProductController:store");
$app->post('/api/product/{id}', "\\App\\API\\ProductController:update");
$app->get('/api/product/delete/{id}', "\\App\\API\\ProductController:delete");

$app->get('/api/category', "\\App\\API\\CategoryController:index");
$app->get('/api/category/{id}', "\\App\\API\\CategoryController:show");
$app->post('/api/category', "\\App\\API\\CategoryController:store");
$app->post('/api/category/{id}', "\\App\\API\\CategoryController:update");
$app->get('/api/category/delete/{id}', "\\App\\API\\CategoryController:delete");

$app->get('/api/order', "\\App\\API\\OrderController:index");
$app->get('/api/order/{id}', "\\App\\API\\OrderController:show");
$app->post('/api/order', "\\App\\API\\OrderController:store");
$app->post('/api/order/{id}', "\\App\\API\\OrderController:update");
$app->get('/api/order/delete/{id}', "\\App\\API\\OrderController:delete");

$app->run();
