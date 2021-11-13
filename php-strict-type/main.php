<?php

declare(strict_types=1);

// stringでもデフォルト値にnullを入れられる
function concat(string $str1, string $str2 = null): string
{
    return $str1 . $str2;
}

// intでもデフォルト値にnullを入れられる
function add(int $num1, int $num2 = null): int
{
    return $num1 + $num2;
}

// test
echo concat('test', null) . PHP_EOL;

// 5
echo add(2, 3) . PHP_EOL;

// 結論: 引数の場合は、指定した型またはnullを入れることができるみたい
