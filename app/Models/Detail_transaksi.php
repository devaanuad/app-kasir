<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaksi_id',
        'meja_id',
        'menu_id',
        'jumlah',
        'harga',
        'subtotal',

    ];

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'transaksi_id');
    }

    public function meja()
    {
        return $this->belongsTo(Meja::class, 'meja_id');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
