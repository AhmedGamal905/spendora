<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $user->categories()->createMany([
            ['name' => 'Food'],
            ['name' => 'Transportation'],
            ['name' => 'Entertainment'],
            ['name' => 'Utilities'],
            ['name' => 'Health'],
        ]);
    }
}
