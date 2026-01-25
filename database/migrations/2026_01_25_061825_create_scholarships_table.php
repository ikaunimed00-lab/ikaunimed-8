<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scholarships', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('provider'); // Pemberi Beasiswa
            $table->string('degree'); // S1, S2, S3, Non-Degree, Research
            $table->text('description');
            $table->string('coverage_type'); // Full Funded, Partial
            $table->date('deadline')->nullable();
            $table->string('link')->nullable(); // Link pendaftaran
            $table->string('image')->nullable();
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scholarships');
    }
};
