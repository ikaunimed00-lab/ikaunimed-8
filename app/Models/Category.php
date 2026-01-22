<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'order',
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
            'category_news',
            'category_id',
            'news_id'
        )->withTimestamps();
    }

    /**
     * Scope untuk published news only
     */
    public function scopeWithPublishedNews($query)
    {
        return $query->withCount([
            'news' => fn($q) => $q->published()
        ]);
    }
}
