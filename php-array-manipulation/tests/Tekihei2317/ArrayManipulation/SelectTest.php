<?php

declare(strict_types=1);

namespace Tekihei2317\ArrayManipulation;

use PHPUnit\Framework\TestCase;

class SelectTest extends TestCase
{
    private Select $sut;

    protected function setUp(): void
    {
        $this->sut = new Select();
    }

    public function testDouble()
    {
        $data = [1, 2, 4, 5];
        $expected = [2, 4, 8, 10];

        $this->assertEquals($expected, $this->sut->normal($data));
        $this->assertEquals($expected, $this->sut->normal2($data));
        $this->assertEquals($expected, $this->sut->ginq($data)->toArray());
    }
}
