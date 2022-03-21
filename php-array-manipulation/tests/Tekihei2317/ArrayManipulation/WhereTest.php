<?php

namespace Tekihei2317\ArrayManipulation;

use PHPUnit\Framework\TestCase;

class WhereTest extends TestCase
{
    private Where $sut;

    protected function setUp(): void
    {
        $this->sut = new Where();
    }

    public function testFilterOdd()
    {
        $data = [1, 2, 4, 5, 10];
        $expected = [1, 5];

        $this->assertEquals($expected, $this->sut->filterOdd1($data));
        // $this->assertEquals($expected, array_values($this->sut->filterOdd2($data)->toArray()));
    }

    public function testFilterOddIndex()
    {
        $data = [1, 2, 4, 5, 10];
        $expected = [2, 5];

        $this->assertEquals($expected, $this->sut->filterOddIndex1($data));
        $this->assertEquals($expected, $this->sut->filterOddIndex2($data));
        // $this->assertEquals($expected, array_values($this->sut->filterOddIndex3($data)->toArray()));
    }
}
