<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\IncomesController;
use App\Http\Controllers\API\ExpensesController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\CategoriesController;

Route::get('/', function () {
    return response()->json(['message' => 'Hello world!']);
});
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('jwt')->group(function () {
        Route::get('/user', [AuthController::class, 'getUser']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
    });
});

Route::middleware('jwt')->group(function () {
    Route::resource('categories', CategoriesController::class)->except('create', 'show', 'edit');
    Route::resource('incomes', IncomesController::class)->except('create', 'show', 'edit');
    Route::resource('expenses', ExpensesController::class)->except('create', 'show', 'edit');
    Route::get('categories/{categoryId}/expenses', [ExpensesController::class, 'expensesByCategory']);
});
