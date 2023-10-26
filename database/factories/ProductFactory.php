<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name' => fake()->word(),
            'product_desc' => fake()->sentence(),
            'category' => fake()->word(),
            'price' => fake()->numberBetween(10000, 2000000),
            'stock' => fake()->randomDigit(),
        ];
    }
}
