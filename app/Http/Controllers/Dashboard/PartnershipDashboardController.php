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
        $user = auth()->user();
        $query = Partnership::query()->latest();

        // Filter for subscribers
        if (!$user->isEditor()) {
            $query->where('user_id', $user->id);
        }

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

        $user = auth()->user();
        $validated['user_id'] = $user->id;
        $validated['slug'] = Str::slug($validated['name'] . '-' . Str::random(6));
        
        // Auto-approve for admins/editors, pending for subscribers
        $validated['status'] = $user->isEditor() ? 'active' : 'pending';

        Partnership::create($validated);

        return redirect()->route('dashboard.partnerships.index')
            ->with('success', 'Kemitraan berhasil dibuat.');
    }

    public function edit(Partnership $partnership)
    {
        // Authorization check
        if (!auth()->user()->isEditor() && auth()->id() !== $partnership->user_id) {
            abort(403);
        }

        return Inertia::render('Dashboard/Partnership/Edit', [
            'partnership' => $partnership,
        ]);
    }

    public function update(Request $request, Partnership $partnership)
    {
        // Authorization check
        if (!auth()->user()->isEditor() && auth()->id() !== $partnership->user_id) {
            abort(403);
        }

        $rules = [
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'website' => 'nullable|url',
            'description' => 'nullable|string',
            'benefit_details' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ];

        // Only admin/editor can update status directly
        if (auth()->user()->isEditor()) {
            $rules['status'] = 'required|in:active,pending,rejected,closed';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('partnerships', 'public');
        }

        $partnership->update($validated);

        return redirect()->route('dashboard.partnerships.index')
            ->with('success', 'Kemitraan berhasil diperbarui.');
    }

    public function destroy(Partnership $partnership)
    {
        // Authorization check
        if (!auth()->user()->isEditor() && auth()->id() !== $partnership->user_id) {
            abort(403);
        }

        $partnership->delete();

        return redirect()->back()->with('success', 'Kemitraan berhasil dihapus.');
    }

    public function approve(Partnership $partnership)
    {
        if (!auth()->user()->isEditor()) {
            abort(403);
        }

        $partnership->update(['status' => 'active']);

        return redirect()->back()->with('success', 'Kemitraan berhasil disetujui.');
    }

    public function reject(Partnership $partnership)
    {
        if (!auth()->user()->isEditor()) {
            abort(403);
        }

        $partnership->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Kemitraan berhasil ditolak.');
    }
}
