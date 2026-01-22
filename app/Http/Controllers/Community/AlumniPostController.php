<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use App\Models\AlumniPost;
use Inertia\Inertia;
use Inertia\Response;

class AlumniPostController extends Controller
{
    /**
     * Display a listing of published alumni posts (PUBLIC)
     */
    public function index(): Response
    {
        $category = request('category');
        $search = request('search');

        $posts = AlumniPost::with('user:id,name')
            ->published()
            ->when($category, fn($q) => $q->category($category))
            ->when($search, function($q) use ($search) {
                $q->where(function($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                          ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->paginate(12);

        return Inertia::render('Community/AlumniPost/Index', [
            'posts' => $posts,
            'categories' => AlumniPost::categories(),
            'filters' => [
                'category' => $category,
                'search' => $search,
            ],
        ]);
    }

    /**
     * Display a single published alumni post (PUBLIC)
     */
    public function show(AlumniPost $post): Response
    {
        // Hanya tampilkan jika published
        abort_if($post->status !== 'published', 404);

        $post->load('user:id,name,s1_prodi,s1_tahun_tamat');

        // Get related posts (same category)
        $relatedPosts = AlumniPost::with('user:id,name')
            ->published()
            ->where('category', $post->category)
            ->where('id', '!=', $post->id)
            ->limit(3)
            ->get();

        return Inertia::render('Community/AlumniPost/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}