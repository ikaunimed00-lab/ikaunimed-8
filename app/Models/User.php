<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Atribut yang dapat diisi secara massal (Mass Assignable).
     * Semua kolom input dari form registrasi alumni harus didaftarkan di sini.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'wa',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat_lengkap',
        's1_fakultas',
        's1_prodi',
        's1_tahun_masuk',
        's1_tahun_tamat',
        's2_prodi',
        's2_tahun_masuk',
        's2_tahun_tamat',
        's3_prodi',
        's3_tahun_masuk',
        's3_tahun_tamat',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'tanggal_lahir' => 'date',
        ];
    }
}
