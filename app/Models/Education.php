<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';

    protected $fillable = [
        'user_id',
        'level', // D1, D2, D3, D4, S1, S2, S3
        'university',
        'faculty',
        'major',
        'admission_year',
        'graduation_year',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
