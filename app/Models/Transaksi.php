<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_transaksi',
        'id_meja',
        'id_user',
        'total_harga',
        'jumlah_bayar',
        'tanggal_transaksi',
    ];

    public function meja()
    {
        return $this->belongsTo(Meja::class, 'id_meja');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function detail_transaksi()
    {
        return $this->hasMany(Detail_transaksi::class, 'id_transaksi');
    }
}
