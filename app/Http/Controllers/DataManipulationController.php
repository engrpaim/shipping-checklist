<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Activity_Logs;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Admin;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Data_Grabbers;
class DataManipulationController extends Controller
{

    public function save(Request $request){

        $ip = $request->ip();
        $check = Admin::where('ip_address','=',$ip)->first();

        // validate all data
        $isDataSafe = $request->validate([
            'data' => 'required|array',
            'forwarder' => 'required|string',
            'destination' => 'required|string',
            'date' => ['required', 'date_format:d/m/Y'],
            'size' => 'required|string',
            'source' => 'required|string',
        ]);

        if (!$isDataSafe['data']) {
            return Inertia::render('Main', [
                'appName' => config('app.name'),
                'errorMessage' => 'Invalid data',
                'type' => 'Booking',
                'client_ip' => $check->ip_address ?? null,
                'client_details' => $check ?? null,
            ]);
        }



        if(!$request->input('data')) return;
        $data = $request->input('data');
        $destination = $request->input('destination');
        $type =$request->input('type');
        $date =  Carbon::createFromFormat('m/d/Y', $request->input('date'))->format('Y-m-d');
        $dateSerial =  Carbon::createFromFormat('m/d/Y', $request->input('date'))->format('Ymd');
        $forwarder = $request->input('forwarder');
        $hash = $request->input('hash') ?? '-';
        $size = $request->input('size');
        $source = $request->input('source');
        $shipment_serial = $forwarder . str_replace(":","",$dateSerial .$data["TIME"]) . str_replace(" ", "",$destination);

        try{
            foreach( $data  as $key => $value){
                if($key !== 'TIME'){
                    $isExist  = Booking::where('Invoice_No','=',$value['INVOICE NO.'])->first();
                    $errMess = '';
                    $errMess = $value['INVOICE NO.'] !== '-' ?  'Invoice Number '. $value['INVOICE NO.'].' Already Exist!' : 'Invalid Invoice Number!';

                    if($isExist){
                        return Inertia::render('Main', [
                            'appName' => config('app.name'),
                            'errorMessage' => $errMess,
                            'type' => 'Booking',
                            'client_ip' => $check->ip_address ?? null,
                            'client_details' => $check ?? null,
                        ]);
                    };

                    $rowDataInsert = DB::table('bookings')->insert([
                        'Model' =>  $value['MODEL'],
                        'Shipment_Serial' => $shipment_serial ,
                        'Quantity' =>  $value['QUANTITY'] &&  is_numeric($value['QUANTITY']) ? $value['QUANTITY'] : 0,
                        'Invoice_No' =>  $value['INVOICE NO.'],
                        'Destination' =>  $destination,
                        'Type' =>     $type ?? '-',
                        'Pickup_Date' => $date,
                        'Pickup_time' =>  $data['TIME'],
                        'QuantityePerCarton' =>  $value['QUANTITY PER CARTON']&&  is_numeric($value['QUANTITY PER CARTON']) ? $value['QUANTITY PER CARTON'] : 0,
                        'Carton_Number' =>  $value['NO. OF CARTON'] && is_numeric($value['NO. OF CARTON'])? $value['NO. OF CARTON'] : 0,
                        'Pallet_Width' =>  $value['PALLET WIDTH (MIDDLE)'] && is_numeric($value['PALLET WIDTH (MIDDLE)'])   ? $value['PALLET WIDTH (MIDDLE)'] : 0,
                        'Pallet_Number' =>  $value['NO. OF PALLETS'] && is_numeric($value['NO. OF PALLETS']) ? $value['NO. OF PALLETS']  : 0,
                        'Plant' =>  $value['PLANT AREA'],
                        'File_Name' =>  $source,
                        'Hash_File' =>  $hash,
                        'File_Size' =>  $size ."Kb",
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                };
            }
            if($rowDataInsert){
                Activity_Logs::logs($request->all(),$check->first,$check->ip_address,'Booking','insert');
                Activity_Logs::grab(  $shipment_serial,$forwarder,$source,$check->first,'BOOKED',$check->ip_address );
                return Inertia::render('Main', [
                    'appName' => config('app.name'),
                    'successMessage' => 'Ship by ' . $forwarder . ' at '. $data['TIME'].' to '.  $destination  ,
                    'type' => 'Booking',
                    'client_ip' => $check->ip_address ?? null,
                    'client_details' => $check ?? null,
                ]);
            }

        }catch(Exception $e){
            dd($e->getMessage());
        }





        // DEFAULT
        return Inertia::render('Main', [
            'appName' => config('app.name'),
            'type' => 'Booking',
            'client_ip' => $check->ip_address ?? null,
            'client_details' => $check ?? null,
        ]);
    }

    public static function pullDataBooking($data){

          if(!$data)return;

          $bookingDetails = [];

          $getPreview = DB::table('bookings')->where('Shipment_Serial','=',$data)->get();
          foreach($getPreview as  $booking){

            $bookingDetails[$data]['Serial'] = $booking->Shipment_Serial;
            $bookingDetails[$data]['Destination'] = $booking->Destination;
            $bookingDetails[$data]['Pickup_Date'] = $booking->Pickup_Date;
            $bookingDetails[$data]['Pickup_time'] = $booking->Pickup_time;
            $bookingDetails[$data]['Type'] = $booking->Type;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Model']= $booking->Model;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['QuantityePerCarton']= $booking->QuantityePerCarton;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Carton_Number']= $booking->Carton_Number;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Pallet_Width']= $booking->Pallet_Width;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Pallet_Number']= $booking->Pallet_Number;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Plant']= $booking->Plant;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Checked_by']= $booking->Checked_by;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Counted_By']= $booking->Counted_By;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Status']= $booking->Status;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Picture']= $booking->Picture;
            $bookingDetails[$data]['details'][$booking->Invoice_No]['Quantity']= $booking->Quantity;

          };

          return $bookingDetails;
    }

    public static function pullDataGrabbers($data){
        if(!$data) return;
        $checkData = DB::table('data_grabbers')->where('Shipment_Serial','=',$data)->first();
        return   $checkData->Status;
    }

    public function loadInvoice(Request $request){
        $ip = $request->ip();
        $check = Admin::where('ip_address','=',$ip)->first();

        $isChecked = $request->validate([
                'load' => 'array',
                'status' => 'string|nullable',
                'name' => 'string'
        ]);

        if( ! $isChecked ) {
            return Inertia::render('Main', [
                'appName' => config('app.name'),
                'type' => 'Queue',
                'client_ip' => $check->ip_address ?? null,
                'client_details' => $check ?? null,
            ]);
        };

        $data = $request->input('load');
        $status = !$request->input('status') ? 'BOOKED'  :$request->input('status') ;
        $name = $request->input('name');
        $column =  $status === 'LOADING' ? 'Counted_By' : 'Checked_by';

        $status  === 'BOOKED'  ?     $status = 'LOADING' :null;
        foreach( $data  as $items){
             try{

            $updateloaded =DB::table('bookings')
                                ->where('Invoice_No',$items)
                                ->update(['Status' =>  $status , $column   =>  $name ]);
            }catch(Exception $e){
                 dd($e->getMessage());
            }
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
        foreach($getAllBooked as $key => $value){
            if(!$value->Shipment_Serial && !$value->Forwarder) return;
            $serial = $value->Shipment_Serial;
            $displayPreview [$serial]['Forwarder']=$value->Forwarder;
            $queueDisplay = DataManipulationController::pullDataBooking($serial);
            $finalPreview [$serial]= array_merge($queueDisplay[$serial] ,  $displayPreview[$serial]);
            $getDGstatus = DataManipulationController::pullDataGrabbers($serial);
            $finalPreview [$serial]['Shipment_Status'] = $getDGstatus;
        }

        Activity_Logs::logs($data,$check->first,$check->ip_address,'Queue','loading');
        return Inertia::render('Main', [
            'appName' => config('app.name'),
            'page' => 'queue',
            'queue' =>  $finalPreview,
            'client_ip' => $check->ip_address?? null,
            'client_details' => $check ?? null
        ]);


    }


    public function unLoadInvoice(Request $request){
        $ip = $request->ip();
        $check = Admin::where('ip_address','=',$ip)->first();

        $isChecked = $request->validate([
                'invoice' => 'string',
                'column' => 'string'
        ]);

        if( ! $isChecked ) {
            return Inertia::render('Main', [
                'appName' => config('app.name'),
                'type' => 'Queue',
                'client_ip' => $check->ip_address ?? null,
                'client_details' => $check ?? null,
            ]);
        };
        $all = $request->all();
        $data = $request->input('invoice');
        $column = $request->input('column');
        $statusUnload = $column === 'Checked_by' ? 'BOOKED' : 'LOADING';
        try{
            $updateloaded =DB::table('bookings')
                                ->where('Invoice_No',$data)
                                ->update(['Status' =>$statusUnload, $column   => null]);
            Activity_Logs::logs($all,$check->first,$check->ip_address,'Queue','unload');

        }catch(Exception $e){
                dd($e->getMessage());
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
     }

    public function updateStatus(Request $request){
        $ip = $request->ip();
        $check = Admin::where('ip_address','=',$ip)->first();

        if(!$request->all()) return;

        $checkIfValid = $request->validate([
            'Status' => 'string',
            'ShipmentSerial' => 'string'

        ]);

        if(!$checkIfValid) return;

        $serial = $request->input('ShipmentSerial') ;
        $status = $request->input('Status');

        try{

            $updateStatus = DB::table('data_grabbers')->where('Shipment_Serial',$serial)->update([
                'Status' => $status
            ]);



        }catch(Exception $e){

            dd($e->getMessage());

        }

      ;
       if($status === 'SHIPPED'){
            $shippedUpdate  = DB::table('bookings')->where('Shipment_Serial','=',  $serial)->get();
            foreach( $shippedUpdate as $items){
                if($items->Status === 'LOADING'){
                    $shippedFinal  = DB::table('bookings')->where('Invoice_No','=',  $items->Invoice_No )->update([
                        'Status' => 'SHIPPED'
                    ]);
                }else{
                    $shippedFinal  = DB::table('bookings')->where('Invoice_No','=',  $items->Invoice_No )->update([
                        'Status' => 'CANCELLED'
                    ]);
                }
            }

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
    }

    public function uploadPhoto(Request $request)
    {
              $ip = $request->ip();
        $check = Admin::where('ip_address','=',$ip)->first();
        $request->validate([
            'photo' => 'required|string',      // base64 string
            'photo_name' => 'required|string',
            'captured_by' => 'required|string',
            'serial'=>'required|string'
        ]);
        $serial = $request->input('serial');
        $path = '/var/data/Shipping_Check_List';
        $year =  $path  ."/".  now()->year."/". $serial;
        // Ensure directory exists
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }

        if(!file_exists( $year )){
            mkdir($year, 0755, true);
        }

        $image = $request->photo;

        // Remove base64 header
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);
            $extension = strtolower($type[1]); // jpg, png
        } else {
            return response()->json(['error' => 'Invalid image format'], 422);
        }

        $image = str_replace(' ', '+', $image);
        $imageData = base64_decode($image);

        if ($imageData === false) {
            return response()->json(['error' => 'Base64 decode failed'], 422);
        }

        $fileName = $request->photo_name . '.' . $extension;
        $filePath = $year . '/' . $fileName;

        file_put_contents($filePath, $imageData);

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

        $checkingShipmentFolder = $year ."/". $value->Shipment_Serial;

        if(!file_exists($checkingShipmentFolder)){
          mkdir($checkingShipmentFolder,0775,true);
        }
        $pictureStatus =  $checkingShipmentFolder. "/"  ;
        foreach($files as $picture){
            str_contains($picture,'container') ? $finalPreview[$serial]['container_picture'] = (file_exists($pictureStatus.'container.jpg')||file_exists($pictureStatus.'container.png')):null;
            str_contains($picture,'slip') ? $finalPreview[$serial]['slip_picture'] = (file_exists($pictureStatus.'slip.jpg')||file_exists($pictureStatus.'slip.png')):null;
            str_contains($picture,'seal') ? $finalPreview[$serial]['seal_picture'] = (file_exists($pictureStatus.'seal.jpg')||file_exists($pictureStatus.'seal.png')):null;
            str_contains($picture,'pallets') ? $finalPreview[$serial]['pallets_picture'] = (file_exists($pictureStatus.'pallets.jpg')||file_exists($pictureStatus.'pallets.png')):null;
        }

    }

    return Inertia::render('Main', [
        'appName' => config('app.name'),
        'page' => 'queue',
        'queue' =>  $finalPreview,
        'client_ip' => $check->ip_address?? null,
        'client_details' => $check ?? null
    ]);
    }

}

