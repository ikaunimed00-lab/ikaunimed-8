<?php

namespace App\Policies;

use App\Models\AlumniPost;
use App\Models\User;

class AlumniPostPolicy
{
    /**
     * Subscriber bisa membuat post
     */
    public function create(User $user): bool
    {
        return true; // Semua authenticated user bisa submit
    }

    /**
     * User bisa view post miliknya
     */
    public function view(User $user, AlumniPost $post): bool
    {
        // Admin & Editor bisa lihat semua
        if ($user->isAdmin() || $user->isEditor()) {
            return true;
        }

        // User bisa lihat miliknya sendiri
        return $user->id === $post->user_id;
    }

    /**
     * User bisa update post miliknya (hanya yang pending)
     */
    public function update(User $user, AlumniPost $post): bool
    {
        // Admin bisa edit semua
        if ($user->isAdmin()) {
            return true;
        }

        // User hanya bisa edit miliknya sendiri yang masih pending
        return $user->id === $post->user_id && $post->status === 'pending';
    }

    /**
     * User bisa delete post miliknya (hanya yang pending)
     */
    public function delete(User $user, AlumniPost $post): bool
    {
        // Admin bisa hapus semua
        if ($user->isAdmin()) {
            return true;
        }

        // User hanya bisa hapus miliknya sendiri yang masih pending
        return $user->id === $post->user_id && $post->status === 'pending';
    }

    /**
     * Editor & Admin bisa moderasi
     */
    public function moderate(User $user): bool
    {
        return $user->isEditor() || $user->isAdmin();
    }

    /**
     * Hanya Admin yang bisa force delete
     */
    public function forceDelete(User $user, AlumniPost $post): bool
    {
        return $user->isAdmin();
    }
}