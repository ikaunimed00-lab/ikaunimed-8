<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_vacancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // Creator
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('company');
            $table->string('logo')->nullable(); // Path to logo
            $table->string('location'); // City, Country or Remote
            $table->string('type'); // Full-time, Part-time, Contract, Internship, Remote
            $table->text('description');
            $table->string('salary_range')->nullable();
            $table->string('apply_link')->nullable(); // External URL or email
            $table->date('closing_date')->nullable();
            $table->enum('status', ['active', 'closed', 'pending'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_vacancies');
    }
};
