<?php

namespace App\Http\Controllers;
use App\Models\Data_Grabbers;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Activity_Logs extends Controller
{
    //
    public static function logs($data, $user,$ip,$page,$method)
    {

        $jsonString = json_encode($data);

        DB::table('activity_logs')->insert([
            'Data' => $jsonString,
            'Ip_Address' => $ip,
            'User' => $user,
            'Page' =>$page,
            'Method' => $method,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public static function grab($Shipment_Serial , $Forwarder , $Source , $Uploaded_by , $Status ){

        try{

            $isExist = DB::table('data_grabbers')->where('Shipment_Serial ','=',$Shipment_Serial )->first();

            if($isExist)  return Inertia::render('Main', [
                    'appName' => config('app.name'),
                    'errorMessage' => 'Grab Details Not Found!',
                    'type' => 'logs',
                    'client_ip' => $check->ip_address ?? null,
                    'client_details' => $check ?? null,
                ]);;

            DB::table('data_grabbers')->insert([
                'Shipment_Serial' => $Shipment_Serial,
                'Forwarder' => $Forwarder,
                'Source' => $Source,
                'Uploaded_by' => $Uploaded_by,
                'Status' => $Status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

        }catch(Exception $e){
            if(str_contains($e->getMessage(),'1054')){
                DB::table('data_grabbers')->insert([
                    'Shipment_Serial' => $Shipment_Serial,
                    'Forwarder' => $Forwarder,
                    'Source' => $Source,
                    'Uploaded_by' => $Uploaded_by,
                    'Status' => $Status,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
            return Inertia::render('Main', [
                    'appName' => config('app.name'),
                    'errorMessage' => 'Grab Details Not Found!',
                    'type' => 'logs',
                    'client_ip' => $check->ip_address ?? null,
                    'client_details' => $check ?? null,
                ]);

        }


    }
}
