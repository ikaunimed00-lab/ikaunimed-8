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
        Schema::table('partnerships', function (Blueprint $table) {
            // Drop is_active if it exists
            if (Schema::hasColumn('partnerships', 'is_active')) {
                $table->dropColumn('is_active');
            }
            
            // Add status enum if it doesn't exist
            if (!Schema::hasColumn('partnerships', 'status')) {
                $table->enum('status', ['active', 'pending', 'rejected', 'closed'])->default('pending')->after('category');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partnerships', function (Blueprint $table) {
            $table->boolean('is_active')->default(true);
            $table->dropColumn('status');
        });
    }
};
