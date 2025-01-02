<?php

namespace App\Interfaces;

interface NewsFormatterInterface
{
    public function formatNewsData($data, $author_id = null, $category_id = null, $source_id = null);
}
