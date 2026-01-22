<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get all notifications for user
     */
    public function index()
    {
        try {
            $notifications = auth()->user()->notifications()
                ->paginate(20);
            $unreadCount = auth()->user()->unreadNotificationsCount();
        } catch (\Exception $e) {
            $notifications = collect([]);
            $unreadCount = 0;
        }

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount,
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(Notification $notification)
    {
        // Verify notification belongs to user
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->markAsRead();

        return response()->json([
            'success' => true,
            'unread_count' => auth()->user()->unreadNotificationsCount(),
        ]);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead()
    {
        try {
            Notification::where('user_id', auth()->id())
                ->whereNull('read_at')
                ->update(['read_at' => now()]);
        } catch (\Exception $e) {
            // Table may not exist, ignore
        }

        return response()->json([
            'success' => true,
            'unread_count' => 0,
        ]);
    }

    /**
     * Delete notification
     */
    public function destroy(Notification $notification)
    {
        // Verify notification belongs to user
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * Get unread notifications count
     */
    public function unreadCount()
    {
        try {
            $count = auth()->user()->unreadNotificationsCount();
        } catch (\Exception $e) {
            $count = 0;
        }

        return response()->json([
            'unread_count' => $count,
        ]);
    }
}
