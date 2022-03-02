<?php

class Container
{
    /** @var array<string, string> */
    private $definitions = [];

    public function define(string $id, string $className): void
    {
        $this->definitions[$id] = $className;
    }

    public function get(string $id)
    {
        if (isset($this->definitions[$id])) {
            $className = $this->definitions[$id];
            return new $className();
        }

        return null;
    }
}

class Foo
{
}

$container = new Container();

$container->define('fuga', Foo::class);

var_dump($container->get('fuga'));
