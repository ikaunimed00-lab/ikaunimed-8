<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('instructor_name')->nullable();
            $table->string('level')->default('Beginner'); // Beginner, Intermediate, Advanced
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->integer('duration_minutes')->default(0); // Total duration estimate
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
