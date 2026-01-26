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
        Schema::table('scholarships', function (Blueprint $table) {
            if (!Schema::hasColumn('scholarships', 'user_id')) {
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade')->after('id');
            }
            
            if (Schema::hasColumn('scholarships', 'status')) {
                $table->dropColumn('status');
            }
        });

        Schema::table('scholarships', function (Blueprint $table) {
            $table->enum('status', ['active', 'pending', 'rejected', 'closed'])->default('pending')->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scholarships', function (Blueprint $table) {
            if (Schema::hasColumn('scholarships', 'user_id')) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            }
            if (Schema::hasColumn('scholarships', 'status')) {
                $table->dropColumn('status');
            }
        });

        Schema::table('scholarships', function (Blueprint $table) {
            $table->enum('status', ['open', 'closed'])->default('open');
        });
    }
};
