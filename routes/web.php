<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\NewsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\LegalizationController;
use App\Http\Controllers\AlumniProfileController;
use App\Http\Controllers\OAuthController;

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\LegalizationAdminController;
use App\Http\Controllers\Dashboard\NotificationController;

/* === KABAR ALUMNI === */
use App\Http\Controllers\Community\AlumniPostController;
use App\Http\Controllers\Dashboard\AlumniPostDashboardController;
use App\Http\Controllers\Dashboard\AlumniPostModerationController;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/
Route::get('/', fn () => Inertia::render('Index'))->name('home');

Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{news:slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/api/news/trending', [NewsController::class, 'trending'])->name('news.trending');

Route::get('/kategori', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/kategori/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('/kategori/{category:slug}/trending', [CategoryController::class, 'trendingByCategory'])
    ->name('categories.trending');

/*
|--------------------------------------------------------------------------
| KABAR ALUMNI - PUBLIC
|--------------------------------------------------------------------------
*/
Route::get('/kabar-alumni', [AlumniPostController::class, 'index'])
    ->name('alumni-posts.index');

Route::get('/kabar-alumni/{alumniPost:slug}', [AlumniPostController::class, 'show'])
    ->name('alumni-posts.show');

/*
|--------------------------------------------------------------------------
| SITEMAP
|--------------------------------------------------------------------------
*/
Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/sitemap/news.xml', [SitemapController::class, 'news']);
Route::get('/sitemap/categories.xml', [SitemapController::class, 'categories']);
Route::get('/sitemap/google-news.xml', [SitemapController::class, 'googleNews']);

/*
|--------------------------------------------------------------------------
| OAUTH
|--------------------------------------------------------------------------
*/
Route::get('/auth/google', [OAuthController::class, 'googleRedirect'])->name('oauth.google');
Route::get('/auth/google/callback', [OAuthController::class, 'googleCallback'])
    ->name('oauth.google.callback');

/*
|--------------------------------------------------------------------------
| AUTHENTICATED
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {

    Route::post('/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect()->route('home');
    })->name('logout');

    /*
    |--------------------------------------------------------------------------
    | MULTI ROLE DASHBOARD
    |--------------------------------------------------------------------------
    */
    Route::get('/dashboard/subscriber', [DashboardController::class, 'subscriberDashboard'])
        ->middleware('role:subscriber')
        ->name('dashboard.subscriber');

    Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard'])
        ->middleware('role:admin')
        ->name('dashboard.admin');

    Route::get('/dashboard/editor', [DashboardController::class, 'editorDashboard'])
        ->middleware('role:editor')
        ->name('dashboard.editor');

    Route::get('/dashboard/writer', [DashboardController::class, 'writerDashboard'])
        ->middleware('role:writer')
        ->name('dashboard.writer');

    /*
    |--------------------------------------------------------------------------
    | NOTIFICATIONS
    |--------------------------------------------------------------------------
    */
    Route::prefix('api/notifications')->name('notifications.')->group(function () {
        Route::get('/', [NotificationController::class, 'index'])->name('index');
        Route::get('/unread-count', [NotificationController::class, 'unreadCount'])->name('unread_count');
        Route::post('/{notification}/read', [NotificationController::class, 'markAsRead'])->name('mark_as_read');
        Route::post('/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('mark_all_as_read');
        Route::delete('/{notification}', [NotificationController::class, 'destroy'])->name('destroy');
    });

    /*
    |--------------------------------------------------------------------------
    | PROFILE
    |--------------------------------------------------------------------------
    */
    Route::get('/profile/edit', [AlumniProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update', [AlumniProfileController::class, 'update'])->name('profile.update');

    /*
    |--------------------------------------------------------------------------
    | LEGALIZATION - USER
    |--------------------------------------------------------------------------
    */
    Route::get('/legalization', [LegalizationController::class, 'index'])->name('legalization.index');
    Route::get('/legalization/create', [LegalizationController::class, 'create'])->name('legalization.create');
    Route::post('/legalization', [LegalizationController::class, 'store'])->name('legalization.store');
    Route::get('/legalization/{legalization}', [LegalizationController::class, 'show'])->name('legalization.show');
    Route::post('/legalization/{legalization}/upload', [LegalizationController::class, 'upload'])
        ->name('legalization.upload');

    /*
    |--------------------------------------------------------------------------
    | DASHBOARD ADMIN - LEGALIZATION (SOURCE OF TRUTH)
    |--------------------------------------------------------------------------
    */
    Route::prefix('dashboard/admin')
        ->middleware('role:admin')
        ->name('dashboard.admin.')
        ->group(function () {
            Route::get('/legalizations', [LegalizationAdminController::class, 'index'])->name('legalizations.index');
            Route::get('/legalizations/{legalization}', [LegalizationAdminController::class, 'show'])->name('legalizations.show');
            Route::post('/legalizations/{legalization}/approve', [LegalizationAdminController::class, 'approve'])->name('legalizations.approve');
            Route::post('/legalizations/{legalization}/reject', [LegalizationAdminController::class, 'reject'])->name('legalizations.reject');
            Route::post('/legalizations/{legalization}/note', [LegalizationAdminController::class, 'updateNote'])->name('legalizations.update_note');
        });

    /*
    |--------------------------------------------------------------------------
    | ADMIN LEGALIZATIONS (ALIAS – UNTUK ADMIN LAYOUT)
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')
        ->middleware('role:admin')
        ->name('admin.')
        ->group(function () {
            Route::get('/legalizations', [LegalizationAdminController::class, 'index'])->name('legalizations.index');
            Route::get('/legalizations/{legalization}', [LegalizationAdminController::class, 'show'])->name('legalizations.show');
            Route::post('/legalizations/{legalization}/approve', [LegalizationAdminController::class, 'approve'])->name('legalizations.approve');
            Route::post('/legalizations/{legalization}/reject', [LegalizationAdminController::class, 'reject'])->name('legalizations.reject');
            Route::post('/legalizations/{legalization}/note', [LegalizationAdminController::class, 'updateNote'])->name('legalizations.update_note');
        });

    /*
    |--------------------------------------------------------------------------
    | ADMIN - USERS
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')
        ->middleware('role:admin')
        ->name('admin.')
        ->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
            Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
            Route::post('/users/bulk-delete', [UserController::class, 'bulkDestroy'])->name('users.bulk-delete');
        });

    /*
    |--------------------------------------------------------------------------
    | ADMIN / EDITOR / WRITER - NEWS
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')
        ->middleware('role:admin,editor,writer')
        ->name('admin.')
        ->group(function () {
            Route::get('/news', [NewsController::class, 'adminIndex'])->name('news.index');
            Route::get('/news/create', [NewsController::class, 'create'])->name('news.create');
            Route::post('/news', [NewsController::class, 'store'])->name('news.store');
            Route::get('/news/{news:slug}/edit', [NewsController::class, 'edit'])->name('news.edit');
            Route::put('/news/{news:slug}', [NewsController::class, 'update'])->name('news.update');
            Route::delete('/news/{news:slug}', [NewsController::class, 'destroy'])
                ->middleware('role:admin,editor')
                ->name('news.destroy');
            Route::post('/news/bulk-delete', [NewsController::class, 'bulkDestroy'])
                ->middleware('role:admin,editor')
                ->name('news.bulk-delete');
        });

    /*
    |--------------------------------------------------------------------------
    | KABAR ALUMNI - SUBSCRIBER
    |--------------------------------------------------------------------------
    */
    Route::prefix('dashboard/subscriber/alumni-posts')
        ->name('dashboard.subscriber.alumni-posts.')
        ->controller(AlumniPostDashboardController::class)
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/{alumniPost}/edit', 'edit')->name('edit');
            Route::put('/{alumniPost}', 'update')->name('update');
            Route::delete('/{alumniPost}', 'destroy')->name('destroy');
        });

    /*
    |--------------------------------------------------------------------------
    | KABAR ALUMNI - MODERATION
    |--------------------------------------------------------------------------
    */
    Route::prefix('dashboard/editor')
        ->middleware('role:editor,admin')
        ->name('dashboard.editor.')
        ->group(function () {
            Route::get('/alumni-posts/moderation', [AlumniPostModerationController::class, 'index'])->name('alumni-posts.moderation');
            Route::get('/alumni-posts/moderation/{alumniPost}', [AlumniPostModerationController::class, 'show'])->name('alumni-posts.moderation.show');
            Route::post('/alumni-posts/{alumniPost}/approve', [AlumniPostModerationController::class, 'approve'])->name('alumni-posts.approve');
            Route::post('/alumni-posts/{alumniPost}/reject', [AlumniPostModerationController::class, 'reject'])->name('alumni-posts.reject');
            Route::delete('/alumni-posts/{alumniPost}/force', [AlumniPostModerationController::class, 'destroy'])
                ->middleware('role:admin')
                ->name('alumni-posts.force-delete');
        });
});
