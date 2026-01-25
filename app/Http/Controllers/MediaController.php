<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function photos()
    {
        return Inertia::render('Media/Photos');
    }

    public function videos()
    {
        return Inertia::render('Media/Videos');
    }
}
