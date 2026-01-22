<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Legalization;
use App\Models\User;

class LegalizationSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            $this->command->warn('No user found, skipping LegalizationSeeder.');
            return;
        }

        Legalization::create([
            'user_id'        => $user->id,
            'jenjang'        => 'S1',
            'tahun_lulus'    => 2022,
            'jumlah_lembar'  => 3,
            'tujuan'         => 'Keperluan administrasi kampus',
            'status'         => 'submitted',
            'submitted_at'   => now(),
        ]);
    }
}
