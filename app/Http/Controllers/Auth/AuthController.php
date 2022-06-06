<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Data tidak valid',
                'error' => $validator->errors()
            ], 400);
        }


        try {
            $user = User::where('email', $req->email)->first();
            if (empty($user)) {
                return response()->json([
                    'message' => 'Email tidak ditemukan'
                ], 404);
            }

            if (!password_verify($req->password, $user->password)) {
                return response()->json([
                    'message' => 'Password tidak sesuai'
                ], 400);
            }

            if ($user->role == 'manager') {
                $token = $user->createToken('manager', ['manager_token'])->plainTextToken;
                return response()->json([
                    'message' => 'Login berhasil',
                    'data' => [
                        'token_type' => 'Bearer',
                        'token' => $token,
                        'user' => $user
                    ]
                ], 200);
            } elseif ($user->role == 'admin') {
                $token = $user->createToken('admin', ['admin_token'])->plainTextToken;
                return response()->json([
                    'message' => 'Login berhasil',
                    'data' => [
                        'token_type' => 'Bearer',
                        'token' => $token,
                        'user' => $user
                    ]
                ], 200);
            } else {
                $token = $user->createToken('kasir', ['kasir_token'])->plainTextToken;
                return response()->json([
                    'message' => 'Login berhasil',
                    'data' => [
                        'token_type' => 'Bearer',
                        'token' => $token,
                        'user' => $user
                    ]
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error' => $th->getMessage()
            ], 500);
        }
    }

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
