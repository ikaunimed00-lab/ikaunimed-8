<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\NewsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DatabaseController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\LegalizationController;
use App\Http\Controllers\AlumniProfileController;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\Settings\ProfileController;

use App\Http\Controllers\Info\PageController;
use App\Http\Controllers\MediaController;

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\LegalizationAdminController;
use App\Http\Controllers\Dashboard\NotificationController;

use App\Http\Controllers\Dashboard\OrganizationController as DashboardOrganizationController;
use App\Http\Controllers\Dashboard\OrganizationMemberController;

/* === KABAR ALUMNI === */
use App\Http\Controllers\Community\AlumniPostController;
use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\Admin\StaticPageController;
use App\Http\Controllers\Dashboard\AlumniPostDashboardController;
use App\Http\Controllers\Dashboard\AlumniPostModerationController;
use App\Http\Controllers\Dashboard\JobVacancyDashboardController;
use App\Http\Controllers\ScholarshipController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\Dashboard\ScholarshipDashboardController;
use App\Http\Controllers\Dashboard\PartnershipDashboardController;
use App\Http\Controllers\PublicOrganizationController;

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
| INFO PAGES & MEDIA
|--------------------------------------------------------------------------
*/
Route::get('/tentang-kami', [PageController::class, 'about'])->name('info.about');
Route::get('/struktur-organisasi', [PageController::class, 'structure'])->name('info.structure');
Route::get('/faq', [PageController::class, 'faq'])->name('info.faq');
Route::get('/syarat-ketentuan', [PageController::class, 'terms'])->name('info.terms');
Route::get('/kebijakan-privasi', [PageController::class, 'privacy'])->name('info.privacy');
Route::get('/hubungi-kami', [PageController::class, 'contact'])->name('info.contact');

Route::get('/media/foto', [MediaController::class, 'photos'])->name('media.photos');
Route::get('/media/video', [MediaController::class, 'videos'])->name('media.videos');

/*
|--------------------------------------------------------------------------
| ORGANIZATION - PUBLIC
|--------------------------------------------------------------------------
*/
// Public Organization Routes
Route::get('/organisasi', [PublicOrganizationController::class, 'index'])->name('organizations.index');
Route::get('/organisasi/{organization:slug}', [PublicOrganizationController::class, 'show'])->name('organizations.show');

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
| CAREER & PROFESSIONAL - PUBLIC
|--------------------------------------------------------------------------
*/
Route::get('/lowongan-kerja', [JobVacancyController::class, 'index'])->name('jobs.index');
Route::get('/lowongan-kerja/{vacancy:slug}', [JobVacancyController::class, 'show'])->name('jobs.show');

Route::get('/beasiswa', [ScholarshipController::class, 'index'])->name('scholarships.index');
Route::get('/beasiswa/{scholarship:slug}', [ScholarshipController::class, 'show'])->name('scholarships.show');

Route::get('/kemitraan', [PartnershipController::class, 'index'])->name('partnerships.index');
Route::get('/kemitraan/{partnership:slug}', [PartnershipController::class, 'show'])->name('partnerships.show');

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

/*
|--------------------------------------------------------------------------
| RAPIKAN DASHBOARD REDIRECT
|--------------------------------------------------------------------------
*/
    Route::get('/dashboard', function () {
        $user = auth()->user();

        if (! $user) {
            abort(403);
        }

        return match ($user->role) {
            'admin'  => redirect()->route('dashboard.admin'),
            'editor' => redirect()->route('dashboard.editor'),
            'writer' => redirect()->route('dashboard.writer'),
            default  => redirect()->route('dashboard.subscriber'),
        };
    })->middleware('auth')->name('dashboard');

/*
|--------------------------------------------------------------------------
| SAMPAI SINI
|--------------------------------------------------------------------------
*/

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
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

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
    | ADMIN - ORGANIZATIONS
    |--------------------------------------------------------------------------
    */
    Route::prefix('dashboard/admin')
        ->middleware('role:admin')
        ->name('dashboard.admin.')
        ->group(function () {
            Route::resource('organizations', DashboardOrganizationController::class);
            Route::resource('organizations.members', OrganizationMemberController::class)->shallow();
            Route::post('organizations/{organization}/members/reorder', [OrganizationMemberController::class, 'reorder'])->name('organizations.members.reorder');
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
            Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
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
    | JOBS, SCHOLARSHIPS, PARTNERSHIPS DASHBOARD
    |--------------------------------------------------------------------------
    */
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::post('jobs/{job}/approve', [JobVacancyDashboardController::class, 'approve'])->name('jobs.approve');
        Route::post('jobs/{job}/reject', [JobVacancyDashboardController::class, 'reject'])->name('jobs.reject');
        Route::resource('jobs', JobVacancyDashboardController::class);

        Route::post('scholarships/{scholarship}/approve', [ScholarshipDashboardController::class, 'approve'])->name('scholarships.approve');
        Route::post('scholarships/{scholarship}/reject', [ScholarshipDashboardController::class, 'reject'])->name('scholarships.reject');
        Route::resource('scholarships', ScholarshipDashboardController::class);

        Route::post('partnerships/{partnership}/approve', [PartnershipDashboardController::class, 'approve'])->name('partnerships.approve');
        Route::post('partnerships/{partnership}/reject', [PartnershipDashboardController::class, 'reject'])->name('partnerships.reject');
        Route::resource('partnerships', PartnershipDashboardController::class);
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

    /*
    |--------------------------------------------------------------------------
    | ADMIN / EDITOR - DATABASE ALUMNI
    |--------------------------------------------------------------------------
    */
    Route::prefix('dashboard')
        ->middleware('role:admin,editor')
        ->name('dashboard.')
        ->group(function () {
             Route::get('/database', [DatabaseController::class, 'index'])->name('database.index');
             Route::get('/database/{user}', [DatabaseController::class, 'show'])->name('database.show');

             /*
             |--------------------------------------------------------------------------
             | STATIC PAGES MANAGEMENT
             |--------------------------------------------------------------------------
             */
             Route::get('/pages', [StaticPageController::class, 'index'])->name('admin.pages.index');
             Route::get('/pages/{page}/edit', [StaticPageController::class, 'edit'])->name('admin.pages.edit');
             Route::put('/pages/{page}', [StaticPageController::class, 'update'])->name('admin.pages.update');
        });
});
