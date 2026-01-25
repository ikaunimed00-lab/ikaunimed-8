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
        $query = Scholarship::query()->latest();

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

        $validated['slug'] = Str::slug($validated['title'] . '-' . Str::random(6));
        $validated['status'] = 'open';

        Scholarship::create($validated);

        return redirect()->route('dashboard.scholarships.index')
            ->with('success', 'Beasiswa berhasil dibuat.');
    }

    public function edit(Scholarship $scholarship)
    {
        return Inertia::render('Dashboard/Scholarship/Edit', [
            'scholarship' => $scholarship,
        ]);
    }

    public function update(Request $request, Scholarship $scholarship)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'provider' => 'required|string|max:255',
            'degree' => 'required|string',
            'description' => 'required|string',
            'coverage_type' => 'required|string',
            'deadline' => 'nullable|date',
            'link' => 'nullable|url',
            'status' => 'required|in:open,closed',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('scholarships', 'public');
        }

        $scholarship->update($validated);

        return redirect()->route('dashboard.scholarships.index')
            ->with('success', 'Beasiswa berhasil diperbarui.');
    }

    public function destroy(Scholarship $scholarship)
    {
        $scholarship->delete();

        return redirect()->back()->with('success', 'Beasiswa berhasil dihapus.');
    }
}
