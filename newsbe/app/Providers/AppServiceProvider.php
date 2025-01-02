<?php

namespace App\Providers;

use App\Class\NewsSource\MediaStack;
use App\Class\NewsSource\NewsApi;
use App\Class\NewsSource\WorldNewsApi;
use App\Interfaces\NewsSourceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        app()->bind(
            NewsSourceInterface::class,
            function ($app) {
                return collect([
                    'newsapi' => app(NewsApi::class),
                    'mediastack' => app(MediaStack::class),
                    'worldnewsapi' => app(WorldNewsApi::class)
                ]);
            }
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
