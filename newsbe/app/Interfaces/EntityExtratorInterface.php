<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;

interface EntityExtratorInterface
{
    public function fetchCategories(array $data): Collection;
    public function fetchSources(array $data): Collection;
    public function fetchAuthors(array $data): Collection;
    public function getSourceFromItem(array $item): string;
    public function getAuthorFromItem(array $item): string;
    public function getCategoryFromItem(array $item): string;
}
