<?php

namespace Helper;

class Text
{
    static private $instance = null;

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = (new self);
        }

        return self::$instance;
    }

    public static function unique(int $length = 4)
    {
        $chars = "abcdefghijklmnopqrstuvwxyz123456789";
        $chars .= $chars . $chars . $chars . $chars;
        return implode("-", str_split(substr(str_shuffle($chars), 0, $length * 4), $length));
    }
}
