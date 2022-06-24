<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;


class GoogleController extends Controller
{
    public function redirectToGoogle()
    {

        try {
            $url = Socialite::driver('google')->redirect()->getTargetUrl();
            return response()->json(['url' => $url], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function handleGoogleCallback()
    {

        try {
            $user = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        $authUser = User::where('email', $user->email)->first();
        if ($authUser) {
            $token = $authUser->createToken('kasir', ['kasir_token'])->plainTextToken;
            Auth::login($authUser, true);
            return response()->json(['user' => $authUser, 'token' => $token], 200);
        } else {
            $newUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'google_id' => $user->id,
                'role' => 'kasir',
            ]);
            $token2 = $newUser->createToken('kasir', ['kasir_token'])->plainTextToken;
            Auth::login($newUser, true);
            return response()->json(['user' => $newUser, 'token' => $token2], 200);
        }
    }
}
