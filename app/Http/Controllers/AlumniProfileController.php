<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Notification;

class AlumniProfileController extends Controller
{
    /**
     * Tampilkan form edit profil alumni
     */
    public function edit()
    {
        $user = auth()->user();

        // Get notifications for sidebar
        try {
            $notifications = Notification::unreadForUser($user->id);
        } catch (\Exception $e) {
            $notifications = [];
        }

        return Inertia::render('Alumni/Profile/Edit', [
            'user' => $user,
            'notifications' => $notifications,
            'stats' => [],
        ]);
    }

    /**
     * Update profil alumni
     */
    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            // Identitas Pribadi
            'name' => ['required', 'string', 'max:255'],
            'wa' => ['required', 'string', 'regex:/^(\+62|62|0)[0-9]{9,12}$/'],
            'nik' => ['required', 'string', 'size:16', 'regex:/^[0-9]{16}$/'],
            'tempat_lahir' => ['required', 'string', 'max:100'],
            'tanggal_lahir' => ['required', 'date', 'before:today'],
            'alamat_lengkap' => ['required', 'string', 'max:500'],

            // Pendidikan S1
            's1_fakultas' => ['required', 'string', 'max:150'],
            's1_prodi' => ['required', 'string', 'max:150'],
            's1_tahun_masuk' => ['required', 'integer', 'min:1990', 'max:' . now()->year],
            's1_tahun_tamat' => ['required', 'integer', 'min:1990', 'max:' . now()->year],

            // Pendidikan S2 (Opsional)
            's2_prodi' => ['nullable', 'string', 'max:150'],
            's2_tahun_masuk' => ['nullable', 'integer', 'min:1990', 'max:' . now()->year],
            's2_tahun_tamat' => ['nullable', 'integer', 'min:1990', 'max:' . now()->year],

            // Pendidikan S3 (Opsional)
            's3_prodi' => ['nullable', 'string', 'max:150'],
            's3_tahun_masuk' => ['nullable', 'integer', 'min:1990', 'max:' . now()->year],
            's3_tahun_tamat' => ['nullable', 'integer', 'min:1990', 'max:' . now()->year],
        ], [
            'wa.regex' => 'Nomor WhatsApp tidak valid. Gunakan format: 0812xxxxxx atau +62812xxxxxx',
            'nik.size' => 'NIK harus terdiri dari 16 digit',
            'nik.regex' => 'NIK hanya boleh berisi angka',
            's1_tahun_masuk.required' => 'Tahun masuk S1 harus diisi',
            's1_tahun_tamat.required' => 'Tahun tamat S1 harus diisi',
        ]);

        // Update user
        $user->update($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Profil alumni berhasil diperbarui! Selamat datang di portal IKA UNIMED.');
    }
}
