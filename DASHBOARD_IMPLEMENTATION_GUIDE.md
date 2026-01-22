# Multi-Role Dashboard Implementation Guide

Panduan lengkap implementasi multi-role dashboard untuk website ikaunimed.or.id dengan Laravel 12 + Inertia + React + Tailwind.

## 📋 Ringkasan Implementasi

### File yang Dibuat

#### 1. **Migrations**
- `database/migrations/2026_01_20_100001_add_dashboard_columns.php` - Kolom dashboard di users table
- `database/migrations/2026_01_20_100002_create_notifications_table.php` - Tabel notifikasi

#### 2. **Models**
- `app/Models/Notification.php` - Model untuk notifikasi

#### 3. **Middleware**
- `app/Http/Middleware/EnsureUserRole.php` - Middleware untuk validasi role (sudah ada)

#### 4. **Controllers**
- `app/Http/Controllers/Dashboard/DashboardController.php` - Controller untuk 4 dashboard
- `app/Http/Controllers/Dashboard/LegalizationAdminController.php` - Admin legalization management
- `app/Http/Controllers/Dashboard/NotificationController.php` - Notification management

#### 5. **Routes**
- Updated `routes/web.php` dengan dashboard routes baru

#### 6. **React Components**
- `resources/js/components/DashboardLayout.tsx` - Shared layout dengan notification bell
- `resources/js/components/LegalizationForm.tsx` - Reusable legalization form
- `resources/js/Pages/Dashboard/Subscriber.tsx` - Subscriber dashboard
- `resources/js/Pages/Dashboard/Admin.tsx` - Admin dashboard
- `resources/js/Pages/Dashboard/Editor.tsx` - Editor dashboard
- `resources/js/Pages/Dashboard/Writer.tsx` - Writer dashboard
- `resources/js/Pages/Dashboard/Admin/Legalizations.tsx` - Admin legalization listing
- `resources/js/Pages/Dashboard/Admin/LegalizationDetail.tsx` - Admin legalization detail

## 🚀 Langkah Implementasi

### Step 1: Jalankan Migrations
```bash
php artisan migrate
```

### Step 2: Update User Model (Sudah Dilakukan)
User model sudah diupdate dengan:
- Relationship ke Notification
- Relationship ke Legalization
- Methods untuk pengecekan role

### Step 3: Register Routes (Sudah Dilakukan)
Routes sudah terdaftar di `routes/web.php`:
- `/dashboard/subscriber` - Subscriber dashboard
- `/dashboard/admin` - Admin dashboard
- `/dashboard/editor` - Editor dashboard
- `/dashboard/writer` - Writer dashboard
- `/api/notifications/*` - Notification API endpoints

### Step 4: Setup Notification System
Notifikasi secara otomatis dibuat saat:
- Admin approve legalization
- Admin reject legalization
- Legalization status berubah

### Step 5: Build Frontend
```bash
npm run build
# atau untuk development
npm run dev
```

## 📊 Dashboard Overview

### 1. **Subscriber Dashboard** (`/dashboard/subscriber`)
**Fitur:**
- ✅ Riwayat pengajuan legalisir dengan status
- ✅ Form untuk ajukan legalisir baru
- ✅ Download dokumen yang sudah approved
- ✅ Melihat catatan dari admin
- ✅ Notifikasi real-time saat status berubah
- ✅ Statistics: total, pending, approved, rejected

**Role Access:** subscriber

### 2. **Admin Dashboard** (`/dashboard/admin`)
**Fitur:**
- ✅ Kelola semua pengajuan legalisir
- ✅ Filter by status, search user, date range
- ✅ Review detail pengajuan + download dokumen
- ✅ Approve/Reject dengan catatan
- ✅ Send automatic notification ke user
- ✅ Statistics lengkap
- ✅ Recent activities log
- ✅ Quick access ke user management

**Role Access:** admin

**Sub Routes:**
- `/dashboard/admin/legalizations` - List all legalizations
- `/dashboard/admin/legalizations/{id}` - Detail & approve/reject

### 3. **Editor Dashboard** (`/dashboard/editor`)
**Fitur:**
- ✅ Kelola semua konten/berita
- ✅ Edit draft menjadi published
- ✅ Statistics konten (draft, pending, published)
- ✅ Linked dengan system berita yang ada

**Role Access:** editor

### 4. **Writer Dashboard** (`/dashboard/writer`)
**Fitur:**
- ✅ Kelola artikel yang dibuat sendiri
- ✅ Submit artikel untuk direview
- ✅ Track status artikel (draft, pending, published)
- ✅ Writing tips

**Role Access:** writer

## 🔐 Role-Based Access Control

### Role Hierarchy
```
subscriber ← writer ← editor ← admin
```

### Permissions per Role

| Feature | Subscriber | Writer | Editor | Admin |
|---------|-----------|--------|--------|-------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Create Legalization | ✅ | - | - | - |
| View Own Legalization | ✅ | - | - | - |
| Create Article | - | ✅ | ✅ | ✅ |
| Edit Own Article | - | ✅ | ✅ | ✅ |
| Edit All Article | - | - | ✅ | ✅ |
| Approve Legalization | - | - | - | ✅ |
| Manage Users | - | - | - | ✅ |

