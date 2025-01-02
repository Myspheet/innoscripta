<?php

namespace App\Traits;

use Illuminate\Support\Collection;

trait NewsSourceTrait
{
    /**
     * @param array $data
     * @return Collection
     */
    public function fetchCategories(array $data): Collection
    {
        return collect($data)->pluck('category')->unique()->whereNotNull();
    }

    /**
     * @param array $data
     * @return Collection
     */
    public function fetchSources(array $data): Collection
    {
        return collect($data)->pluck('source')->unique()->whereNotNull();
    }

    /**
     * @param array $data
     * @return Collection
     */
    public function fetchAuthors(array $data): Collection
    {
        return collect($data)->pluck('author')->unique()->whereNotNull();
    }

    /**
     * @param $item
     * @return string
     */
    public function getSourceFromItem($item): string
    {
        return !empty($item["source"]) ? $item["source"] : "Unknown";
    }

    public function getAuthorFromItem($item): string
    {
        return !empty($item["author"]) ? $item["author"] : "Unknown";
    }

    public function getCategoryFromItem($item): string
    {
        return !empty($item["category"]) ? $item["category"] : "Unknown";
    }
}
