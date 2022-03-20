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
}
