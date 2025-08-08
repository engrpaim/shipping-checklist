<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', function () {
      return Inertia::render('Main', [
        'appName' => config('app.name'),
    ]);
});
