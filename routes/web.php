<?php

use App\Http\Controllers\DataManipulationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Admin;
use Illuminate\Support\Facades\Mail;
use App\Mail\SystemNotificationMail;
//@return user details
Route::get('/shipping-checklist/home', function (Request $request) {
    $ip = $request->ip();
    $check = Admin::where('ip_address','=',$ip)->first();

    return Inertia::render('Main', [
        'appName' => config('app.name'),
        'client_ip' =>$check->ip_address?? null,
        'client_details' => $check ?? null
    ]);
});

Route::get('/shipping-checklist/booking', function (Request $request) {
    $ip = $request->ip();
    $check = Admin::where('ip_address','=',$ip)->first();
      return Inertia::render('Main', [
        'appName' => config('app.name'),
        'client_ip' => $check->ip_address?? null,
        'client_details' => $check ?? null
    ]);
});

Route::post('/shipping-checklist/booking/save', [DataManipulationController::class,'saveData']);

Route::get('/shipping-checklist/queuers', function () {
    return Inertia::render('Main', [
        'appName' => config('app.name'),
    ]);
});

