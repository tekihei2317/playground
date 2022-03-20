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

    public function testSelect()
    {
        $this->assertEquals([2, 4, 6, 8], $this->sut->normal([1, 2, 3, 4]));
    }

    public function testSelect2()
    {
        $this->assertEquals([2, 4, 6, 8], $this->sut->normal2([1, 2, 3, 4]));
    }
}
