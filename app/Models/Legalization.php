<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Legalization extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'jenjang',
        'tahun_lulus',
        'jumlah_lembar',
        'tujuan',
        'status',
        'admin_note',
        'submitted_at',
        'verified_at',
        'completed_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    // 1 legalisasi milik 1 alumni
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 1 legalisasi punya banyak file
    public function files()
    {
        return $this->hasMany(LegalizationFile::class);
    }
}
