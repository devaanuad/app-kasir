<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_menu',
        'deskripsi',
        'harga',
        'kategori',
    ];


    public function detail_transaksi()
    {
        return $this->hasMany(Detail_transaksi::class, 'menu_id');
    }
}
