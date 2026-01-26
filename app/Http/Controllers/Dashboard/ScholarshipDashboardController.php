<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Scholarship;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ScholarshipDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $query = Scholarship::query()->latest();

        // Filter for subscribers
        if (!$user->isEditor()) {
            $query->where('user_id', $user->id);
        }

        return Inertia::render('Dashboard/Scholarship/Index', [
            'scholarships' => $query->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Scholarship/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'provider' => 'required|string|max:255',
            'degree' => 'required|string',
            'description' => 'required|string',
            'coverage_type' => 'required|string',
            'deadline' => 'nullable|date',
            'link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('scholarships', 'public');
        }

        $user = auth()->user();
        $validated['user_id'] = $user->id;
        $validated['slug'] = Str::slug($validated['title'] . '-' . Str::random(6));
        
        // Auto-approve for admins/editors, pending for subscribers
        $validated['status'] = $user->isEditor() ? 'active' : 'pending';

        Scholarship::create($validated);

        return redirect()->route('dashboard.scholarships.index')
            ->with('success', 'Beasiswa berhasil dibuat.');
    }

    public function edit(Scholarship $scholarship)
    {
        // Authorization check
        if (!auth()->user()->isEditor() && auth()->id() !== $scholarship->user_id) {
            abort(403);
        }

        return Inertia::render('Dashboard/Scholarship/Edit', [
            'scholarship' => $scholarship,
        ]);
    }

    public function update(Request $request, Scholarship $scholarship)
    {
        // Authorization check
        if (!auth()->user()->isEditor() && auth()->id() !== $scholarship->user_id) {
            abort(403);
        }

        $rules = [
            'title' => 'required|string|max:255',
            'provider' => 'required|string|max:255',
            'degree' => 'required|string',
            'description' => 'required|string',
            'coverage_type' => 'required|string',
            'deadline' => 'nullable|date',
            'link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
        ];

        // Only admin/editor can update status directly
        if (auth()->user()->isEditor()) {
            $rules['status'] = 'required|in:active,pending,rejected,closed';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('scholarships', 'public');
        }

        $scholarship->update($validated);

        return redirect()->route('dashboard.scholarships.index')
            ->with('success', 'Beasiswa berhasil diperbarui.');
    }

    public function destroy(Scholarship $scholarship)
    {
        if (!auth()->user()->isEditor() && auth()->id() !== $scholarship->user_id) {
            abort(403);
        }

        $scholarship->delete();

        return redirect()->back()->with('success', 'Beasiswa berhasil dihapus.');
    }

    public function approve(Scholarship $scholarship)
    {
        if (!auth()->user()->isEditor()) {
            abort(403);
        }

        $scholarship->update(['status' => 'active']);

        return redirect()->back()->with('success', 'Beasiswa berhasil disetujui.');
    }

    public function reject(Scholarship $scholarship)
    {
        if (!auth()->user()->isEditor()) {
            abort(403);
        }

        $scholarship->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Beasiswa berhasil ditolak.');
    }
}
