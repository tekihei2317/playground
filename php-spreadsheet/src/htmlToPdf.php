<?php

require 'vendor/autoload.php';

use Dompdf\Dompdf;

$dompdf = new Dompdf();
$html = file_get_contents(__DIR__ . '/../output/estimate.html');

echo $html . PHP_EOL;

$dompdf->loadHtml($html);
$dompdf->render();

file_put_contents(__DIR__ . '/../output/estimate-from-html.pdf', $dompdf->output());
