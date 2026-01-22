<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AlumniPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlumniPostModerationController extends Controller
{
    /**
     * Display all posts for moderation
     */
    public function index(): Response
    {
        $this->authorize('moderate', AlumniPost::class);

        $status = request('status', 'pending');
        $category = request('category');
        $search = request('search');

        $posts = AlumniPost::with('user:id,name,email')
            ->when($status !== 'all', fn($q) => $q->where('status', $status))
            ->when($category, fn($q) => $q->category($category))
            ->when($search, function($q) use ($search) {
                $q->where(function($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                          ->orWhereHas('user', function($q) use ($search) {
                              $q->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                          });
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        $stats = [
            'total' => AlumniPost::count(),
            'pending' => AlumniPost::where('status', 'pending')->count(),
            'published' => AlumniPost::where('status', 'published')->count(),
            'rejected' => AlumniPost::where('status', 'rejected')->count(),
        ];

        return Inertia::render('Dashboard/Editor/AlumniPost/Moderation', [
            'posts' => $posts,
            'stats' => $stats,
            'categories' => AlumniPost::categories(),
            'filters' => [
                'status' => $status,
                'category' => $category,
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show single post for moderation
     */
    public function show(AlumniPost $alumniPost): Response
    {
        $this->authorize('moderate', AlumniPost::class);

        $alumniPost->load('user', 'moderator');

        return Inertia::render('Dashboard/Editor/AlumniPost/ModerationDetail', [
            'post' => $alumniPost,
        ]);
    }

    /**
     * Approve post
     */
    public function approve(AlumniPost $alumniPost): RedirectResponse
    {
        $this->authorize('moderate', AlumniPost::class);

        $alumniPost->update([
            'status' => 'published',
            'published_at' => now(),
            'moderated_by' => auth()->id(),
            'rejection_note' => null,
        ]);

        return back()->with('success', 'Kabar Alumni berhasil dipublish.');
    }

    /**
     * Reject post
     */
    public function reject(Request $request, AlumniPost $alumniPost): RedirectResponse
    {
        $this->authorize('moderate', AlumniPost::class);

        $validated = $request->validate([
            'rejection_note' => 'required|string|min:10',
        ]);

        $alumniPost->update([
            'status' => 'rejected',
            'rejection_note' => $validated['rejection_note'],
            'moderated_by' => auth()->id(),
        ]);

        return back()->with('success', 'Kabar Alumni ditolak dengan catatan.');
    }

    /**
     * Force delete (Admin only)
     */
    public function destroy(AlumniPost $alumniPost): RedirectResponse
    {
        $this->authorize('forceDelete', $alumniPost);

        $alumniPost->delete();

        return redirect()->route('dashboard.editor.alumni-posts.moderation')
            ->with('success', 'Kabar Alumni berhasil dihapus permanen.');
    }
}