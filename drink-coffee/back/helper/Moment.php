<?php

namespace Helper;

class Moment
{
    static private $instance = null;
    static private $format = [
        "view" => [
            "date" => "d/m/Y",
            "time" => "H:i",
            "datetime" => "d/m/Y H:i",
        ],
        "db" => [
            "date" => "Y-m-d",
            "time" => "H:i:s",
            "datetime" => "Y-m-d H:i:s",
        ]
    ];

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = (new self);
        }

        return self::$instance;
    }

    public static function viewDate(string $date, $format = "U")
    {
        $date = \DateTime::createFromFormat($format, $date);
        return $date->format(static::$format["view"]["date"]);
    }

    public static function viewTime(string $date, $format = "U")
    {
        $date = \DateTime::createFromFormat($format, $date);
        return $date->format(static::$format["view"]["time"]);
    }

    public static function viewDatetime(string $date, $format = "U")
    {
        $date = \DateTime::createFromFormat($format, $date);
        return $date->format(static::$format["view"]["datetime"]);
    }

    public static function dbDate(string $date, $format = "Y/m/d")
    {
        $date = \DateTime::createFromFormat($format, $date);
        return $date->format(static::$format["db"]["date"]);
    }

    public static function dbTime(string $date, $format = "H:i")
    {
        $date = \DateTime::createFromFormat($format, $date);
        return $date->format(static::$format["db"]["time"]);
    }

    public static function dbDatetime(string $date, $format = "d/m/Y H:is")
    {
        $date = \DateTime::createFromFormat($format, $date);
        return $date->format(static::$format["db"]["datetime"]);
    }
}
