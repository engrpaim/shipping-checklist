<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Admin;
use Inertia\Inertia;
use Exception;

class DataManipulationController extends Controller
{

    public function save(Request $request){
        // validate all data
        $isDataSafe = $request->validate([
            'data' => 'required|array',
            'forwarder' => 'required|string',
            'destination' => 'required|string',
            'date' => ['required', 'date_format:d/m/Y'],
            'size' => 'required|string',
            'hash' => 'required|string',
            'source' => 'required|string',
        ]);
          if (!$isDataSafe['data']) {
        return back()->with('error', 'No data to save');
    }
        $data = $request->input('data');
        $forwarder = $request->input('forwarder');
        $destination = $request->input('destination');
        $date = $request->input('date');
        $hash = $request->input('hash');
        $size = $request->input('size');
        $source = $request->input('source');

        $ip = $request->ip();
        $check = Admin::where('ip_address','=',$ip)->first();

        return Inertia::render('Main', [
            'appName' => config('app.name'),
            'type' => 'Booking',
            'client_ip' => $check->ip_address ?? null,
            'client_details' => $check ?? null,
        ]);
    }
}
