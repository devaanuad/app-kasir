<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\userController;
use App\Http\Controllers\Manager\mejaController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::prefix('admin')->group(function () {
    Route::get('/user', [userController::class, 'index']);
    Route::post('/user/create', [userController::class, 'create']);
    Route::get('/user/{id}', [userController::class, 'show']);
    Route::put('/user/{id}', [userController::class, 'edit']);
    Route::delete('/user/{id}', [userController::class, 'destroy']);
});

Route::prefix('manager')->group(function () {
    Route::get('/meja', [mejaController::class, 'index']);
    Route::post('/meja/create', [mejaController::class, 'create']);
    Route::get('/meja/{id}', [mejaController::class, 'show']);
    Route::put('/meja/update/{id}', [mejaController::class, 'update']);
    Route::delete('/meja/{id}', [mejaController::class, 'destroy']);

    Route::get('/menu', [mejaController::class, 'index']);
    Route::post('/menu/create', [mejaController::class, 'create']);
    Route::get('/menu/{id}', [mejaController::class, 'show']);
    Route::put('/menu/update/{id}', [mejaController::class, 'update']);
    Route::delete('/menu/{id}', [mejaController::class, 'delete']);
});
