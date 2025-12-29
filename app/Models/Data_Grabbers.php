<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Data_Grabbers extends Model
{
    protected $fillable = [
        'Shipment_Serial',
        'Forwarder',
        'Source',
        'Uploaded_by',
        'Status',
    ];
}
