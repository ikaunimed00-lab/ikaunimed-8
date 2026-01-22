<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Politik',
                'slug' => 'politik',
                'description' => 'Berita seputar dunia politik nasional dan internasional',
                'icon' => '🏛️',
                'order' => 1,
            ],
            [
                'name' => 'Ekonomi',
                'slug' => 'ekonomi',
                'description' => 'Berita ekonomi, bisnis, dan investasi',
                'icon' => '💰',
                'order' => 2,
            ],
            [
                'name' => 'Pendidikan',
                'slug' => 'pendidikan',
                'description' => 'Berita pendidikan dan kampus',
                'icon' => '🎓',
                'order' => 3,
            ],
            [
                'name' => 'Kesehatan',
                'slug' => 'kesehatan',
                'description' => 'Berita kesehatan dan medis',
                'icon' => '⚕️',
                'order' => 4,
            ],
            [
                'name' => 'Teknologi',
                'slug' => 'teknologi',
                'description' => 'Berita teknologi dan startup',
                'icon' => '💻',
                'order' => 5,
            ],
            [
                'name' => 'Olahraga',
                'slug' => 'olahraga',
                'description' => 'Berita olahraga nasional dan internasional',
                'icon' => '⚽',
                'order' => 6,
            ],
            [
                'name' => 'Hiburan',
                'slug' => 'hiburan',
                'description' => 'Berita entertainment, film, dan musik',
                'icon' => '🎬',
                'order' => 7,
            ],
            [
                'name' => 'Gaya Hidup',
                'slug' => 'gaya-hidup',
                'description' => 'Berita lifestyle, fashion, dan travel',
                'icon' => '✈️',
                'order' => 8,
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
