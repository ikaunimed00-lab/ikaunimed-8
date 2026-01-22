<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\News::create([
        'title' => 'Selamat Datang di Website IKA UNIMED',
        'slug' => 'selamat-datang',
        'excerpt' => 'Website resmi Ikatan Alumni UNIMED kini hadir sebagai wadah kolaborasi.',
        'content' => 'Ini adalah isi konten lengkap berita pertama IKA UNIMED.',
        'image' => null,
    ]);
    
    }
}
