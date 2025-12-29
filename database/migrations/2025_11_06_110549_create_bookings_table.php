<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->integer('No')->autoIncrement();
            $table->string('Shipment_Serial')->require();
            $table->string('Model')->nullable();
            $table->integer('Quantity')->nullable();
            $table->string('Invoice_No')->nullable();
            $table->string('Destination')->nullable();
            $table->string('Type')->nullable();
            $table->date('Pickup_Date')->nullable();
            $table->time('Pickup_time')->nullable();
            $table->integer('QuantityePerCarton')->nullable();
            $table->integer('Carton_Number')->nullable();
            $table->string('Pallet_Width')->nullable();
            $table->integer('Pallet_Number')->nullable();
            $table->string('Total_Pallet')->nullable();
            $table->string('Plant')->nullable();
            $table->string('Checked_by')->nullable();
            $table->string('Counted_By')->nullable();
            $table->string('File_Name')->nullable();
            $table->string('Hash_File')->nullable();
            $table->string('File_Size')->nullable();
            $table->enum('Status',['BOOKED','LOADING','SHIPPED','CANCELLED'])->default('BOOKED');
            $table->enum('Picture',['YES','NO'])->default('NO');
            $table->dateTime('pictureTimeStamp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
