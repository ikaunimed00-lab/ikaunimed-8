<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\OrganizationMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OrganizationMemberController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Organization $organization)
    {
        $user = auth()->user();

        // Scope Check
        if (!$user->isCentralAdmin()) {
            $isOwn = $organization->id === $user->organization_id;
            $isChild = $organization->parent_id === $user->organization_id;
            
            if (!$isOwn && !$isChild) {
                abort(403, 'Unauthorized access.');
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048', // 2MB Max
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['organization_id'] = $organization->id;
        
        if (!isset($validated['order'])) {
            $validated['order'] = $organization->members()->max('order') + 1;
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('organization-members', 'public');
            $validated['image'] = $path;
        }

        OrganizationMember::create($validated);

        return redirect()->back()->with('success', 'Anggota berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrganizationMember $member)
    {
        $user = auth()->user();
        $organization = $member->organization;

        // Scope Check
        if (!$user->isCentralAdmin()) {
            $isOwn = $organization->id === $user->organization_id;
            $isChild = $organization->parent_id === $user->organization_id;
            
            if (!$isOwn && !$isChild) {
                abort(403, 'Unauthorized access.');
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($member->image) {
                Storage::disk('public')->delete($member->image);
            }
            $path = $request->file('image')->store('organization-members', 'public');
            $validated['image'] = $path;
        }

        $member->update($validated);

        return redirect()->back()->with('success', 'Data anggota berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrganizationMember $member)
    {
        $user = auth()->user();
        $organization = $member->organization;

        // Scope Check
        if (!$user->isCentralAdmin()) {
            $isOwn = $organization->id === $user->organization_id;
            $isChild = $organization->parent_id === $user->organization_id;
            
            if (!$isOwn && !$isChild) {
                abort(403, 'Unauthorized access.');
            }
        }

        if ($member->image) {
            Storage::disk('public')->delete($member->image);
        }

        $member->delete();

        return redirect()->back()->with('success', 'Anggota berhasil dihapus.');
    }

    public function reorder(Request $request, Organization $organization)
    {
        $user = auth()->user();
        
        // Scope Check
        if (!$user->isCentralAdmin()) {
            $isOwn = $organization->id === $user->organization_id;
            $isChild = $organization->parent_id === $user->organization_id;
            
            if (!$isOwn && !$isChild) {
                abort(403, 'Unauthorized access.');
            }
        }

        $request->validate([
            'members' => 'required|array',
            'members.*.id' => 'required|integer|exists:organization_members,id',
            'members.*.order' => 'required|integer',
        ]);

        foreach ($request->members as $item) {
            OrganizationMember::where('id', $item['id'])
                ->where('organization_id', $organization->id)
                ->update(['order' => $item['order']]);
        }

        return back()->with('success', 'Urutan anggota berhasil diperbarui.');
    }
}
