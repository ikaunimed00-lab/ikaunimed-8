<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Organization extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'type', // pp, dpw, dpc
        'parent_id',
        'logo',
        'description',
        'address',
        'phone',
        'email',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Organization::class, 'parent_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(OrganizationMember::class)->orderBy('order', 'asc');
    }
}
