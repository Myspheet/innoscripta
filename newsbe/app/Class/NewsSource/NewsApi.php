<?php

namespace App\Class\NewsSource;

use App\Interfaces\NewsSourceInterface;
use App\Traits\NewsSourceTrait;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class NewsApi implements NewsSourceInterface
{
    use NewsSourceTrait;

    /**
     * @param $limit
     * @param $page
     * @return array
     * @throws \Exception
     */
    public function fetchNews($limit = 100, $page = 1): array
    {

        $apikey = config('services.apikeys.newsapi_key');
        $jsonData = Http::get("https://newsapi.org/v2/everything?page=$page&q=Development&pageSize=$limit&apiKey=$apikey");
        Storage::disk('local')->put("newsap$page.json", $jsonData);
//            $jsonData = Storage::disk('local')->get('newsapi.json');;
//            $data = json_decode($jsonData, true);

        if (!array_key_exists('articles', json_decode($jsonData, true))) {
            $message = $jsonData['message'] ?? '';
            throw new \Exception("There was an error fetching news NewsApi from page $page with message: $message");
        }

        return $jsonData['articles'];
    }

    /**
     * @param $data
     * @param $author_id
     * @param $category_id
     * @param $source_id
     * @return array
     */
    public function formatNewsData($data, $author_id = null, $category_id = null, $source_id = null): array
    {
        Log::error(json_encode($data));
        return [
            "title" => $data['title'],
            "description" => mb_convert_encoding($data['description'], 'UTF-8', 'ISO-8859-1'),
            "url" => $data['url'],
            "url_hash" => md5($data['url']),
            "author_id" => $author_id,
            "category_id" => $category_id,
            "source_id" => $source_id,
            "published_at" => $data['publishedAt'],
        ];
    }

    public function fetchSources(array $data): Collection
    {
        return collect($data)->pluck('source.name')->unique()->whereNotNull();
    }

    public function getSourceFromItem($item): string
    {
        return $item['source']['name'] ?? 'Unknown';
    }
}
