<?php

use App\Http\Controllers\DataManipulationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;
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

Route::get('/shipping-checklist/queue', function (Request $request) {
    $ip = $request->ip();
    $check = Admin::where('ip_address','=',$ip)->first();

    $getAllBooked = DB::table('data_grabbers')->where('Status' ,'=','BOOKED')->orWhere('Status','=','LOADING')->get();
        if(!$getAllBooked){
            return Inertia::render('Main', [
            'appName' => config('app.name'),
            'page' => 'queue',
            'queue' =>  null,
            'client_ip' => $check->ip_address?? null,
            'client_details' => $check ?? null
        ]);
    }
    $displayPreview = [];
    $finalPreview = [];
    foreach($getAllBooked as $key => $value){
        if(!$value->Shipment_Serial && !$value->Forwarder) return;
        $serial = $value->Shipment_Serial;
        $displayPreview [$serial]['Forwarder']=$value->Forwarder;
        $queueDisplay = DataManipulationController::pullDataBooking($serial);
        $finalPreview [$serial]= array_merge($queueDisplay[$serial] ,  $displayPreview[$serial]);
        $getDGstatus = DataManipulationController::pullDataGrabbers($serial);
        $finalPreview [$serial]['Shipment_Status'] = $getDGstatus;
    }
    return Inertia::render('Main', [
        'appName' => config('app.name'),
        'page' => 'queue',
        'queue' =>  $finalPreview,
        'client_ip' => $check->ip_address?? null,
        'client_details' => $check ?? null
    ]);
});

Route::post('/shipping-checklist/booking/save', [DataManipulationController::class,'save']);

Route::get('/shipping-checklist/queuers', function () {
    return Inertia::render('Main', [
        'appName' => config('app.name'),
    ]);
});

Route::post('/shipping-checklist/queue/mc',[DataManipulationController::class,'loadInvoice']);
Route::post('/shipping-checklist/queue/mcu',[DataManipulationController::class,'unLoadInvoice']);
Route::post('/shipping-checklist/queue/mcups',[DataManipulationController::class,'updateStatus']);

