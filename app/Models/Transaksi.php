<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaksi_id',
        'meja_id',
        'user_id',
        'total_bayar',
        'jumlah_bayar',
        'tanggal_transaksi',
    ];

    public function meja()
    {
        return $this->belongsTo(Meja::class, 'meja_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function detail_transaksi()
    {
        return $this->hasMany(Detail_transaksi::class, 'transaksi_id');
    }
}
