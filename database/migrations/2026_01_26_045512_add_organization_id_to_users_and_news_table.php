<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('organization_id')->nullable()->after('role')->constrained('organizations')->nullOnDelete();
            // We don't strictly need scope_level here if organization_id points to an organization that has a 'type'
            // But for quick access/caching, we can add it, or rely on the relationship.
            // Let's rely on the relationship to avoid data inconsistency (normalization).
        });

        Schema::table('news', function (Blueprint $table) {
            $table->foreignId('organization_id')->nullable()->after('content')->constrained('organizations')->nullOnDelete();
            // If organization_id is null, it's considered "General/Public" news or determined by category.
            // Or we can add a specific 'type' column as requested.
            $table->enum('scope_type', ['public', 'internal'])->default('public')->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->dropColumn('organization_id');
        });

        Schema::table('news', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->dropColumn('organization_id');
            $table->dropColumn('scope_type');
        });
    }
};
