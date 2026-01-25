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
        Schema::table('users', function (Blueprint $table) {
            $table->string('gender')->nullable()->after('name'); // Jenis Kelamin
            $table->string('domicile')->nullable()->after('alamat_lengkap'); // Domisili
            $table->string('occupation')->nullable()->after('domicile'); // Pekerjaan
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['gender', 'domicile', 'occupation']);
        });
    }
};
