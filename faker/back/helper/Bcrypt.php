<?php

namespace Helper;

class Bcrypt
{
    static private $instance = null;

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = (new self);
        }

        return self::$instance;
    }

    public static function hash(string $string)
    {
        return password_hash($string, PASSWORD_BCRYPT);
    }

    public static function verify(string $string, string $hash)
    {
        return password_verify($string, $hash);
    }
}
