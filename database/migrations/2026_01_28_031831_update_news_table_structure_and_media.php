<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Add video_urls if not exists
            if (!Schema::hasColumn('news', 'video_urls')) {
                $table->json('video_urls')->nullable()->after('image');
            }
            
            // Add scope_level if not exists
            if (!Schema::hasColumn('news', 'scope_level')) {
                $table->enum('scope_level', ['pp', 'dpw', 'dpc'])->nullable()->after('organization_id');
            }
        });

        // Handle type column
        if (Schema::hasColumn('news', 'scope_type')) {
            Schema::table('news', function (Blueprint $table) {
                 $table->renameColumn('scope_type', 'type');
            });
            
            // Update data: internal -> organization
            DB::table('news')->where('type', 'internal')->update(['type' => 'organization']);
        } elseif (!Schema::hasColumn('news', 'type')) {
             Schema::table('news', function (Blueprint $table) {
                $table->enum('type', ['public', 'organization'])->default('public')->after('status');
             });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            if (Schema::hasColumn('news', 'video_urls')) {
                $table->dropColumn('video_urls');
            }
            if (Schema::hasColumn('news', 'scope_level')) {
                $table->dropColumn('scope_level');
            }
            
            // Revert type to scope_type
            if (Schema::hasColumn('news', 'type')) {
                $table->renameColumn('type', 'scope_type');
            }
        });
        
        // Revert data
        if (Schema::hasColumn('news', 'scope_type')) {
             DB::table('news')->where('scope_type', 'organization')->update(['scope_type' => 'internal']);
        }
    }
};
