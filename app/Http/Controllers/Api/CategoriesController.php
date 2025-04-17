<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule as ValidationRule;
use Symfony\Component\HttpFoundation\Response;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->user()->id;

        $categories = Category::query()
            ->where('user_id', $userId)
            ->get();

        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = auth()->user()->id;

        $request->validate([
            'name' => ['required', 'string', 'max:25', ValidationRule::unique('categories', 'name')->where('user_id', $userId)],
        ]);

        $category = Category::create([
            'user_id' => $userId,
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Category saved successfully.',
            'data' => new CategoryResource($category),
        ], Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userId = auth()->user()->id;

        $category = Category::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:25', ValidationRule::unique('categories', 'name')->where('user_id', $userId)],
        ]);

        if ($category->user_id !== $userId) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized to update this category.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $category->update(['name' => $request->name]);

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully.',
            'data' => new CategoryResource($category),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userId = auth()->user()->id;

        $category = Category::findOrFail($id);

        if ($category->user_id !== $userId) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized to delete this category.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $category->delete();

        return response()->noContent();
    }
}
