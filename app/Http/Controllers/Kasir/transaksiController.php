<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaksi;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Detail_transaksi;


class transaksiController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transaksi = DB::table('transaksis')
            ->join('mejas', 'transaksis.meja_id', '=', 'mejas.id')
            ->join('users', 'transaksis.user_id', '=', 'users.id')
            ->select('transaksis.*', 'mejas.keterangan', 'users.name')
            ->get();

        if (empty($transaksi)) {
            return response()->json([
                'message' => 'Data tidak ditemukan',
                'data' => $transaksi
            ], 404);
        }

        return response()->json([
            'data' => $transaksi
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->tokenCan('kasir_token')) {
            $validator = Validator::make($request->all(), [
                'transaksi_id' => 'required',
                'meja_id' => 'required',
                'user_id' => 'required',
                'total_bayar' => 'required|numeric',
                'jumlah_bayar' => 'required|numeric',
                'tanggal_transaksi' => 'required|date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()
                ], 400);
            }

            try {
                $transaksi = Transaksi::create([
                    'transaksi_id' => $request->transaksi_id,
                    'meja_id' => $request->meja_id,
                    'user_id' => $request->user_id,
                    'total_bayar' => $request->total_bayar,
                    'jumlah_bayar' => $request->jumlah_bayar,
                    'tanggal_transaksi' => $request->tanggal_transaksi,
                ]);

                return response()->json([
                    'message' => 'Data berhasil ditambahkan',
                    'data' => $transaksi

                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 400);
            }
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function CreateDetailTransaksi(Request $req)
    {

        // contoh data yang akan diinputkan
        // [
        //     {
        //     "transaksi_id" : "4",
        //     "menu_id": "1",
        //     "jumlah": "2",
        //     "harga": "5000",
        //     "sub_total": "10000"
        //     },
        //     {
        //     "transaksi_id" : "4",
        //     "menu_id": "3",
        //     "jumlah": "2",
        //     "harga": "4000",
        //     "sub_total": "16000"
        //     }
        //   ]

        $user = $req->user();
        if ($user->tokenCan('kasir_token')) {
            $getencode = json_encode($req->all());
            $getdecode = json_decode($getencode);

            foreach ($getdecode as $value) {
                $detail_transaksi =  new Detail_transaksi();
                $detail_transaksi->transaksi_id = $value->transaksi_id;
                $detail_transaksi->menu_id = $value->menu_id;
                $detail_transaksi->jumlah = $value->jumlah;
                $detail_transaksi->harga = $value->harga;
                $detail_transaksi->sub_total = $value->sub_total;
                $detail_transaksi->save();
            }
            return response()->json([
                'message' => 'Data berhasil ditambahkan',
                'data' => $detail_transaksi
            ], 200);
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
