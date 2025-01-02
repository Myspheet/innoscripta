<?php

namespace App\Console\Commands;

use App\Interfaces\NewsSourceInterface;
use App\Jobs\NewsJob;
use App\Models\Author;
use App\Models\Categories;
use App\Models\Sources;
use App\Services\EntityUpdateService;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FetchNewsData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch {--fetch=100}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches News from all the currently available sources';

    /**
     * New Source
     *
     * @var NewsSourceInterface
     */
    protected NewsSourceInterface $newsSource;

    /**
     * Entity update service
     *
     * @var EntityUpdateService
     */
    private EntityUpdateService $entityUpdateService;


    public function __construct(
        EntityUpdateService $entityUpdateService,
    ) {
        parent::__construct();
        $this->entityUpdateService = $entityUpdateService;
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        try {
            // Create Unknown Category, Source and Author
            Categories::firstOrCreate(
                ['name' => 'Unknown']
            );
            Sources::firstOrCreate(
                ['name' => 'Unknown']
            );
            Author::firstOrCreate(
                ['name' => 'Unknown']
            );

            $sources = ["newsapi", "mediastack", "worldnewsapi"];
//        $sources = ["worldnewsapi"];

            $this->validateArguments();

            foreach ($sources as $source) {
                // Get News source instance
                $this->newsSource = app(NewsSourceInterface::class)->get($source);

                // fetch news
                $this->info("Fetching news from $source...");
                $data = $this->fetchAllNews();

                // Update the categories, sources and authors table
                $this->info("Fetching news from data...");
                $allData = $this->updateDatabase($data);

                // Format the data
                $this->info("Formatting news from $source...");
                $formattedData = $this->formatData($data, $allData);

                // Send to the queue
                $this->info("Sending news from $source to queue...");
                NewsJob::dispatch($formattedData);
                $this->info("Sent news from $source to queue.");
            }

            $this->info("All done, please make sure the queue worker is running");
        }catch (\Exception $exception){
            $this->error($exception->getMessage());
        }
    }

    /**
     * Validate the command line option passed
     *
     * @return array|void
     * @throws ValidationException
     */
    protected function validateArguments()
    {
        $validator = Validator::make($this->options(), [
            'fetch' => 'integer|min:100|max:400',
        ]);

        if ($validator->fails()) {
            $this->error('The given value must be between 100 and 400');

            collect($validator->errors()->all())
                ->each(fn($error) => $this->line($error));
            exit;
        }

        return $validator->validated();
    }

    /**
     * Fetch the news from all sources
     *
     * @return array
     */
    protected function fetchAllNews(): array
    {
        $news = [];
        $totalNumberOfArticles = (int) $this->option('fetch');

        $limit = 100;
        for ($i = 0; $i < ceil($totalNumberOfArticles / $limit); $i++) {
            // Calculate the number of items to process in this iteration
            $currentChunkSize = min($limit, $totalNumberOfArticles - $i * $limit);

            $news = array_merge($this->fetchNews($currentChunkSize, $i + 1), $news);
        }
        $this->info(">>>>>>Total News count " . count($news));
        return $news;
    }

    /**
     * @param int $limit
     * @return array
     */
    private function fetchNews(int $limit = 100, int $page = 1): array
    {
        try {
            $this->info(">>>>>>>>Fetching $limit news from $page...");
            return $this->newsSource->fetchNews($limit, $page);
        }catch(\Exception $e){
            $this->error("Hello Error:  " .$e->getMessage());
            return [];
        }
    }

    /**
     * @param array $data
     * @param $info
     * @return array
     */
    protected function formatData(array $data, $info): array
    {
        $newsToInsertOrUpdate = [];

        $authors = $info['authors'];
        $categories = $info['categories'];
        $sources = $info['sources'];

        foreach ($data as $item) {
            try {
                $author_id = $authors[$this->newsSource->getAuthorFromItem($item)];
                $category_id = $categories[$this->newsSource->getCategoryFromItem($item)];
                $source_id = $sources[$this->newsSource->getSourceFromItem($item)];

                $formattedData = $this->newsSource->formatNewsData($item, $author_id, $category_id, $source_id);
                $newsToInsertOrUpdate[] = $formattedData;
            }catch (\Exception $e){
//                $this->error(json_encode($item));
                $this->error($e->getMessage());
            }
        }

        return $newsToInsertOrUpdate;
    }

    /**
     * @param $data
     * @return array
     */
    protected function updateDatabase($data): array
    {
        $categories = $this->newsSource->fetchCategories($data);
        $authors = $this->newsSource->fetchAuthors($data);
        $sources = $this->newsSource->fetchSources($data);

        $this->entityUpdateService->updateEntity(Categories::class, $categories);
        $this->entityUpdateService->updateEntity(Author::class, $authors);
        $this->entityUpdateService->updateEntity(Sources::class, $sources);

        return [
            'categories' => Categories::whereIn('name', $categories->merge(['Unknown']))->pluck('id', 'name'),
            'authors' => Author::whereIn('name', $authors->merge(['Unknown']))->pluck('id', 'name'),
            'sources' => Sources::whereIn('name', $sources->merge(['Unknown']))->pluck('id', 'name'),
        ];
    }
}