## 📡 API Endpoints

### Notifications API
```
GET  /api/notifications                    - Get all notifications
GET  /api/notifications/unread-count      - Get unread count
POST /api/notifications/{id}/read         - Mark as read
POST /api/notifications/mark-all-as-read  - Mark all as read
DELETE /api/notifications/{id}            - Delete notification
```

### Admin Legalization API
```
GET    /dashboard/admin/legalizations              - List all
GET    /dashboard/admin/legalizations/{id}        - Show detail
POST   /dashboard/admin/legalizations/{id}/approve - Approve
POST   /dashboard/admin/legalizations/{id}/reject  - Reject
POST   /dashboard/admin/legalizations/{id}/note    - Update note
```

## 🔔 Notification System

### Notification Types
1. **Success** (Legalization Approved)
   - Title: "Pengajuan Legalisir Disetujui"
   - Message: Instruksi download dokumen
   - Action: Link ke dashboard

2. **Error** (Legalization Rejected)
   - Title: "Pengajuan Legalisir Ditolak"
   - Message: Alasan penolakan
   - Action: Link ke dashboard

### Automatic Notifications
- ✅ Sent saat legalization di-approve
- ✅ Sent saat legalization di-reject
- ✅ User bisa melihat di notification bell

## 🎨 UI Components

### DashboardLayout
Komponen shared untuk semua dashboard:
- Header dengan user info & notification bell
- Statistics cards
- Responsive design
- Tailwind styling

### LegalizationForm
Form reusable untuk legalization:
- Multi-file upload
- Validation
- Progress tracking
- Error handling

### Notification Bell
- Show unread count
- List recent notifications
- Mark as read
- Delete functionality

## 🧪 Testing Dashboard

### Test Subscriber
1. Login dengan role `subscriber`
2. Navigate ke `/dashboard/subscriber`
3. Klik "Ajukan Legalisir Baru"
4. Isi form dan submit
5. Lihat status "Pending" di dashboard

### Test Admin
1. Login dengan role `admin`
2. Navigate ke `/dashboard/admin`
3. Klik review pengajuan dari subscriber
4. Approve atau reject
5. Lihat notification di subscriber dashboard

### Test Editor
1. Login dengan role `editor`
2. Navigate ke `/dashboard/editor`
3. Kelola konten/berita

### Test Writer
1. Login dengan role `writer`
2. Navigate ke `/dashboard/writer`
3. Buat artikel baru

## ⚙️ Configuration

### User Roles
Di database users table, setiap user memiliki `role`:
- `subscriber` - User biasa (alumni)
- `writer` - Pembuat konten
- `editor` - Editor konten
- `admin` - Administrator

### Middleware
Semua dashboard route dilindungi dengan middleware `role`:
```php
Route::middleware('role:subscriber')->get('/dashboard/subscriber', ...)
```

## 🔗 Integration dengan Sistem Existing

### Existing Systems yang Diintegrasikan
1. **Legalization System** (sudah ada)
   - Use existing `Legalization` model
   - Use existing `LegalizationFile` model
   - Use existing routes untuk file management

2. **News/Article System** (sudah ada)
   - Use existing `News` model
   - Use existing routes untuk CRUD
   - Editor/Writer dashboard connect ke existing system

3. **User System** (sudah ada)
   - Use existing `User` model
   - Use existing authentication
   - Add new notifications relationship

4. **OAuth System** (sudah ada)
   - Redirect ke dashboard sesuai role setelah login

## 📝 Next Steps

### Optional Enhancements
1. **Email Notifications**
   - Send email saat status legalization berubah
   - Implement Notification channels

2. **Real-time Updates**
   - Implement Laravel Echo untuk live notifications
   - WebSocket integration

3. **Advanced Filtering**
   - More complex filters di admin dashboard
   - Export to PDF/Excel

4. **Analytics**
   - Dashboard analytics untuk admin
   - Submission statistics

5. **Bulk Operations**
   - Bulk approve/reject legalization
   - Bulk notifications

## 🐛 Troubleshooting

### Dashboard tidak muncul
- Pastikan migrations sudah dijalankan: `php artisan migrate`
- Pastikan middleware `role` terdaftar di Kernel
- Check user role di database

### Notification tidak muncul
- Check notifications table di database
- Pastikan `Notification` model tersimpan
- Verify relationship di User model

### File upload gagal
- Check storage permissions: `chmod -R 755 storage/`
- Verify file size limit di .env
- Check disk configuration di config/filesystems.php

### React component error
- Build frontend: `npm run build`
- Clear cache: `npm run dev`
- Check console errors di browser DevTools

## 📞 Support

Untuk pertanyaan atau issues:
1. Check documentation di folder ini
2. Review existing implementation
3. Check Laravel/Inertia documentation
4. Review React component patterns

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
