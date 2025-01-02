<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserAuthorResource;
use App\Http\Resources\UserCategoryResource;
use App\Http\Resources\UserSourcesResource;
use App\Models\Author;
use App\Models\Categories;
use App\Models\Sources;
use App\Models\UserAuthor;
use App\Models\UserCategories;
use App\Models\UserSources;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    //
    /**
     * @return JsonResponse
     */
    public function getOptions()
    {
        $user = auth()->user();
        return response()->json([
            "allOptions" => [
                "categories" => Categories::all(),
                "authors" => Author::all(),
                'sources' => Sources::all()
            ],
            "allUserOptions" => [
                "sources" => UserSourcesResource::collection($user->userSources),
                "authors" => UserAuthorResource::collection($user->userAuthors),
                "categories" => UserCategoryResource::collection($user->userCategories),
            ]
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function saveOptions(Request $request)
    {
        // Validate request inputs
        $request->validate([
            'authors' => 'array|nullable',
            'authors.*' => 'integer|exists:authors,id',
            'categories' => 'array|nullable',
            'categories.*' => 'integer|exists:categories,id',
            'sources' => 'array|nullable',
            'sources.*' => 'integer|exists:sources,id',
        ]);

        $userId = auth()->user()->id;

        DB::transaction(function () use ($request, $userId) {
            // Update authors
            if ($request->filled('authors')) {
                $this->updateUserRelationships(UserAuthor::class, 'author_id', $userId, $request->authors);
            }

            // Update categories
            if ($request->filled('categories')) {
                $this->updateUserRelationships(UserCategories::class, 'category_id', $userId, $request->categories);
            }

            // Update sources
            if ($request->filled('sources')) {
                $this->updateUserRelationships(UserSources::class, 'source_id', $userId, $request->sources);
            }
        });

        return response()->json(['message' => 'Preferences updated successfully.']);

    }

    /**
     * Update a user's relationships for a given model and relationship column.
     *
     * @param string $modelClass
     * @param string $column
     * @param int $userId
     * @param array $newIds
     * @return void
     */
    protected function updateUserRelationships(string $modelClass, string $column, int $userId, array $newIds)
    {
        // Fetch existing records
        $existingRecords = $modelClass::where('user_id', $userId)
            ->pluck($column)
            ->toArray();

        // Determine records to insert and delete
        $recordsToInsert = array_diff($newIds, $existingRecords);
        $recordsToDelete = array_diff($existingRecords, $newIds);

        // Insert new records in bulk
        if (!empty($recordsToInsert)) {
            $insertData = array_map(function ($id) use ($userId, $column) {
                return [
                    'user_id' => $userId,
                    $column => $id,
                    'created_at' => now(), // Add timestamps if required
                    'updated_at' => now(),
                ];
            }, $recordsToInsert);

            $modelClass::insert($insertData);
        }

        // Delete obsolete records
        $modelClass::where('user_id', $userId)
            ->whereIn($column, $recordsToDelete)
            ->delete();
    }
}
