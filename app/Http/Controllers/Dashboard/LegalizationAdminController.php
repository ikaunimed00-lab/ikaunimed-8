<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Legalization;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalizationAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Legalization::with('user', 'files');

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $legalizations = $query
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Dashboard/Admin/Legalizations/Index', [
            'legalizations' => $legalizations,
            'filters' => $request->only([
                'status',
                'search',
                'from_date',
                'to_date',
            ]),
        ]);
    }

    public function show(Legalization $legalization)
    {
        return Inertia::render('Dashboard/Admin/Legalizations/Show', [
            'legalization' => $legalization->load('user', 'files'),
        ]);
    }

    public function approve(Request $request, Legalization $legalization)
    {
        $legalization->update([
            'status' => 'approved',
            'verified_at' => now(),
        ]);

        Notification::create([
            'user_id' => $legalization->user_id,
            'title' => 'Pengajuan Legalisir Disetujui',
            'message' => 'Pengajuan legalisir Anda telah disetujui.',
            'type' => 'success',
            'action_url' => route('dashboard.subscriber'),
            'related_id' => $legalization->id,
            'related_type' => 'legalization',
        ]);

        return back();
    }

    public function reject(Request $request, Legalization $legalization)
    {
        $request->validate([
            'note' => 'required|string|max:1000',
        ]);

        $legalization->update([
            'status' => 'rejected',
            'admin_note' => $request->note,
            'verified_at' => now(),
        ]);

        Notification::create([
            'user_id' => $legalization->user_id,
            'title' => 'Pengajuan Legalisir Ditolak',
            'message' => $request->note,
            'type' => 'error',
            'action_url' => route('dashboard.subscriber'),
            'related_id' => $legalization->id,
            'related_type' => 'legalization',
        ]);

        return back();
    }

    public function updateNote(Request $request, Legalization $legalization)
    {
        $request->validate([
            'admin_note' => 'required|string|max:1000',
        ]);

        $legalization->update([
            'admin_note' => $request->admin_note,
        ]);

        return back();
    }
}
