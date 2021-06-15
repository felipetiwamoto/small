<?php

namespace Helper;

trait SqlBuilder
{
    protected $type = "select";
    protected $column = "*";
    protected $table = "";
    protected $innerJoin = [];
    protected $outerJoin = [];
    protected $leftJoin = [];
    protected $rightJoin = [];
    protected $where = [];
    protected $orderBy = "";
    protected $groupBy = "";
    protected $limit = "";
    protected $offset = "";
    protected $set = [];
    protected $sql = "";

    protected function build()
    {
        $attr["column"] = $this->column;
        $attr["table"] = $this->table;
        $attr["innerJoin"] = "";
        foreach ($this->innerJoin as $innerJoin)
            $attr["innerJoin"] .= "inner join " . $innerJoin;
        $attr["outerJoin"] = "";
        foreach ($this->outerJoin as $outerJoin)
            $attr["outerJoin"] .= "outer join " . $outerJoin;
        $attr["leftJoin"] = "";
        foreach ($this->leftJoin as $leftJoin)
            $attr["leftJoin"] .= "left right " . $leftJoin;
        $attr["rightJoin"] = "";
        foreach ($this->rightJoin as $rightJoin)
            $attr["rightJoin"] .= "right join " . $rightJoin;
        $attr["where"] = $this->where ? "where " . implode(" and ", $this->where) : "";
        $attr["orderBy"] = $this->orderBy ? "order by " . $this->orderBy : "";
        $attr["groupBy"] = $this->groupBy ? "group by " . $this->groupBy : "";
        $attr["limit"] = $this->limit ? "limit " . $this->limit : "";
        $attr["offset"] = $this->offset ? "offset " . $this->offset : "";
        $attr["set"] = [];
        foreach ($this->set as $key => $value)
            $attr["set"][] = "`$key`=:" . $key;
        $attr["set"] = implode(",", $attr["set"]);

        switch ($this->type) {
            case "insert":
                return $this->insertBuilder($attr);
            case "select":
                return $this->selectBuilder($attr);
            case "update":
                return $this->updateBuilder($attr);
            case "delete":
                return $this->deleteBuilder($attr);
            default:
                return $this->selectBuilder($attr);
        }
    }

    protected function insertBuilder($attr)
    {
        extract($attr);

        $this->sql = "insert into " . $table . " set " . $set . ";";
        $this->sql = trim($this->sql);
        return $this;
    }

    protected function selectBuilder($attr)
    {
        extract($attr);

        $this->sql = "
            select " . $column . " from " . $table . "
            " . $innerJoin . " " . $outerJoin . " " . $leftJoin . " " . $rightJoin . "
            " . $where . "
            " . $orderBy . " " . $groupBy . "
            " . $limit . " " . $offset . ";
        ";
        $this->sql = trim($this->sql);
        return $this;
    }

    protected function updateBuilder($attr)
    {
        extract($attr);

        $this->sql = "update " . $table . " set " . $set . " " . $where . ";";
        $this->sql = trim($this->sql);
        return $this;
    }

    protected function deleteBuilder($attr)
    {
        extract($attr);

        $this->sql = "delete from " . $table . " " . $where . ";";
        $this->sql = trim($this->sql);
        return $this;
    }

    public function reset()
    {
        $this->type = "select";
        $this->column = "*";
        $this->table = "";
        $this->innerJoin = [];
        $this->outerJoin = [];
        $this->leftJoin = [];
        $this->rightJoin = [];
        $this->where = [];
        $this->orderBy = "";
        $this->groupBy = "";
        $this->limit = "";
        $this->offset = "";
        $this->set = [];
    }

    public function get($key)
    {
        $this->build();
        $this->reset();
        return isset($this->$key) ? $this->$key : "";
    }

    public function insert(string $table)
    {
        $this->type = "insert";
        $this->table = $table;
        $this->build();
        return $this;
    }
    public function read(string $table)
    {
        $this->type = "select";
        $this->table = $table;
        $this->build();
        return $this;
    }
    public function update(string $table)
    {
        $this->type = "update";
        $this->table = $table;
        $this->build();
        return $this;
    }
    public function delete(string $table)
    {
        $this->type = "delete";
        $this->table = $table;
        $this->build();
        return $this;
    }

    public function type($type)
    {
        $this->type = $type;
        $this->build();
        return $this;
    }

    public function column($column)
    {
        $this->column = $column;
        $this->build();
        return $this;
    }

    public function table($table)
    {
        $this->table = $table;
        $this->build();
        return $this;
    }

    public function innerJoin($innerJoin)
    {
        $this->innerJoin[] = $innerJoin;
        $this->build();
        return $this;
    }

    public function outerJoin($outerJoin)
    {
        $this->outerJoin[] = $outerJoin;
        $this->build();
        return $this;
    }

    public function leftJoin($leftJoin)
    {
        $this->leftJoin[] = $leftJoin;
        $this->build();
        return $this;
    }

    public function rightJoin($rightJoin)
    {
        $this->rightJoin[] = $rightJoin;
        $this->build();
        return $this;
    }

    public function where($where)
    {
        $this->where[] = $where;
        $this->build();
        return $this;
    }

    public function orderBy($orderBy)
    {
        $this->orderBy = $orderBy;
        $this->build();
        return $this;
    }

    public function groupBy($groupBy)
    {
        $this->groupBy = $groupBy;
        $this->build();
        return $this;
    }

    public function limit($limit)
    {
        $this->limit = $limit;
        $this->build();
        return $this;
    }

    public function offset($offset)
    {
        $this->offset = $offset;
        $this->build();
        return $this;
    }

    public function set($set)
    {
        $this->set = $set;
        $this->build();
        return $this;
    }

    public function sql($sql)
    {
        $this->sql = $sql;
        return $this;
    }
}
