<?php

interface Fee
{
    public function fee(): int;
    public function label(): string;
}

class AdultFee implements Fee
{
    public function fee(): int
    {
        return 100;
    }

    public function label(): string
    {
        return '大人';
    }
}

class ChildFee implements Fee
{
    public function fee(): int
    {
        return 50;
    }

    public function label(): string
    {
        return '子供';
    }
}

class SeniorFee implements Fee
{
    public function fee(): int
    {
        return 80;
    }

    public function label(): string
    {
        return 'シニア';
    }
}

class Reservation
{
    private array $fees = [];

    public function addFee(Fee $fee)
    {
        $this->fees[] = $fee;
    }

    public function feeTotal(): int
    {
        $total = 0;
        foreach ($this->fees as $fee) {
            $total += $fee->fee();
        }
        return $total;
    }
}

$fees = [
    new ChildFee,
    new AdultFee,
    new SeniorFee,
];

$reservation = new Reservation;

foreach ($fees as $fee) {
    $reservation->addFee($fee);
}

echo $reservation->feeTotal() . PHP_EOL;
