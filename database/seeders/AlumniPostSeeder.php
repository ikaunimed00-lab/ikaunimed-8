<?php

namespace Database\Seeders;

use App\Models\AlumniPost;
use App\Models\User;
use Illuminate\Database\Seeder;

class AlumniPostSeeder extends Seeder
{
    public function run(): void
    {
        $subscribers = User::where('role', 'subscriber')->get();
        $categories = array_keys(AlumniPost::categories());

        foreach ($subscribers as $subscriber) {
            // Buat 3-5 post per subscriber
            for ($i = 0; $i < rand(3, 5); $i++) {
                AlumniPost::create([
                    'user_id' => $subscriber->id,
                    'title' => fake()->sentence(),
                    'content' => fake()->paragraphs(3, true),
                    'category' => $categories[array_rand($categories)],
                    'status' => ['pending', 'published', 'rejected'][array_rand(['pending', 'published', 'rejected'])],
                    'published_at' => rand(0, 1) ? now()->subDays(rand(1, 30)) : null,
                ]);
            }
        }
    }
}