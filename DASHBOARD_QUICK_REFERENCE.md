# Multi-Role Dashboard - Quick Reference Guide

## 🎯 Quick Start - 5 Minute Setup

### 1. Run Migrations
```bash
php artisan migrate
```

### 2. Build Frontend
```bash
npm run build
```

### 3. Test Dashboards

**Via Routes:**
- Subscriber: `http://localhost:8000/dashboard/subscriber`
- Admin: `http://localhost:8000/dashboard/admin`
- Editor: `http://localhost:8000/dashboard/editor`
- Writer: `http://localhost:8000/dashboard/writer`

**Login as different roles:**
```php
// In tinker or seeder
$user = User::find(1);
$user->role = 'subscriber'; // or admin, editor, writer
$user->save();
```

---

## 📂 File Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Dashboard/
│   │   │   ├── DashboardController.php
│   │   │   ├── LegalizationAdminController.php
│   │   │   └── NotificationController.php
│   │   └── ...
│   └── Middleware/
│       └── EnsureUserRole.php
├── Models/
│   ├── User.php (updated)
│   ├── Legalization.php (existing)
│   └── Notification.php (new)
└── ...

database/
├── migrations/
│   ├── 2026_01_20_100001_add_dashboard_columns.php
│   ├── 2026_01_20_100002_create_notifications_table.php
│   └── ...
└── ...

resources/
└── js/
    ├── components/
    │   ├── DashboardLayout.tsx
    │   └── LegalizationForm.tsx
    └── Pages/
        └── Dashboard/
            ├── Subscriber.tsx
            ├── Admin.tsx
            ├── Editor.tsx
            ├── Writer.tsx
            └── Admin/
                ├── Legalizations.tsx
                └── LegalizationDetail.tsx

routes/
├── web.php (updated)
└── ...
```

---

## 🔄 User Flow

### Subscriber (Alumni) - Legalization Flow
```
1. Homepage → Klik CTA "Legalisir Online"
   ↓
2. Redirect ke /dashboard/subscriber (if logged in)
   ↓
3. Klik "Ajukan Legalisir Baru"
   ↓
4. Fill form + upload dokumen
   ↓
5. Submit → Status: "Pending"
   ↓
6. Admin review di /dashboard/admin/legalizations
   ↓
7. Admin approve → Notification sent
   ↓
8. User download dokumen di /dashboard/subscriber
```

### Admin - Review Flow
```
1. /dashboard/admin → View all legalizations
   ↓
2. Filter/search by user, status, date
   ↓
3. Klik "Review" on legalization
   ↓
4. View detail + documents
   ↓
5. Approve/Reject dengan catatan
   ↓
6. Notification automatically sent to user
   ↓
7. User menerima notifikasi di bell icon
```

---

## 🔐 Route Protection

### Middleware Usage
```php
// In routes/web.php

// Only Subscriber can access
Route::get('/dashboard/subscriber', ...)
    ->middleware('role:subscriber');

// Only Admin can access
Route::get('/dashboard/admin', ...)
    ->middleware('role:admin');

// Multiple roles
Route::get('/admin/news', ...)
    ->middleware('role:admin,editor,writer');
```

### Middleware Check
```php
// In Kernel.php - Already registered
protected $routeMiddleware = [
    'role' => \App\Http\Middleware\RoleMiddleware::class,
];
```

---

## 📊 Dashboard Routes Reference

### Subscriber Routes
```
GET  /dashboard/subscriber              Subscriber Dashboard
GET  /legalization                      Old legalization list
GET  /legalization/create               Create form
POST /legalization                      Store submission
GET  /legalization/{id}                 View detail
POST /legalization/{id}/upload          Upload document
```

### Admin Routes
```
GET  /dashboard/admin                              Admin Dashboard
GET  /dashboard/admin/legalizations                List all
GET  /dashboard/admin/legalizations/{id}          Detail
POST /dashboard/admin/legalizations/{id}/approve  Approve
POST /dashboard/admin/legalizations/{id}/reject   Reject
POST /dashboard/admin/legalizations/{id}/note     Update note
```

### Editor Routes
```
GET  /dashboard/editor                 Editor Dashboard
GET  /admin/news                        News list
GET  /admin/news/create                Create new
POST /admin/news                        Store
GET  /admin/news/{slug}/edit           Edit
PUT  /admin/news/{slug}                Update
DELETE /admin/news/{slug}              Delete
```

### Writer Routes
```
GET  /dashboard/writer                 Writer Dashboard
GET  /admin/news                        My articles
GET  /admin/news/create                Create new
POST /admin/news                        Store
GET  /admin/news/{slug}/edit           Edit
PUT  /admin/news/{slug}                Update
```

### Notification API
```
GET  /api/notifications                 List notifications
GET  /api/notifications/unread-count   Unread count
POST /api/notifications/{id}/read      Mark as read
POST /api/notifications/mark-all-as-read Mark all as read
DELETE /api/notifications/{id}         Delete
```

---

## 🔔 Notification System

### Create Notification (Automatic)
```php
// In LegalizationAdminController.php

Notification::create([
    'user_id' => $legalization->user_id,
    'title' => 'Pengajuan Legalisir Disetujui',
    'message' => 'Pengajuan Anda telah disetujui',
    'type' => 'success',
    'action_url' => route('dashboard.subscriber'),
    'action_label' => 'Lihat Dashboard',
    'related_id' => $legalization->id,
    'related_type' => 'legalization',
]);
```

### Get User Notifications (in Controller)
```php
$notifications = auth()->user()->notifications()
    ->orderBy('created_at', 'desc')
    ->paginate(20);

