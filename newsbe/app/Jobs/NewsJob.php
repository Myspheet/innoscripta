<?php

namespace App\Jobs;

use App\Models\News;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class NewsJob implements ShouldQueue
{
    use Queueable;

    protected $newsData;

    /**
     * Create a new job instance.
     */
    public function __construct($newsData)
    {
        //
        $this->newsData = $newsData;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            News::upsert($this->newsData, ['url_hash'], ['title', 'description', 'published_at']);
        }catch (\Exception $exception){
            Log::error($exception->getMessage());
        }
    }
}
