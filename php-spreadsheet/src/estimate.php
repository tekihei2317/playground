<?php

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

$spreadsheet = IOFactory::load('./template/estimate-template.xlsx');
$sheet = $spreadsheet->getActiveSheet();

// 値の書き込み
$sheet->setCellValue('A1', 'Hello, world!');

// 保存
$writer = new Xlsx($spreadsheet);
$writer->save(__DIR__ . '/../output/estimate.xlsx');
