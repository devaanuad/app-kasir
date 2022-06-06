<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\http\Resources\userResource;
use Illuminate\Support\Facades\Cache;
use phpDocumentor\Reflection\Types\Nullable;

class userController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $users = cache()->remember('users', 60, function () {
        //     return userResource::collection(User::all());
        // });

        $users = userResource::collection(User::all());

        if (empty($users)) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            "data" => $users
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('admin_token')) {

            $messageError = [
                'required' => ':attribute tidak boleh kosong',
                'min' => ':attribute minimal :min karakter',
                'max' => ':attribute maksimal :max karakter',
                'email' => ':attribute email tidak valid',
                'unique' => ':attribute sudah digunakan',
            ];

            $validator = Validator::make($req->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:3',
                'role' => 'required|in:manager,admin,kasir'
            ], $messageError);

            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ], 400);
            }

            try {
                $user = User::create([
                    'name' => $req->name,
                    'email' => $req->email,
                    'password' => Hash::make($req->password),
                    'role' => $req->role
                ]);

                return response()->json([
                    'message' => 'Data berhasil ditambahkan',
                    'data' => $user
                ], 201);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Gagal menambah data',
                    'error' => $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = cache()->remember('user_' . $id, 60, function () use ($id) {
            return new userResource(User::find($id));
        });

        if (empty($user)) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $user
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(request $req, $id)
    {
        //make edit user
        $user = User::find($id);
        $validator = Validator::make($req->all(), [
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:3',
            'role' => 'in:manager,admin,kasir'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Data tidak valid',
                'error' => $validator->errors()
            ], 400);
        }

        // jika password kosong 
        if ($req->password == "") {
            try {
                $user->update([
                    'name' => $req->name,
                    'email' => $req->email,
                    'role' => $req->role
                ]);

                return response()->json([
                    'message' => 'Data berhasil diubah',
                    'data' => $user
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Gagal mengubah data',
                    'error' => $e->getMessage()
                ], 500);
            }
            // jika password tiidak kosong dan password baru sama dengan password lama
        } elseif (password_verify($req->password_old, $user->password)) {
            try {
                $user->update([
                    'name' => $req->name,
                    'email' => $req->email,
                    'password' => Hash::make($req->password),
                    'role' => $req->role
                ]);

                return response()->json([
                    'message' => 'Data berhasil diubah',
                    'data' => $user
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Gagal mengubah data',
                    'error' => $e->getMessage()
                ], 500);
            }
            // jika password tidak sama dengan password lama
        } else {
            return response()->json([
                'message' => 'Password tidak sesuai'
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (empty($user)) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        try {
            $user->delete();

            return response()->json([
                'message' => 'Data berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // make function for logout 
    public function logout(Request $req)
    {

        try {
            $user = $req->user();
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
            return response()->json([
                'message' => 'Logout berhasil'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Gagal melakukan logout',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
