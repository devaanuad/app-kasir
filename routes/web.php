<?php

use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return stringValue('Hello World');
// });

Route::get('auth/google/redirect', [GoogleController::class, "redirectToGoogle"]);
Route::get('auth/google/callback', [GoogleController::class, "handleGoogleCallback"]);
