<?php

$address = '東京都新宿区';
$regex = '/((?:旭川|伊達|石狩)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村])(.+)/u';
preg_match_all($regex, $address, $matches);

print_r($matches);

$regex1 = '/(?:旭川|伊達|石狩)市/u'; // 旭川市、伊達市 など ?:は分かりませんでした
$regex2 = '/.+?郡(?:玉村|大町|.+?)[町村]/u'; // 未解読
$regex3 = '/.+?市.+?区/'; // xx市xx区 など 市の中に区があることがある？
$regex4 = '/.+?[市区町村]/u'; // 新宿区 など

$address = '東京都新宿区x';

preg_match_all($regex, $address, $matches);
print_r($matches);
