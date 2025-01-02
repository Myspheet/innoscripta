<?php

namespace App\Interfaces;


interface NewsSourceInterface extends
    NewsFetcherInterface,
    NewsFormatterInterface,
    EntityExtratorInterface
{
}
