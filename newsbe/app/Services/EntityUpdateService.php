<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class EntityUpdateService
{

    /**
     * @param string $entityModel
     * @param Collection $collection
     * @return void
     */
    public function updateEntity(string $entityModel, Collection $collection): void
    {
        try {
            $existingCollection = $entityModel::whereIn('name', $collection)->pluck('id', 'name');
            $missingCollection = $collection->diff($existingCollection->keys());
            $collections = $missingCollection->map(fn($name) => [
                'name' => $name,
                'created_at' => now(),
                'updated_at' => now(),
            ])->toArray();
            $entityModel::upsert($collections, ['name'], ['name']);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
