<?php

use App\Http\Controllers\DataManipulationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\SystemNotificationMail;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;
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
    // $path = 'C:/Shipping_Check_List';
    $path = '/var/data/Shipping_Check_List';
    $currentYear = Carbon::now()->year;
    $yearPath = $path ."/". $currentYear;
    if(!File::exists($path)){
        File::makeDirectory($path,0775,true);
    }
    if(!File::exists( $yearPath)){
        File::makeDirectory($yearPath,0775,true);
    }
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
    $files = ['container.jpg', 'container.png','pallets.jpg','pallets.jpg','slip.png','slip.jpg','seal.png','seal.jpg'];
    foreach($getAllBooked as $key => $value){
        if(!$value->Shipment_Serial && !$value->Forwarder) return;
        $serial = $value->Shipment_Serial;
        $displayPreview [$serial]['Forwarder']=$value->Forwarder;
        $queueDisplay = DataManipulationController::pullDataBooking($serial);
        $finalPreview [$serial]= array_merge($queueDisplay[$serial] ,  $displayPreview[$serial]);
        $getDGstatus = DataManipulationController::pullDataGrabbers($serial);
        $finalPreview [$serial]['Shipment_Status'] = $getDGstatus;

        $checkingShipmentFolder = $yearPath ."/". $value->Shipment_Serial;

        if(!File::exists($checkingShipmentFolder)){
            File::makeDirectory($checkingShipmentFolder,0775,true);
        }
        $pictureStatus =  $checkingShipmentFolder. "/"  ;
        foreach($files as $picture){
            str_contains($picture,'container') ? $finalPreview[$serial]['container_picture'] = (File::exists($pictureStatus.'container.jpg')||File::exists($pictureStatus.'container.png')):null;
            str_contains($picture,'slip') ? $finalPreview[$serial]['slip_picture'] = (File::exists($pictureStatus.'slip.jpg')||File::exists($pictureStatus.'slip.png')):null;
            str_contains($picture,'seal') ? $finalPreview[$serial]['seal_picture'] = (File::exists($pictureStatus.'seal.jpg')||File::exists($pictureStatus.'seal.png')):null;
            str_contains($picture,'pallets') ? $finalPreview[$serial]['pallets_picture'] = (File::exists($pictureStatus.'pallets.jpg')||File::exists($pictureStatus.'pallets.png')):null;


              if (str_contains($picture, 'container')) {
                $finalPreview[$serial]['container_image'] = File::exists($pictureStatus.'container.jpg')
                    ? url($pictureStatus.'container.jpg')
                    : (File::exists($pictureStatus.'container.png')
                        ? url($pictureStatus.'container.png')
                        : null);
            }

            // Slip picture
            if (str_contains($picture, 'slip')) {
                $finalPreview[$serial]['slip_image'] = File::exists($pictureStatus.'slip.jpg')
                    ? url($pictureStatus.'slip.jpg')
                    : (File::exists($pictureStatus.'slip.png')
                        ?url($pictureStatus.'slip.png')
                        : null);
            }

            // Seal picture
            if (str_contains($picture, 'seal')) {
                $finalPreview[$serial]['seal_image'] = File::exists($pictureStatus.'seal.jpg')
                    ? url($pictureStatus.'seal.png')
                    : (File::exists($pictureStatus.'seal.png')
                        ? url($pictureStatus.'seal.png')
                        : null);
            }

            // Pallets picture
            if (str_contains($picture, 'pallets')) {
                $finalPreview[$serial]['pallets_image'] = File::exists($pictureStatus.'pallets.jpg')
                    ? url($pictureStatus.'pallets.jpg')
                    : (File::exists($pictureStatus.'pallets.png')
                        ? url($pictureStatus.'pallets.png')
                        : null);

            }
        }

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
Route::post('/shipping-checklist/queue/photo',[DataManipulationController::class,'uploadPhoto']);
