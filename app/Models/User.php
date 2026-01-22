<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'oauth_id',
        'oauth_provider',

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

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'tanggal_lahir' => 'date',
        ];
    }

    public function isSubscriber(): bool
    {
        return $this->role === 'subscriber';
    }

    public function isWriter(): bool
    {
        return in_array($this->role, ['admin', 'editor', 'writer']);
    }

    public function isEditor(): bool
    {
        return in_array($this->role, ['admin', 'editor']);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function legalizations()
    {
        return $this->hasMany(Legalization::class);
    }

    public function news()
    {
        return $this->hasMany(News::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class)->orderBy('created_at', 'desc');
    }

    public function unreadNotificationsCount(): int
    {
        return $this->notifications()->whereNull('read_at')->count();
    }

    public function alumniPosts()
    {
        return $this->hasMany(AlumniPost::class);
    }

    public function moderatedAlumniPosts()
    {
        return $this->hasMany(AlumniPost::class, 'moderated_by');
    }
}
