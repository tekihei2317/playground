<?php

declare(strict_types=1);

namespace Tekihei2317\ArrayManipulation;

use Ginq\Ginq;

class Select
{
    public function normal(array $data)
    {
        $result = [];
        foreach ($data as $i => $item) {
            $result[$i] = $item * 2;
        }

        return $result;
    }

    public function normal2(array $data)
    {
        return array_map(fn ($item) => $item * 2, $data);
    }

    public function ginq(array $data)
    {
        return Ginq::from($data)->select(fn ($item) => $item * 2);
    }

    public function doubleIfEvenIndex(array $data)
    {
        $result = [];
        foreach ($data as $i => $item) {
            $coefficient = ($i % 2 === 0 ? 2 : 1);
            $result[] = $coefficient * $item;
        }

        return $result;
    }

    public function doubleIfEvenIndex2(array $data)
    {
        return array_map(function ($item, $index) {
            $coefficient = ($index % 2 === 0 ? 2 : 1);
            return $coefficient * $item;
        }, $data, array_keys($data));
    }

    public function doubleIfEvenIndex3(array $data)
    {
        return Ginq::from($data)->select(function ($value, $index) {
            return $index % 2 === 0 ? $value * 2 : $value;
        });
    }
}
