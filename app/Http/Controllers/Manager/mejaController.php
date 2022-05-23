<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Resources\mejaResource;
use Illuminate\Http\Request;
use App\Models\meja;

class mejaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $meja = cache()->remember('meja', now()->addSeconds(60), function () {
            return mejaResource::collection(meja::all());
        });

        if (empty($meja)) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $meja
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $req)
    {
        $validator = validator($req->all(), [
            'no_meja' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
            'status' => 'required|in:kosong,terisi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }
        try {
            $meja = meja::create([
                'no_meja' => $req->no_meja,
                'keterangan' => $req->keterangan,
                'status' => $req->status,
            ]);

            return response()->json([
                'message' => 'Data berhasil ditambahkan',
                'data' => $meja
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Data gagal ditambahkan',
                'error' => $th->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = validator($request->all(), [
            'no_meja' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
            'status' => 'required|in:kosong,terisi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }

        try {
            $meja = meja::findOrFail($id);
            $meja->update($request->all());

            return response()->json([
                'message' => 'Data berhasil diubah',
                'data' => $meja
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Data gagal diubah',
                'error' => $th->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $meja = meja::findOrFail($id);
        if (empty($meja)) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        try {
            $meja->delete();

            return response()->json([
                'message' => 'Data berhasil dihapus'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Data gagal dihapus',
                'error' => $th->getMessage()
            ], 400);
        }
    }

    public function show($id)
    {
        $meja = cache()->remember('meja', now()->addSeconds(60), function () use ($id) {
            return mejaResource::collection(meja::findOrFail($id));
        });

        if (empty($meja)) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $meja
        ], 200);
    }
}
