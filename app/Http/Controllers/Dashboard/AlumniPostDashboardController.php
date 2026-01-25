<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AlumniPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlumniPostDashboardController extends Controller
{
    /**
     * Display user's own alumni posts
     */
    public function index(): Response
    {
        $posts = AlumniPost::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $stats = [
            'total' => AlumniPost::where('user_id', auth()->id())->count(),
            'pending' => AlumniPost::where('user_id', auth()->id())->where('status', 'pending')->count(),
            'published' => AlumniPost::where('user_id', auth()->id())->where('status', 'published')->count(),
            'rejected' => AlumniPost::where('user_id', auth()->id())->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Dashboard/Subscriber/AlumniPost/Index', [
            'posts' => $posts,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new alumni post
     */
    public function create(): Response
    {
        $this->authorize('create', AlumniPost::class);

        return Inertia::render('Dashboard/Subscriber/AlumniPost/Create', [
            'categories' => AlumniPost::categories(),
        ]);
    }

    /**
     * Store a newly created alumni post
     */
    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', AlumniPost::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:50',
            'category' => 'required|in:' . implode(',', array_keys(AlumniPost::categories())),
            'image' => 'nullable|image|max:2048',
            'map_location' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('alumni-posts', 'public');
        }

        $post = AlumniPost::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category' => $validated['category'],
            'image' => $validated['image'] ?? null,
            'map_location' => $validated['map_location'] ?? null,
            'status' => 'pending', // Always pending, butuh moderasi
        ]);

        return redirect()->route('dashboard.subscriber.alumni-posts.index')
            ->with('success', 'Kabar Alumni berhasil disubmit dan menunggu moderasi.');
    }

    /**
     * Show the form for editing the specified alumni post
     */
    public function edit(AlumniPost $alumniPost): Response
    {
        $this->authorize('update', $alumniPost);

        return Inertia::render('Dashboard/Subscriber/AlumniPost/Edit', [
            'post' => $alumniPost,
            'categories' => AlumniPost::categories(),
        ]);
    }

    /**
     * Update the specified alumni post
     */
    public function update(Request $request, AlumniPost $alumniPost): RedirectResponse
    {
        $this->authorize('update', $alumniPost);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:50',
            'category' => 'required|in:' . implode(',', array_keys(AlumniPost::categories())),
            'image' => 'nullable|image|max:2048',
            'map_location' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($alumniPost->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($alumniPost->image);
            }
            $validated['image'] = $request->file('image')->store('alumni-posts', 'public');
        }

        $alumniPost->update($validated);

        return redirect()->route('dashboard.subscriber.alumni-posts.index')
            ->with('success', 'Kabar Alumni berhasil diperbarui.');
    }

    /**
     * Remove the specified alumni post (soft delete concept)
     */
    public function destroy(AlumniPost $alumniPost): RedirectResponse
    {
        $this->authorize('delete', $alumniPost);

        $alumniPost->delete();

        return redirect()->route('dashboard.subscriber.alumni-posts.index')
            ->with('success', 'Kabar Alumni berhasil dihapus.');
    }
}