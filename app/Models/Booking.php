<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable =
        [
            'No',
            'Model',
            'Invoice_No',
            'Destination',
            'Type',
            'Pickup_Date',
            'Pickup_time',
            'QuantityePerCarton',
            'Carton_Number',
            'Pallet_Width',
            'Pallet_Number',
            'Total_Pallet',
            'Plant',
            'Checked_by',
            'Counted_By',
            'File_Name',
            'Hash_File',
            'File_Size',
            'Status',
            'Picture',
        ];
}
