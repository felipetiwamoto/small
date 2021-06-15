<?php

namespace Helper;

use Helper\SqlBuilder;

class Database
{
    protected $instance = null;
    protected $pdo = null;
    protected $fetchMode = "assoc";
    protected $fetchModes = [
        "assoc" => \PDO::FETCH_ASSOC,
        "obj" => \PDO::FETCH_OBJ,
        "both" => \PDO::FETCH_BOTH,
        "class" => \PDO::FETCH_CLASS,
        "classtype" => \PDO::FETCH_CLASSTYPE,
        "column" => \PDO::FETCH_COLUMN,
    ];
    protected $binding = [];
    protected $queries = [];

    use SqlBuilder;

    public function __construct()
    {
        $dsn = "mysql:host=" . env["db_host"] . ";dbname=" . env["db_name"];
        $this->pdo = new \PDO($dsn, env["db_user"], env["db_pass"]);
        $this->pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
        $this->pdo->setAttribute(\PDO::ATTR_CASE, \PDO::CASE_LOWER);
        $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        return $this;
    }

    public function fetchMode(string $fetchMode = "assoc")
    {
        $this->fetchMode = $fetchMode;
        return $this;
    }

    public function add($sql = "", $binding = [])
    {
        $sql = strlen($sql) <= 0 ? $this->sql : $sql;
        $binding = $binding ? $binding : $this->binding;

        $this->queries[] = [
            "sql" => $sql,
            "binding" => $binding,
        ];

        $this->build();
        return $this;
    }

    public function query($sql, $binding = [])
    {
        $this->queries[] = [
            "sql" => $sql,
            "binding" => $binding,
        ];
        $this->run();
    }

    public function binding($binding = [])
    {
        $this->binding = $binding;
        return $this;
    }

    public function run()
    {
        $this->pdo->beginTransaction();
        try {
            foreach ($this->queries as $query) {
                $stmt = $this->pdo->prepare($query["sql"]);

                foreach ($query["binding"] as $key => $value)
                    $stmt->bindValue(":{$key}", $value);

                $stmt->execute();
            }
            $this->pdo->commit();
            $this->instance = null;
            $hasFetch = false;
            $hasFetch = (substr($query["sql"], 0, 6) == "select") || (substr($query["sql"], 0, 4) == "show") || (substr($query["sql"], 0, 8) == "describe");
            if ($hasFetch) {
                $record = $stmt->fetchAll($this->fetchModes[$this->fetchMode]);
                $this->fetchMode = "assoc";
                return $record;
            }
        } catch (\Exception $e) {
            $this->pdo->rollBack();
            // env["log"] ?? log("Query Log: ".$e->message())->data($this->queries)->insert();
            dd([
                "message" => $e,
                "queries" => $this->queries
            ]);
        }
    }
}
