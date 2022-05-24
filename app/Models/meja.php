<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meja extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_meja',
        'keterangan',
        'status',
    ];

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'meja_id');
    }

    public function detail_transaksi()
    {
        return $this->hasMany(Detail_transaksi::class, 'meja_id');
    }
}
