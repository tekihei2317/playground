<?php

declare(strict_types=1);

namespace Tekihei2317\ArrayManipulation;

use Ginq;

class All
{
    public function isAllTextFile1(array $data)
    {
        foreach ($data as $fileName) {
            if (!str_ends_with($fileName, '.txt')) return false;
        }

        return true;
    }

    public function isAllTextFile2(array $data)
    {
        return array_reduce($data, function (bool $sum, string $fileName) {
            return $sum && str_ends_with($fileName, '.txt');
        }, true);
    }

    public function isAllTextfile3(array $data)
    {
        return Ginq::from($data)->all(fn (string $fileName) => str_ends_with($fileName, '.txt'));
    }

    public function isAnyTextFile1(array $data)
    {
        foreach ($data as $fileName) {
            if (str_ends_with($fileName, '.txt')) return true;
        }

        return false;
    }

    public function isAnyTextFile2(array $data)
    {
        return array_reduce($data, function (bool $result, string $fileName) {
            return $result || str_ends_with($fileName, '.txt');
        }, false);
    }

    public function isAnyTextFile3(array $data)
    {
        return Ginq::from($data)->any(fn (string $fileName) => str_ends_with($fileName, '.txt'));
    }
}
