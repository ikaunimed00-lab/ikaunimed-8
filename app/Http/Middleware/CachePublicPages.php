<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CachePublicPages
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Hanya halaman publik
        if (
            $request->is('/') ||
            $request->is('news') ||
            $request->is('news/*')
        ) {
            $response->headers->set('Cache-Control', 'public, max-age=600');
        }

        return $response;
    }
}
