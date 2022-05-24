<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meja>
 */
class MejaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'no_meja' => $this->faker->numberBetween(1, 100),
            'keterangan' => $this->faker->text,
            'status' => $this->faker->randomElement(['tersedia', 'kosong']),

        ];
    }
}
