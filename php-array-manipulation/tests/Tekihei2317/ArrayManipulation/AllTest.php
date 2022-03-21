<?php

namespace Tekihei2317\ArrayManipulation;

use PHPUnit\Framework\TestCase;

class AllTest extends TestCase
{
    private All $sut;

    protected function setUp(): void
    {
        $this->sut = new All();
    }

    /**
     * @dataProvider dataProvider_testAll
     */
    public function testAll(array $fileNames, bool $expected)
    {
        $this->assertEquals($expected, $this->sut->isAllTextFile1($fileNames));
        $this->assertEquals($expected, $this->sut->isAllTextFile2($fileNames));
        // $this->assertEquals($expected, $this->sut->isAllTextFile3($fileNames));
    }

    public function dataProvider_testAll()
    {
        return [
            [['1.txt', 'あいう.txt', 'readme.txt'], true],
            [['1.txt', 'あいう.doc', 'readme'], false],
        ];
    }

    /**
     * @dataProvider dataProvider_testAny
     */
    public function testAny(array $fileNames, bool $expected)
    {
        $this->assertEquals($expected, $this->sut->isAnyTextFile1($fileNames));
        $this->assertEquals($expected, $this->sut->isAnyTextFile2($fileNames));
        // $this->assertEquals($expected, $this->sut->isAnyTextFile3($fileNames));
    }

    public function dataProvider_testAny()
    {
        return [
            [['1.txt', 'あいう.txt', 'readme'], true],
            [['1.php', 'あいう.doc', 'readme'], false],
        ];
    }
}
