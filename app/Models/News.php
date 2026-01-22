<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\User;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'slug',
        'image',
        'status',
        'published_at',
        'view_count',
        'user_id',
    ];

    /**
     * Attribute casting
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /**
     * Gunakan slug untuk route binding
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Relasi penulis berita
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relasi kategori berita
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            Category::class,
            'category_news',
            'news_id',
            'category_id'
        )->withTimestamps();
    }

    /**
     * Relasi tag berita
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(
            Tag::class,
            'news_tags',
            'news_id',
            'tag_id'
        )->withTimestamps();
    }

    /**
     * Scope: hanya berita yang dipublikasikan
     */
    public function scopePublished($query)
    {
        return $query
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope: hanya berita draft
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    /**
     * Scope: hanya berita scheduled
     */
    public function scopeScheduled($query)
    {
        return $query
            ->where('status', 'published')
            ->where('published_at', '>', now());
    }

    /**
     * Scope: urutkan by views (trending)
     */
    public function scopeTrending($query)
    {
        return $query->orderBy('view_count', 'desc');
    }

    /**
     * Scope: urutkan by latest
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('published_at', 'desc')->orderBy('created_at', 'desc');
    }

    /**
     * Scope: filter by kategori
     */
    public function scopeByCategory($query, $category)
    {
        return $query->whereHas('categories', fn($q) => $q->where('slug', $category));
    }

    /**
     * Increment view count
     */
    public function incrementViewCount(): void
    {
        $this->increment('view_count');
    }

    /**
     * Get related news berdasarkan kategori yang sama
     */
    public function getRelatedNews($limit = 5)
    {
        return News::published()
            ->whereHas('categories', fn($query) =>
                $query->whereIn('categories.id', $this->categories->pluck('id'))
            )
            ->where('id', '!=', $this->id)
            ->take($limit)
            ->get();
    }
}
