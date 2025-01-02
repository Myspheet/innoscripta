<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class News extends Model
{
    //
    public function category(): BelongsTo
    {
        return $this->belongsTo(Categories::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(Sources::class);
    }

    // Define the query scope
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query
            // Search by keyword
            ->when(isset($filters['search']), function ($q) use ($filters) {
                return $q->where(function ($q) use ($filters) {
                    return $q->where('title', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('description', 'like', '%' . $filters['search'] . '%');
                });
            })
            // Filter by date range
            ->when(isset($filters['date_from']), function ($q) use ($filters) {
                $q->where('published_at', '>=', $filters['date_from']);
            })
            ->when(isset($filters['date_to']), function ($q) use ($filters) {
                $q->where('published_at', '<=', $filters['date_to']);
            })
            // Filter by category
            ->when(isset($filters['category']), function ($q) use ($filters) {
                $q->whereHas('category', function ($q) use ($filters) {
                    $q->where('name', 'like', '%' . $filters['category'] . "%");
                });
            })
            // Filter by source
            ->when(isset($filters['source']), function ($q) use ($filters) {
                $q->whereHas('source', function ($q) use ($filters) {
                    $q->where('name', 'like', '%' . $filters['source'] . "%");
                });
            });
    }
}
