<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Partnership;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PartnershipDashboardController extends Controller
{
    public function index()
    {
        $query = Partnership::query()->latest();

        return Inertia::render('Dashboard/Partnership/Index', [
            'partnerships' => $query->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Partnership/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'website' => 'nullable|url',
            'description' => 'nullable|string',
            'benefit_details' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('partnerships', 'public');
        }

        $validated['slug'] = Str::slug($validated['name'] . '-' . Str::random(6));
        $validated['is_active'] = true;

        Partnership::create($validated);

        return redirect()->route('dashboard.partnerships.index')
            ->with('success', 'Kemitraan berhasil dibuat.');
    }

    public function edit(Partnership $partnership)
    {
        return Inertia::render('Dashboard/Partnership/Edit', [
            'partnership' => $partnership,
        ]);
    }

    public function update(Request $request, Partnership $partnership)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'website' => 'nullable|url',
            'description' => 'nullable|string',
            'benefit_details' => 'nullable|string',
            'is_active' => 'boolean',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('partnerships', 'public');
        }

        $partnership->update($validated);

        return redirect()->route('dashboard.partnerships.index')
            ->with('success', 'Kemitraan berhasil diperbarui.');
    }

    public function destroy(Partnership $partnership)
    {
        $partnership->delete();

        return redirect()->back()->with('success', 'Kemitraan berhasil dihapus.');
    }
}
