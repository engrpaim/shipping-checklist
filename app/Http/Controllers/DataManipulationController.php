<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Admin;
use Inertia\Inertia;
use Exception;

class DataManipulationController extends Controller
{
    public function saveData(Request $request){
        $start = $request->input('start');
        dd($request->all());
        $end = $request->input('end');
        $excel = $request->input('excel');
        $File_Name = $request->input("fileName");
        $File_Size = $request->input("fileSize");
        $getDestination = $request->input("dataset");
        $Destination = $getDestination[$start]["DESTINATION"]?  $getDestination[$start]["DESTINATION"]:'NOT FOUND';
        $Hash = $request->input("hash");
        for($i =  $start ; $i <= $end;  $i++){
            $model = htmlspecialchars($excel[$i]["AAMODEL"]);
            $invoice = htmlspecialchars($excel[$i]["BINVOICE_NO"]);
            $type = $getDestination[$start]["CONTAINER"] ? $getDestination[$start]["CONTAINER"]:'NOT FOUND';
            $pick_date = htmlspecialchars($excel[$start]["PICK_UP_DATE"]);
            if( $pick_date ){
                $excelDate = 45888;
                $unixDate = ($excelDate - 25569) * 86400;
                $ConvertedDate = gmdate("Y-m-d", $unixDate);
            }
            $pick_time = $excel[$start]["PICK_UP_TIME"] !== '-'  && $excel[$start]["PICK_UP_TIME"] !== '?'? $excel[$start]["PICK_UP_TIME"] :0;
            $hours = $pick_time ? $pick_time * 24 * 3600:null;
            $NewHours = gmdate('H:i:s', $hours);
            $quantity_carton = $excel[$i]["QUANTITY_PER_CARTON"] === '-' || $excel[$i]["QUANTITY_PER_CARTON"] === '?' ? 0 : $excel[$i]["QUANTITY_PER_CARTON"]  ;
            $carton_number =$excel[$i]["NO_OF_CARTON"]  === '-' || $excel[$i]["NO_OF_CARTON"] === '?' ? 0 : $excel[$i]["NO_OF_CARTON"];
            $pallet_width = htmlspecialchars($excel[$i]["PALLET_WIDTH"]);
            $no_pallets =$excel[$i]["ANO_PALLETS"] === '-' || $excel[$i]["ANO_PALLETS"] === '?' ? 0 : $excel[$i]["ANO_PALLETS"];
            $total_pallet = htmlspecialchars($excel[$i]["TOTAL_PALLET"]);
            $area = htmlspecialchars($excel[$i]["PLANT_AREA"]);

            $ip = $request->ip();
            $check = Admin::where('ip_address','=',$ip)->first();

            if(!str_contains($model,'Prepared')){
                try{

                    $checkIfexist = Booking::where('Invoice_No', $invoice)->exists();
                    if(!$checkIfexist){
                        $result = Booking::create([
                            'Model' =>  $model,
                            'Invoice_No' => $invoice,
                            'Destination' =>    $Destination,
                            'Type' => $type,
                            'Pickup_Date' => $ConvertedDate,
                            'Pickup_time'=> $NewHours,
                            'QuantityePerCarton' =>  $quantity_carton,
                            'Carton_Number' =>  $carton_number,
                            'Pallet_Width' => $pallet_width,
                            'Pallet_Number'=> $no_pallets,
                            'Plant' => $area,
                            'File_Name' => $File_Name,
                            'Hash_File' => $Hash,
                            'File_Size' => $File_Size,
                            'Total_Pallet' =>  $total_pallet
                        ]);


                        return Inertia::render('Home', [
                            'appName' => config('app.name'),
                            'type' => 'Booking',
                            'Message' => 'Booked successfully',
                            'client_ip' => $check->ip_address?? null,
                            'client_details' => $check ?? null
                        ]);
                    }else{
                             return Inertia::render('Home', [
                                'appName' => config('app.name'),
                                'type' => 'Booking',
                                'error' => 'Duplicate Entry!',
                                'Message' => 'Invoice already exists!',
                                'client_ip' => $check->ip_address ?? null,
                                'client_details' => $check ? $check->toArray() : null,
                            ]);

                    }

                }catch(Exception $e){

                     return Inertia::render('Home', [
                            'appName' => config('app.name'),
                            'type' => 'Booking',
                            'Message' => 'Invoice Number already booked!',
                            'client_ip' => $check->ip_address?? null,
                            'client_details' => $check ?? null
                        ]);
                }

            }

        }
    }
}
