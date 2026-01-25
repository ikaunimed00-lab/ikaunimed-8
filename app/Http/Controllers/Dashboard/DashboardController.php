<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Legalization;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Show subscriber dashboard
     */
    public function subscriberDashboard(Request $request)
    {
        $user = auth()->user();

        // Get legalization submissions with search
        $legalizations = $user->legalizations()
            ->with('files')
            ->when($request->search, function($query, $search) {
                $query->where('jenjang', 'like', "%{$search}%")
                      ->orWhere('tujuan', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get unread notifications (safely handle table existence)
        try {
            $notifications = Notification::unreadForUser($user->id);
        } catch (\Exception $e) {
            $notifications = [];
        }

        // Get statistics
        $stats = [
            'total' => $user->legalizations()->count(),
            'pending' => $user->legalizations()->where('status', 'pending')->count(),
            'approved' => $user->legalizations()->where('status', 'approved')->count(),
            'rejected' => $user->legalizations()->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Dashboard/Subscriber/Index', [
            'user' => $user,
            'legalizations' => $legalizations,
            'notifications' => $notifications,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show admin dashboard
     */
    public function adminDashboard(Request $request)
    {
        $user = auth()->user();

        // Get all legalization submissions with pagination and search
        $legalizations = Legalization::with('user', 'files')
            ->when($request->search, function($query, $search) {
                $query->whereHas('user', function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                })->orWhere('jenjang', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        // Get statistics
        $stats = [
            'total_submissions' => Legalization::count(),
            'pending' => Legalization::where('status', 'pending')->count(),
            'approved' => Legalization::where('status', 'approved')->count(),
            'rejected' => Legalization::where('status', 'rejected')->count(),
            'total_users' => User::count(),
            'total_writers' => User::where('role', 'writer')->count(),
            'total_editors' => User::where('role', 'editor')->count(),
        ];

        // Get unread notifications (safely handle table existence)
        try {
            $notifications = Notification::unreadForUser($user->id);
        } catch (\Exception $e) {
            $notifications = [];
        }

        // Get recent activities
        $recentActivities = Legalization::with('user')
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard/Admin/Index', [
            'user' => $user,
            'legalizations' => $legalizations,
            'notifications' => $notifications,
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show editor dashboard
     */
    public function editorDashboard(Request $request)
    {
        $user = auth()->user();

        // Get news/articles for editor (all articles) with author relationship
        $news = \App\Models\News::with(['categories', 'tags', 'author'])
            ->when($request->search, function($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%")
                      ->orWhereHas('author', function($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get statistics
        $stats = [
            'total_articles' => \App\Models\News::count(),
            'draft' => \App\Models\News::where('status', 'draft')->count(),
            'pending' => \App\Models\News::where('status', 'pending')->count(),
            'published' => \App\Models\News::where('status', 'published')->count(),
        ];

        // Get unread notifications (safely handle table existence)
        try {
            $notifications = Notification::unreadForUser($user->id);
        } catch (\Exception $e) {
            $notifications = [];
        }

        return Inertia::render('Dashboard/Editor/Index', [
            'user' => $user,
            'news' => $news,
            'notifications' => $notifications,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show writer dashboard
     */
    public function writerDashboard(Request $request)
    {
        $user = auth()->user();

        // Get articles written by this user ONLY
        $articles = $user->news()
            ->with(['categories', 'tags'])
            ->when($request->search, function($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get statistics for THIS WRITER ONLY
        $stats = [
            'total_articles' => $user->news()->count(),
            'draft' => $user->news()->where('status', 'draft')->count(),
            'pending' => $user->news()->where('status', 'pending')->count(),
            'published' => $user->news()->where('status', 'published')->count(),
        ];

        // Get unread notifications (safely handle table existence)
        try {
            $notifications = Notification::unreadForUser($user->id);
        } catch (\Exception $e) {
            $notifications = [];
        }

        return Inertia::render('Dashboard/Writer/Index', [
            'user' => $user,
            'articles' => $articles,
            'notifications' => $notifications,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Determine user's dashboard redirect
     */
    public static function getDashboardRoute(User $user): string
    {
        return match ($user->role) {
            'admin' => route('dashboard.admin'),
            'editor' => route('dashboard.editor'),
            'writer' => route('dashboard.writer'),
            'subscriber' => route('dashboard.subscriber'),
            default => route('home'),
        };
    }
}