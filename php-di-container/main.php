<?php

class Container
{
    /** @var array<string, string> */
    private array $definitions = [];

    public function define(string $id, string $className)
    {
        $this->definitions[$id] = $className;
    }

    public function get(string $id)
    {
        $className = $this->definitions[$id] ?? $id;
        $ref = new ReflectionClass($className);
        $constructor = $ref->getConstructor();

        if ($constructor === null) {
            return new $className;
        }

        // コンストラクタの依存先をインスタンス化する
        $args = [];
        foreach ($constructor->getParameters() as $parameter) {
            $type = $parameter->getType()->getName();
            $args[] = $this->get($type);
        }

        return new $className(...$args);
    }
}

class Hoge
{
    private Fuga $fuga;

    public function __construct(Fuga $fuga)
    {
        $this->fuga = $fuga;
    }
}

class Fuga
{
}

// $class = new ReflectionClass(Hoge::class);
// var_dump($class->getConstructor()); // RefrectionMethod
// var_dump($class->getConstructor()->getParameters()); // RefrectionParameter[]
// var_dump($class->getConstructor()->getParameters()[0]->getType()); // RefrectionNamedType
// var_dump($class->getConstructor()->getParameters()[0]->getType()->getName()); // string

$container = new Container;
$instance = $container->get(Hoge::class);

var_dump($instance);