// Or unread only
$unread = Notification::unreadForUser(auth()->id());

// Get count
$count = auth()->user()->unreadNotificationsCount();
```

### Mark as Read
```php
// Mark single
$notification->markAsRead();

// Mark all
Notification::where('user_id', auth()->id())
    ->whereNull('read_at')
    ->update(['read_at' => now()]);
```

---

## 💻 Component Usage Examples

### DashboardLayout
```tsx
import { DashboardLayout } from '@/components/DashboardLayout';

export default function MyDashboard({ user, notifications, stats }) {
  return (
    <DashboardLayout
      user={user}
      notifications={notifications}
      title="My Dashboard"
      stats={stats}
    >
      {/* Your content here */}
    </DashboardLayout>
  );
}
```

### LegalizationForm
```tsx
import LegalizationForm from '@/components/LegalizationForm';

export default function CreateLegalization() {
  return (
    <form>
      <LegalizationForm />
    </form>
  );
}
```

---

## 📋 Status Badges

### Available Statuses
```
approved  → Green badge "Disetujui"
pending   → Yellow badge "Menunggu"
rejected  → Red badge "Ditolak"
draft     → Gray badge "Konsep"
published → Green badge "Dipublikasikan"
```

### Usage in Components
```tsx
import { getStatusColor, getStatusBadge } from '@/components/DashboardLayout';

<span className={`px-3 py-1 rounded-full border ${getStatusColor(status)}`}>
  {getStatusBadge(status)}
</span>
```

---

## 🧪 Testing Checklist

### Subscriber Account
- [ ] Access /dashboard/subscriber
- [ ] See statistics
- [ ] Create new legalization
- [ ] Upload documents
- [ ] View pending status
- [ ] Receive notification when approved
- [ ] Download approved document

### Admin Account
- [ ] Access /dashboard/admin
- [ ] See all statistics
- [ ] Filter legalizations by status
- [ ] Search by user name/email
- [ ] View legalization detail
- [ ] Download documents
- [ ] Approve with note
- [ ] Reject with reason
- [ ] Update admin note
- [ ] Verify notification sent

### Editor Account
- [ ] Access /dashboard/editor
- [ ] See content statistics
- [ ] Create new article
- [ ] Edit articles
- [ ] Publish articles
- [ ] View article list

### Writer Account
- [ ] Access /dashboard/writer
- [ ] See my articles
- [ ] Create new article
- [ ] Submit for review
- [ ] Edit my articles
- [ ] See pending status

---

## 🐛 Common Issues & Solutions

### Issue: Dashboard blank/404
**Solution:**
```bash
php artisan migrate
npm run build
php artisan cache:clear
```

### Issue: "Unauthorized" error
**Solution:**
- Check user role in database: `select * from users;`
- Verify middleware in routes/web.php
- Check Kernel.php middleware registration

### Issue: Notifications not showing
**Solution:**
```bash
# Check table exists
php artisan migrate
# Check data
php artisan tinker
>>> Notification::all()
```

### Issue: File upload fails
**Solution:**
```bash
# Fix permissions
chmod -R 755 storage/
# Verify disk config
cat config/filesystems.php
```

### Issue: React component error
**Solution:**
```bash
npm run dev  # Development build
npm run build  # Production build
php artisan view:cache --forget
```

---

## 📈 Statistics Tracked

### Subscriber Dashboard
- Total submissions
- Pending count
- Approved count
- Rejected count

### Admin Dashboard
- Total submissions
- Pending count
- Approved count
- Rejected count
- Total users
- Writers count
- Editors count
- Recent activities

### Editor Dashboard
- Total articles
- Draft count
- Pending count
- Published count

### Writer Dashboard
- Total articles
- Draft count
- Pending count
- Published count

---

## 🔗 Important Links

### Files Created/Modified
1. Migrations (2 new files)
2. Models: `User.php`, `Notification.php`
3. Controllers (3 new files in Dashboard/)
4. Routes: `routes/web.php` (updated)
5. React Components (8 new files)

### Key Model Methods
```php
// User model
$user->legalizations()           // All legalizations
$user->notifications()            // All notifications
$user->unreadNotificationsCount() // Count unread
$user->isAdmin()                 // Check role
$user->isEditor()                // Check role
$user->isWriter()                // Check role
$user->isSubscriber()            // Check role

// Notification model
$notification->markAsRead()       // Mark as read
$notification->isRead()          // Check if read
Notification::unreadForUser($id) // Get unread
```

---

## 🎨 Styling Reference

### Color Scheme
- Primary: Blue-600 (#2563eb)
- Success: Green-600 (#16a34a)
- Danger: Red-600 (#dc2626)
- Warning: Yellow-600 (#ca8a04)
- Neutral: Gray-700 (#374151)

### Typography
- Headings: Bold, larger sizes
- Body: Regular, gray-900
- Muted: Gray-600/gray-500
- Links: Blue-600 with hover effect

### Components
- Cards: White bg, gray-200 border, shadow-sm
- Buttons: Rounded, padding px-4 py-2
- Forms: Input/textarea with border, focus ring
- Tables: Striped rows, hover effect

---

## 📞 Quick Support

**For migrations issues:**
```bash
php artisan migrate:fresh
php artisan migrate
```

**For frontend issues:**
```bash
npm install
npm run build
```

**For cache issues:**
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:cache --forget
```

**Check everything:**
```bash
php artisan tinker
>>> User::where('role', 'admin')->first()
>>> Notification::count()
>>> route('dashboard.subscriber')
```
