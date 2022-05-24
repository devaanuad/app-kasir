<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nama_menu' => $this->faker->name,
            'deskripsi' => $this->faker->text,
            'harga' => $this->faker->numberBetween(1000, 100000),
            'kategori' => $this->faker->randomElement(['makanan', 'minuman']),
        ];
    }
}
