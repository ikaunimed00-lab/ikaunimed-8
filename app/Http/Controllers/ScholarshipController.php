<?php

namespace App\Http\Controllers;

use App\Models\Scholarship;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScholarshipController extends Controller
{
    public function index(Request $request)
    {
        $query = Scholarship::query()
            ->where('status', 'active')
            ->when($request->search, function ($q, $search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('provider', 'like', "%{$search}%");
            })
            ->when($request->degree, function ($q, $degree) {
                $q->where('degree', $degree);
            })
            ->latest();

        return Inertia::render('Scholarship/Index', [
            'scholarships' => $query->paginate(9)->withQueryString(),
            'filters' => $request->only(['search', 'degree']),
        ]);
    }

    public function show(Scholarship $scholarship)
    {
        if ($scholarship->status !== 'active' && !auth()->user()?->isAdminOrEditor()) {
            abort(404);
        }

        $related = Scholarship::where('status', 'active')
            ->where('id', '!=', $scholarship->id)
            ->where('degree', $scholarship->degree)
            ->limit(3)
            ->get();

        return Inertia::render('Scholarship/Show', [
            'scholarship' => $scholarship,
            'related' => $related,
        ]);
    }
}
