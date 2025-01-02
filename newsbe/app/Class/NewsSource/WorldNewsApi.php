<?php

namespace App\Class\NewsSource;

use App\Interfaces\NewsSourceInterface;
use App\Traits\NewsSourceTrait;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WorldNewsApi implements NewsSourceInterface
{
    use NewsSourceTrait;

    /**
     * @param $limit
     * @param $page
     * @return array
     * @throws \Exception
     */
    public function fetchNews(int $limit = 100, int $page = 1): array
    {
        try {
            $apikey = config('services.apikeys.worldnewsapi_key');
            $offset = ($page - 1) * $limit;
            $jsonData = Http::get("https://api.worldnewsapi.com/search-news?number=$limit&offset=$offset&language=en&categories=politics,sports,business,technology,entertainment,health,science,lifestyle,travel,culture,education,environment,other&number=100&api-key=$apikey");
//            Storage::disk('local')->put("worldnew$page.json", $jsonData);
//        $jsonData = Storage::disk('local')->get('worldnews.json');
//        $data = json_decode($jsonData, true);
            if (!array_key_exists('news', json_decode($jsonData, true))) {
                throw new \Exception("There was an error fetching news from WorldNewsAPI page $page");
            };

            return $jsonData['news'];
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
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
            "description" => mb_convert_encoding($data['summary'] ?? substr($data['text'], 0, 200) . '...', 'UTF-8', 'ISO-8859-1'),
            "url" => $data['url'],
            "url_hash" => md5($data['url']),
            "image" => $data['image'],
            "author_id" => $author_id,
            "category_id" => $category_id,
            "source_id" => $source_id,
            "published_at" => $data['publish_date'],
        ];
    }
}
