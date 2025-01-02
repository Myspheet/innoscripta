<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Auth Route
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::group(['middleware' => 'auth:sanctum'], function() {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

Route::get('news', [NewsController::class, 'index']);

Route::group(['middleware' => 'auth:sanctum'], function() {
   Route::get('news/personalized', [NewsController::class, 'personalizedFeed']);
   Route::get('profile/preferences', [ProfileController::class, 'getOptions']);
   Route::post('profile/preferences', [ProfileController::class, 'saveOptions']);
});
