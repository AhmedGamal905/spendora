<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->user()->id;

        $expenses = Expense::query()
            ->where('user_id', $userId)
            ->with('category')
            ->latest()
            ->paginate(10);

        return ExpenseResource::collection($expenses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = auth()->user()->id;

        $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'amount' => ['required', 'numeric'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $category = Category::findOrFail($request->category_id);

        if ($category->user_id !== $userId) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized to use this category.',
            ], Response::HTTP_FORBIDDEN);
        }

        $expense = Expense::create([
            'user_id' => $userId,
            'category_id' => $request->category_id,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'expense saved successfully.',
            'data' => new ExpenseResource($expense),
        ], Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userId = auth()->user()->id;

        $expense = Expense::findOrFail($id);

        $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'amount' => ['required', 'numeric'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $category = Category::findOrFail($request->category_id);

        if ($expense->user_id !== $userId || $category->user_id !== $userId) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized to update this expense.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $expense->update([
            'category_id' => $request->category_id,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Expense updated successfully.',
            'data' => new ExpenseResource($expense),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userId = auth()->user()->id;

        $expense = Expense::findOrFail($id);

        if ($expense->user_id !== $userId) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized to delete this expense.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $expense->delete();

        return response()->noContent();
    }

    /**
     * Display a listing of the resource based on the id of a category.
     */
    public function expensesByCategory($categoryId)
    {
        $expenses = Expense::query()
            ->where('category_id', $categoryId)
            ->with('category')
            ->latest()
            ->paginate(10);

        return ExpenseResource::collection($expenses);
    }
}
