<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan perintah untuk menambah kolom.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('wa')->nullable();
            $table->string('nik')->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->text('alamat_lengkap')->nullable();
            // S1
            $table->string('s1_fakultas')->nullable();
            $table->string('s1_prodi')->nullable();
            $table->year('s1_tahun_masuk')->nullable();
            $table->year('s1_tahun_tamat')->nullable();
            // S2
            $table->string('s2_prodi')->nullable();
            $table->year('s2_tahun_masuk')->nullable();
            $table->year('s2_tahun_tamat')->nullable();
            // S3
            $table->string('s3_prodi')->nullable();
            $table->year('s3_tahun_masuk')->nullable();
            $table->year('s3_tahun_tamat')->nullable();
        });
    }

    /**
     * Batalkan perintah (untuk rollback).
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'wa', 'nik', 'tempat_lahir', 'tanggal_lahir', 'alamat_lengkap',
                's1_fakultas', 's1_prodi', 's1_tahun_masuk', 's1_tahun_tamat',
                's2_prodi', 's2_tahun_masuk', 's2_tahun_tamat',
                's3_prodi', 's3_tahun_masuk', 's3_tahun_tamat'
            ]);
        });
    }
};
