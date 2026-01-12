<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => $this->passwordRules(),
            'wa' => ['required', 'string', 'max:20'],
            'nik' => ['required', 'string', 'max:16'],
            'tempat_lahir' => ['required', 'string', 'max:100'],
            'tanggal_lahir' => ['required', 'date'],
            'alamat_lengkap' => ['required', 'string'],
            's1_fakultas' => ['required', 'string'],
            's1_prodi' => ['required', 'string'],
            's1_tahun_masuk' => ['required', 'numeric'],
            's1_tahun_tamat' => ['required', 'numeric'],
        ])->validate();

        return User::create([
            'name'           => $input['name'],
            'email'          => $input['email'],
            'password'       => Hash::make($input['password']),
            'wa'             => $input['wa'],
            'nik'            => $input['nik'],
            'tempat_lahir'   => $input['tempat_lahir'],
            'tanggal_lahir'  => $input['tanggal_lahir'],
            'alamat_lengkap' => $input['alamat_lengkap'],
            
            's1_fakultas'    => $input['s1_fakultas'],
            's1_prodi'       => $input['s1_prodi'],
            's1_tahun_masuk' => $input['s1_tahun_masuk'],
            's1_tahun_tamat' => $input['s1_tahun_tamat'],
            
            's2_prodi'       => $input['s2_prodi'] ?? null,
            's2_tahun_masuk' => $input['s2_tahun_masuk'] ?? null,
            's2_tahun_tamat' => $input['s2_tahun_tamat'] ?? null,
            
            's3_prodi'       => $input['s3_prodi'] ?? null,
            's3_tahun_masuk' => $input['s3_tahun_masuk'] ?? null,
            's3_tahun_tamat' => $input['s3_tahun_tamat'] ?? null,
        ]);
    }
}
