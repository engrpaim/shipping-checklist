<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', function () {
      return Inertia::render('Main', [
        'appName' => config('app.name'),
    ]);
});

Route::get('/shipping-checklist/booking', function () {
      return Inertia::render('Main', [
        'appName' => config('app.name'),
    ]);
});

Route::get('/shipping-checklist/home', function () {
      return Inertia::render('Main', [
        'appName' => config('app.name'),
    ]);
});
Route::get('/shipping-checklist/mc', function () {
      return Inertia::render('Main', [
        'appName' => config('app.name'),
    ]);
});

