<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $category1 = $user->categories->where('name', 'Food')->first();
        $category2 = $user->categories->where('name', 'Transportation')->first();

        Expense::create([
            'user_id' => $user->id,
            'category_id' => $category1->id,
            'amount' => 50,
            'description' => 'Grocery shopping',
        ]);

        Expense::create([
            'user_id' => $user->id,
            'category_id' => $category2->id,
            'amount' => 20,
            'description' => 'Bus fare',
        ]);
    }
}
