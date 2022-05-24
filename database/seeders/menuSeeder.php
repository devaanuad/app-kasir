<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Menu::factory(10)->create();
        $data = [
            [
                'nama_menu' => 'Ayam Goreng',
                'deskripsi' => 'Ayam Goreng',
                'harga' => 10000,
                'kategori' => 'makanan'
            ],
            [
                'nama_menu' => 'Ayam Bakar',
                'deskripsi' => 'Ayam Bakar',
                'harga' => 15000,
                'kategori' => 'makanan'
            ],
            [
                'nama_menu' => 'Nasi Goreng',
                'deskripsi' => 'Nasi Goreng',
                'harga' => 10000,
                'kategori' => 'makanan'
            ],
            [
                'nama_menu' => 'Nasi Bakar',
                'deskripsi' => 'Nasi Bakar',
                'harga' => 15000,
                'kategori' => 'makanan'
            ],
            [
                'nama_menu' => 'Es Teh',
                'deskripsi' => 'Es Teh',
                'harga' => 5000,
                'kategori' => 'minuman'
            ],
            [
                'nama_menu' => 'Es Jeruk',
                'deskripsi' => 'Es Jeruk',
                'harga' => 5000,
                'kategori' => 'minuman'
            ],
            [
                'nama_menu' => 'Es Teh Manis',
                'deskripsi' => 'Es Teh Manis',
                'harga' => 5000,
                'kategori' => 'minuman'
            ],
            [
                'nama_menu' => 'Es Jeruk Manis',
                'deskripsi' => 'Es Jeruk Manis',
                'harga' => 5000,
                'kategori' => 'minuman'
            ],
            [
                'nama_menu' => 'Es Teh Milo',
                'deskripsi' => 'Es Teh Milo',
                'harga' => 5000,
                'kategori' => 'minuman'
            ],
        ];

        foreach ($data as $key => $value) {
            Menu::create($value);
        }
    }
}
