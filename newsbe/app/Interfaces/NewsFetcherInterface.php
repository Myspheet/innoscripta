<?php

namespace App\Interfaces;

interface NewsFetcherInterface
{
    public function fetchNews(int $limit, int $page): array;
}
