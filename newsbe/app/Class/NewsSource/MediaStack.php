<?php

namespace App\Class\NewsSource;

use App\Interfaces\NewsSourceInterface;
use App\Traits\NewsSourceTrait;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MediaStack implements NewsSourceInterface
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
        $apiKey = config('services.apikeys.mediastack_key');
        $offset = ($page - 1) * $limit;
        $jsonData = Http::get("https://api.mediastack.com/v1/news?offset=$offset&languages=en&access_key=$apiKey&limit=$limit");
//        Storage::disk('local')->put('mediastack.json', $jsonData);
//        $jsonData = Storage::disk('local')->get('mediastack.json');
//        $data = json_decode($jsonData, true);
        if (!array_key_exists('data', json_decode($jsonData, true))) {
            throw new \Exception("There was an error fetching news from Mediastack page $page");
        }

        return $jsonData['data'];
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
        return [
            "title" => $data['title'],
            "description" => mb_convert_encoding($data['description'], 'UTF-8', 'ISO-8859-1'),
            "url" => $data['url'],
            "url_hash" => md5($data['url']),
            "image" => $data['image'],
            "author_id" => $author_id,
            "category_id" => $category_id,
            "source_id" => $source_id,
            "published_at" => $data['published_at'],
        ];
    }
}
