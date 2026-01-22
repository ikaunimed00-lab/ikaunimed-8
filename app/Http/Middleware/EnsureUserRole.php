<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // If user is not authenticated, redirect to login
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // Check if user's role is in allowed roles
        if (!in_array($request->user()->role, $roles)) {
            abort(403, 'Unauthorized action. Your role does not have permission to access this resource.');
        }

        return $next($request);
    }
}
