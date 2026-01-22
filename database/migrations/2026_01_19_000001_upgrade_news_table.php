<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Tambah kolom untuk published_at (scheduled publishing)
            $table->timestamp('published_at')->nullable()->after('status');
            
            // Tambah kolom untuk view count (tracking trending)
            $table->unsignedBigInteger('view_count')->default(0)->after('published_at');
            
            // Tambah soft delete untuk audit trail
            $table->softDeletes()->after('view_count');
            
            // Tambah index untuk query optimization
            $table->index('published_at');
            $table->index('view_count');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropIndex(['published_at']);
            $table->dropIndex(['view_count']);
            $table->dropIndex(['status']);
            $table->dropSoftDeletes();
            $table->dropColumn(['published_at', 'view_count']);
        });
    }
};
