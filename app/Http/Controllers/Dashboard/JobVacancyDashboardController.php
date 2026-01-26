<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class JobVacancyDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $query = JobVacancy::query()->latest();

        if ($user->role === 'subscriber') {
            $query->where('user_id', $user->id);
        }

        return Inertia::render('Dashboard/JobVacancy/Index', [
            'vacancies' => $query->paginate(10),
            'userRole' => $user->role,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/JobVacancy/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string',
            'apply_link' => 'nullable|url',
            'apply_email' => 'nullable|email',
            'closing_date' => 'nullable|date',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('job-logos', 'public');
        }

        $validated['user_id'] = auth()->id();
        $validated['status'] = auth()->user()->role === 'subscriber' ? 'pending' : 'active';
        $validated['slug'] = Str::slug($validated['title'] . '-' . Str::random(6));

        JobVacancy::create($validated);

        return redirect()->route('dashboard.jobs.index')
            ->with('success', 'Lowongan berhasil dibuat.');
    }

    public function edit(JobVacancy $job)
    {
        // Authorization check
        if (auth()->user()->role === 'subscriber' && $job->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Dashboard/JobVacancy/Edit', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, JobVacancy $job)
    {
        if (auth()->user()->role === 'subscriber' && $job->user_id !== auth()->id()) {
            abort(403);
        }

        $rules = [
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'salary_range' => 'nullable|string',
            'apply_link' => 'nullable|url',
            'apply_email' => 'nullable|email',
            'closing_date' => 'nullable|date',
            'logo' => 'nullable|image|max:2048',
        ];

        // Only Admin/Editor can update status directly
        if (auth()->user()->isAdminOrEditor()) {
            $rules['status'] = 'required|in:active,pending,closed,rejected';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('job-logos', 'public');
        }

        $job->update($validated);

        return redirect()->route('dashboard.jobs.index')
            ->with('success', 'Lowongan berhasil diperbarui.');
    }

    public function approve(JobVacancy $job)
    {
        if (!auth()->user()->isAdminOrEditor()) {
            abort(403);
        }

        $job->update(['status' => 'active']);

        return redirect()->back()->with('success', 'Lowongan berhasil disetujui.');
    }

    public function reject(JobVacancy $job)
    {
        if (!auth()->user()->isAdminOrEditor()) {
            abort(403);
        }

        $job->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Lowongan berhasil ditolak.');
    }

    public function destroy(JobVacancy $job)
    {
        if (auth()->user()->role === 'subscriber' && $job->user_id !== auth()->id()) {
            abort(403);
        }

        $job->delete();

        return redirect()->back()->with('success', 'Lowongan berhasil dihapus.');
    }
}
