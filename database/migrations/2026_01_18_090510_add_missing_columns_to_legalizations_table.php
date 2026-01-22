<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('legalizations', function (Blueprint $table) {

            if (!Schema::hasColumn('legalizations', 'jenjang')) {
                $table->string('jenjang', 10)->after('user_id');
            }

            if (!Schema::hasColumn('legalizations', 'tahun_lulus')) {
                $table->year('tahun_lulus')->after('jenjang');
            }

            if (!Schema::hasColumn('legalizations', 'jumlah_lembar')) {
                $table->unsignedInteger('jumlah_lembar')->after('tahun_lulus');
            }

            if (!Schema::hasColumn('legalizations', 'tujuan')) {
                $table->text('tujuan')->nullable()->after('jumlah_lembar');
            }

            if (!Schema::hasColumn('legalizations', 'admin_note')) {
                $table->text('admin_note')->nullable()->after('status');
            }
        });
    }

    public function down(): void
    {
        Schema::table('legalizations', function (Blueprint $table) {
            $table->dropColumn([
                'jenjang',
                'tahun_lulus',
                'jumlah_lembar',
                'tujuan',
                'admin_note',
            ]);
        });
    }
};
