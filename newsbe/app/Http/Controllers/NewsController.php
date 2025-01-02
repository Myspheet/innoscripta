<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCategoryResource;
use App\Http\Resources\UserSourcesResource;
use App\Models\Categories;
use App\Models\News;
use App\Models\Sources;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        // Validate request inputs
        $request->validate([
            'search' => 'nullable|string',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
            'category' => 'nullable|string',
            'source' => 'nullable|string',
        ]);

        $filters = $request->only(['search', 'date_from', 'date_to', 'category', 'source']);

        $articles = News::filter($filters)->with('author')->with('category')->with('source')->latest('published_at')->paginate(30);

        return response()->json([
            "data" => $articles,
            "sources" => Sources::all(),
            "categories" => Categories::all(),
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function personalizedFeed(Request $request): JsonResponse
    {
        $user = $request->user(); // Get the authenticated user
        $filters = $request->only(['search', 'date_from', 'date_to', 'category', 'source']); // get the applied filters

        // Fetch the user's preferences
        $authorIds = $user->userAuthors()->pluck('author_id')->toArray();
        $categoryIds = $user->userCategories()->pluck('category_id')->toArray();
        $sourceIds = $user->userSources()->pluck('source_id')->toArray();

        // Query the news table with "OR" conditions
        $newsFeed = News::filter($filters)->with('author')->with('category')->with('source')
            ->where(function ($query) use ($authorIds, $categoryIds, $sourceIds) {
                $query->when(!empty($authorIds), function ($q) use ($authorIds) {
                    $q->orWhereIn('author_id', $authorIds);
                });

                $query->when(!empty($categoryIds), function ($q) use ($categoryIds) {
                    $q->orWhereIn('category_id', $categoryIds);
                });

                $query->when(!empty($sourceIds), function ($q) use ($sourceIds) {
                    $q->orWhereIn('source_id', $sourceIds);
                });
            })
            ->latest('published_at') // Sort by most recent
            ->paginate(30); // Paginate results

        return response()->json([
            "data" => $newsFeed,
            "sources" => $user->userSources->isEmpty() ? Sources::all() : UserSourcesResource::collection($user->userSources),
            "categories" => $user->userCategories->isEmpty() ? Categories::all() : UserCategoryResource::collection($user->userCategories),
        ]);
    }
}
