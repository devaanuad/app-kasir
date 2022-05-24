<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            MenuSeeder::class,
            MejaSeeder::class
        ]);

        User::factory(3)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'admin',
        //     'email' => 'admin@mail.com',
        //     'password' => bcrypt('123'),
        //     'role' => 'admin'
        // ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'manager',
        //     'email' => 'manager@mail.com',
        //     'password' => bcrypt('123'),
        //     'role' => 'manager'
        // ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'kasir',
        //     'email' => 'kasir@mail.com',
        //     'password' => bcrypt('123'),
        //     'role' => 'kasir'
        // ]);
    }
}
