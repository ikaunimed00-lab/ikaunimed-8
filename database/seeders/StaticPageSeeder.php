<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaticPage;

class StaticPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'key' => 'about',
                'title' => 'Tentang IKA UNIMED',
                'content' => '<p>Ikatan Alumni Universitas Negeri Medan (IKA UNIMED) adalah wadah resmi bagi para lulusan UNIMED untuk saling terhubung, berkolaborasi, dan berkontribusi bagi almamater serta masyarakat.</p><p>Sejarah IKA UNIMED dimulai sejak...</p>',
            ],
            [
                'key' => 'structure',
                'title' => 'Struktur Organisasi',
                'content' => '<p>Struktur Organisasi IKA UNIMED periode 2024-2028:</p><ul><li>Ketua Umum: ...</li><li>Sekretaris Jenderal: ...</li><li>Bendahara Umum: ...</li></ul>',
            ],
            [
                'key' => 'vision-mission',
                'title' => 'Visi & Misi',
                'content' => '<h3>Visi</h3><p>Menjadi organisasi alumni yang unggul...</p><h3>Misi</h3><ol><li>Membangun jejaring alumni yang kuat...</li><li>Memberikan kontribusi nyata...</li></ol>',
            ],
            [
                'key' => 'faq',
                'title' => 'Pertanyaan Umum (FAQ)',
                'content' => '<p>Berikut adalah pertanyaan yang sering diajukan:</p><p><strong>Bagaimana cara mendaftar?</strong><br>Silakan klik tombol Daftar di pojok kanan atas...</p>',
            ],
            [
                'key' => 'terms',
                'title' => 'Syarat & Ketentuan',
                'content' => '<p>Syarat dan ketentuan penggunaan layanan IKA UNIMED...</p>',
            ],
            [
                'key' => 'privacy',
                'title' => 'Kebijakan Privasi',
                'content' => '<p>Kebijakan privasi ini menjelaskan bagaimana kami mengelola data Anda...</p>',
            ],
            [
                'key' => 'contact',
                'title' => 'Hubungi Kami',
                'content' => '<p>Silakan hubungi kami melalui formulir di bawah ini atau kunjungi sekretariat kami pada jam kerja.</p>',
            ],
        ];

        foreach ($pages as $page) {
            StaticPage::updateOrCreate(
                ['key' => $page['key']],
                $page
            );
        }
    }
}
