<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\userController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Kasir\transaksiController;
use App\Http\Controllers\Manager\mejaController;
use App\Http\Controllers\Manager\menuController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/user', [userController::class, 'getUserss']);
    Route::post('/user/create', [userController::class, 'create']);
    Route::get('/user/{id}', [userController::class, 'show']);
    Route::put('/user/{id}', [userController::class, 'edit']);
    Route::delete('/user/{id}', [userController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('manager')->group(function () {
    Route::get('/meja', [mejaController::class, 'index']);
    Route::post('/meja/create', [mejaController::class, 'create']);
    Route::get('/meja/{id}', [mejaController::class, 'show']);
    Route::put('/meja/update/{id}', [mejaController::class, 'update']);
    Route::delete('/meja/{id}', [mejaController::class, 'destroy']);

    Route::get('/menu', [menuController::class, 'index']);
    Route::post('/menu/create', [menuController::class, 'create']);
    Route::get('/menu/{id}', [menuController::class, 'show']);
    Route::post('/menu/update/{id}', [menuController::class, 'update']);
    Route::delete('/menu/delete/{id}', [menuController::class, 'delete']);
});

Route::middleware('auth:sanctum')->prefix('kasir')->group(function () {
    Route::get('/transaksi', [transaksiController::class, 'index']);
    Route::post('/transaksi/create', [transaksiController::class, 'store']);
    Route::get('/transaksi/{id}', [transaksiController::class, 'show']);
    Route::post('/transaksi/createDetail', [transaksiController::class, 'CreateDetailTransaksi']);
    Route::delete('/transaksi/{id}', [transaksiController::class, 'destroy']);

    Route::get('/menu', [menuController::class, 'index']);
    Route::post('/menu/create', [menuController::class, 'create']);
    Route::get('/menu/{id}', [menuController::class, 'show']);
    Route::post('/menu/update/{id}', [menuController::class, 'update']);
    Route::delete('/menu/delete/{id}', [menuController::class, 'delete']);
});

// route login logout
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
