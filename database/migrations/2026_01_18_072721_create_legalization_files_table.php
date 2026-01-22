<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('legalization_files', function (Blueprint $table) {
            $table->id();

            $table->foreignId('legalization_id')
                ->constrained('legalizations')
                ->cascadeOnDelete();

            $table->string('type');
            $table->string('filename');
            $table->string('original_name');
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('size');

            $table->timestamps();

            $table->index('legalization_id');
            $table->index('type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('legalization_files');
    }
};
