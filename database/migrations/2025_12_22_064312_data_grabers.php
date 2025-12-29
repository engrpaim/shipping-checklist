<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Symfony\Component\Clock\now;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('data_grabbers', function (Blueprint $table) {
            $table->integer('No')->autoIncrement();
            $table->string('Shipment_Serial')->unique('Shipment_Serial')->require();
            $table->string('Forwarder')->nullable();
            $table->string('Source')->nullable();
            $table->string('Uploaded_by')->nullable();
            $table->enum('Status',['BOOKED','LOADING','SHIPPED','CANCELLED'])->default('BOOKED');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_grabbers');
    }
};
