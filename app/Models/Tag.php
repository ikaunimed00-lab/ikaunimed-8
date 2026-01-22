<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    /**
     * Gunakan slug untuk route binding
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Relasi many-to-many dengan News
     */
    public function news(): BelongsToMany
    {
        return $this->belongsToMany(
            News::class,
            'news_tags',
            'tag_id',
            'news_id'
        )->withTimestamps();
    }
}
