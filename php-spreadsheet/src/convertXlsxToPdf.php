<?php

$xlsxPath = __DIR__ . '/../output/estimate.xlsx';
$storeDir = __DIR__ . '/../output';
$command = "soffice --headless --convert-to pdf --outdir {$storeDir} {$xlsxPath}";
echo $command . PHP_EOL;
exec($command);
