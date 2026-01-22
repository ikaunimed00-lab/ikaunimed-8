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
        // Add notification preferences to users
        if (!Schema::hasColumn('users', 'last_dashboard_visit')) {
            Schema::table('users', function (Blueprint $table) {
                $table->timestamp('last_dashboard_visit')->nullable();
                $table->boolean('email_notifications')->default(true);
                $table->string('notification_preference')->default('all'); // all, important, none
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['last_dashboard_visit', 'email_notifications', 'notification_preference']);
        });
    }
};
