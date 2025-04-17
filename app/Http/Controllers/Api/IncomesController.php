<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\IncomeResource;
use App\Models\Income;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IncomesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->user()->id;

        $incomes = Income::query()
            ->where('user_id', $userId)
            ->latest()
            ->paginate(10);

        return IncomeResource::collection($incomes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'source' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $income = Income::create([
            'user_id' => auth()->user()->id,
            'source' => $request->source,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Income saved successfully.',
            'data' => new IncomeResource($income),
        ], Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userId = auth()->user()->id;

        $income = Income::findOrFail($id);

        $request->validate([
            'source' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        if ($income->user_id !== $userId) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized to update this income.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $income->update([
            'user_id' => $userId,
            'source' => $request->source,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Income updated successfully.',
            'data' => new IncomeResource($income),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userId = auth()->user()->id;

        $income = Income::findOrFail($id);

        if ($income->user_id !== $userId) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized to delete this income.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $income->delete();

        return response()->noContent();
    }
}
