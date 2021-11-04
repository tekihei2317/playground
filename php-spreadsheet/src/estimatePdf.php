<?php

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Html;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Dompdf;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Tcpdf;

$spreadsheet = IOFactory::load('./template/estimate-template.xlsx');
$sheet = $spreadsheet->getActiveSheet();

// 値の書き込み
// $sheet->setCellValue('A1', 'Hello, world!');

// PDFとして保存する

// $pdfWriter = new Dompdf($spreadsheet);
// $pdfWriter->save(__DIR__ . '/../output/estimate-dompdf.pdf');

// $pdfWriter = new Mpdf($spreadsheet);
// $pdfWriter->save(__DIR__ . '/../output/estimate-mpdf.pdf');

// $pdfWriter = new Tcpdf($spreadsheet);
// $pdfWriter->save(__DIR__ . '/../output/estimate-tcpdf.pdf');

$htmlWriter = new Html($spreadsheet);
$htmlWriter->save(__DIR__ . '/../output/estimate.html');
