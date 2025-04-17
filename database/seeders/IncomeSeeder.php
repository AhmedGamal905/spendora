<?php

namespace Database\Seeders;

use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        Income::create([
            'user_id' => $user->id,
            'source' => 'Salary',
            'amount' => 3000,
            'description' => 'Monthly salary payment',
        ]);

        Income::create([
            'user_id' => $user->id,
            'source' => 'Freelance',
            'amount' => 500,
            'description' => 'Freelance project earnings',
        ]);
    }
}
