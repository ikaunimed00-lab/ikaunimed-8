<?php

namespace App\Http\Controllers\Info;

use App\Http\Controllers\Controller;
use App\Models\StaticPage;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        $page = StaticPage::where('key', 'about')->first();
        $vision = StaticPage::where('key', 'vision-mission')->first();

        return Inertia::render('Info/About', [
            'page' => $page,
            'vision' => $vision,
        ]);
    }

    public function structure()
    {
        $page = StaticPage::where('key', 'structure')->first();

        return Inertia::render('Info/Structure', [
            'page' => $page,
        ]);
    }

    public function faq()
    {
        $page = StaticPage::where('key', 'faq')->first();

        return Inertia::render('Info/FAQ', [
            'page' => $page,
        ]);
    }

    public function terms()
    {
        $page = StaticPage::where('key', 'terms')->first();

        return Inertia::render('Info/Terms', [
            'page' => $page,
        ]);
    }

    public function privacy()
    {
        $page = StaticPage::where('key', 'privacy')->first();

        return Inertia::render('Info/Privacy', [
            'page' => $page,
        ]);
    }

    public function contact()
    {
        $page = StaticPage::where('key', 'contact')->first();

        return Inertia::render('Info/Contact', [
            'page' => $page,
        ]);
    }
}
