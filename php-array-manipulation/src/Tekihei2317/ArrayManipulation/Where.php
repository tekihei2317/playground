<?php

declare(strict_types=1);

namespace Tekihei2317\ArrayManipulation;

use Ginq;

class Where
{
    public function filterOdd1(array $data)
    {
        return array_values(
            array_filter($data, fn ($value) => $value % 2 === 1)
        );
    }

    public function filterOdd2(array $data)
    {
        return Ginq::from($data)->where(fn ($value) => $value % 2 == 1);
    }

    public function filterOddIndex1(array $data)
    {
        $result = [];
        foreach ($data as $i => $value) {
            if ($i % 2 === 1) {
                $result[] = $value;
            }
        }

        return $result;
    }

    public function filterOddIndex2(array $data)
    {
        return array_values(
            array_filter($data, function ($value, $index) {
                return $index % 2 === 1;
            }, ARRAY_FILTER_USE_BOTH)
        );
    }

    public function filterOddIndex3(array $data)
    {
        return Ginq::from($data)->where(fn ($value, $i) => $i % 2 === 1);
    }
}
