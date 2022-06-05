<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class menuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nama_menu' => $this->nama_menu,
            'deskripsi' => $this->deskripsi,
            'harga' => $this->harga,
            'kategori' => $this->kategori,
            'gambar' => url($this->gambar),
        ];
    }
}
