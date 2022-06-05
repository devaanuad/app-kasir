<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\menu;
use App\Http\Resources\menuResource;
use Illuminate\Support\Facades\Storage;

class menuController extends Controller
{
    public function index()
    {
        // $menu = cache()->remember('menu', now()->addSeconds(60), function () {
        //     return menuResource::collection(menu::all());
        // });

        $menu = menuResource::collection(menu::all());

        if (empty($menu)) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $menu
        ], 200);
    }

    public function create(Request $req)
    {
        $validator = validator($req->all(), [
            'nama_menu' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'harga' => 'required|integer',
            'kategori' => 'required|in:makanan,minuman',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }

        try {
            $menu = menu::create([
                'nama_menu' => $req->nama_menu,
                'deskripsi' => $req->deskripsi,
                'harga' => $req->harga,
                'kategori' => $req->kategori,
                'gambar' => $req->gambar->store('menu'),
            ]);
            $req->gambar->store('menu');
            return response()->json([
                'message' => 'Data berhasil ditambahkan',
                'data' => $menu
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function update(Request $req, $id)
    {
        $menu = menu::find($id);
        $validator = validator($req->all(), [
            'nama_menu' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'harga' => 'required|integer',
            'kategori' => 'required|in:makanan,minuman',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5048',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }

        // JIKA GAMBAR TIDAK KOSONG (gambar di update) MAKA HAPUS GAMBAR LAMA
        if ($req->gambar !== "") {
            try {
                Storage::delete($menu->gambar);
                $menu->update([
                    'nama_menu' => $req->nama_menu,
                    'deskripsi' => $req->deskripsi,
                    'harga' => $req->harga,
                    'kategori' => $req->kategori,
                    'gambar' => $req->gambar->store('menu'),
                ]);

                return response()->json([
                    'message' => 'Data berhasil diubah',
                    'data' => $menu
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 400);
            }
            // JIKA GAMBAR KOSONG MAKA GAMBAR TIDAK DIUBAH
        } else {
            try {
                $menu->update([
                    'nama_menu' => $req->nama_menu,
                    'deskripsi' => $req->deskripsi,
                    'harga' => $req->harga,
                    'kategori' => $req->kategori,
                ]);
                return response()->json([
                    'message' => 'Data berhasil diubah',
                    'data' => $menu
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 400);
            }
        }
    }

    public function delete($id)
    {
        try {
            $menu = menu::find($id);
            Storage::delete($menu->gambar);
            $menu->delete();

            return response()->json([
                'message' => 'Data berhasil dihapus',
                'data' => $menu
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function show($id)
    {
        $menu = cache()->remember('menu', now()->addSeconds(60), function () use ($id) {
            return menuResource::collection(menu::find($id));
        });

        if (empty($menu)) {
            return response()->json([
                'message' => 'Data tidak ditemukan',
                'data' => $menu
            ], 404);
        }

        return response()->json([
            'data' => $menu
        ], 200);
    }
}
