<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Meja;

class MejaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'no_meja' => 1,
                'keterangan' => 'Meja 1',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 2,
                'keterangan' => 'Meja 2',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 3,
                'keterangan' => 'Meja 3',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 4,
                'keterangan' => 'Meja 4',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 5,
                'keterangan' => 'Meja 5',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 6,
                'keterangan' => 'Meja 6',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 7,
                'keterangan' => 'Meja 7',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 8,
                'keterangan' => 'Meja 8',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 9,
                'keterangan' => 'Meja 9',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 10,
                'keterangan' => 'Meja 10',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 11,
                'keterangan' => 'Meja 11',
                'status' => 'kosong'
            ],
            [
                'no_meja' => 12,
                'keterangan' => 'Meja 12',
                'status' => 'kosong'
            ],
        ];

        foreach ($data as $item) {
            Meja::create($item);
        }
    }
}
