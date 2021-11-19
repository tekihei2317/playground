<?php

declare(strict_types=1);

// PHPでは配列の範囲外にアクセスしたとき、nullが返ってくる
// また、PHP Notice:  Undefined index: fuga in /Users/...のようなNoticeが発生する
// （例外ではないので停止しない）

// Undefined Array key...みたいな例外が発生するときもあるけど、違いは何？
// → Laravelでは範囲外アクセスしたときに例外投げるように拡張されている？

$array = ['hoge' => 'hoge'];
echo $array['hoge'] . PHP_EOL;
echo $array['fuga'] . PHP_EOL;
if ($array['fuga'] === null) {
    echo "範囲外にアクセスしたときはnullが返る";
}
