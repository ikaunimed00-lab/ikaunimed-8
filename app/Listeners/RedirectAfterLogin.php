<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Redirect;

class RedirectAfterLogin
{
    public function handle(Login $event): void
    {
        $user = $event->user;

        // Route berdasarkan role
        $roleRoutes = [
            'admin' => 'dashboard.admin',
            'editor' => 'dashboard.editor',
            'writer' => 'dashboard.writer',
            'subscriber' => 'dashboard.subscriber',
        ];

        $route = $roleRoutes[$user->role] ?? 'home';
        Redirect::setIntendedUrl(route($route));
    }
}
