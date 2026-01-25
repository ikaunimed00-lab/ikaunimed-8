<?php

namespace App\Http\Controllers;

use App\Models\JobVacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobVacancyController extends Controller
{
    public function index(Request $request)
    {
        $query = JobVacancy::query()
            ->where('status', 'active')
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('title', 'like', "%{$search}%")
                        ->orWhere('company', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->when($request->type, function ($q, $type) {
                $q->where('type', $type);
            })
            ->latest();

        return Inertia::render('JobVacancy/Index', [
            'vacancies' => $query->paginate(9)->withQueryString(),
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function show(JobVacancy $vacancy)
    {
        if ($vacancy->status !== 'active' && auth()->id() !== $vacancy->user_id && !auth()->user()?->isAdminOrEditor()) {
            abort(404);
        }

        $related = JobVacancy::where('status', 'active')
            ->where('id', '!=', $vacancy->id)
            ->where('type', $vacancy->type)
            ->limit(3)
            ->get();

        return Inertia::render('JobVacancy/Show', [
            'vacancy' => $vacancy,
            'related' => $related,
        ]);
    }
}
