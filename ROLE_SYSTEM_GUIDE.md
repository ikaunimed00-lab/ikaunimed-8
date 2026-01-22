# 👥 Role System Guide - Portal Berita IKA UNIMED

## Overview

Sistem role yang diperbaiki dengan logika hirarki yang jelas:

```
Subscriber → Writer → Editor → Admin
    ↓          ↓         ↓        ↓
 Read-Only  Create   Manage   Full Control
```

---

## 📊 Role Hierarchy & Permissions

### 1️⃣ **SUBSCRIBER** (Default untuk User Baru)
**Status:** Hanya baca berita  
**Dibuat oleh:** Sistem otomatis saat user register

#### Permissions:
- ✅ Membaca berita di portal (public)
- ✅ Membaca berita di dashboard (published)
- ❌ Membuat berita
- ❌ Mengedit berita
- ❌ Menghapus berita
- ❌ Mengakses admin panel
- ❌ Mengelola user

#### Access:
```
GET  /news              (Read published news)
GET  /news/{slug}       (View news detail)
GET  /dashboard         (Redirect ke home)
```

---

### 2️⃣ **WRITER** (Promoted by Admin)
**Status:** Penulis / Kontributor berita  
**Diberikan oleh:** Admin melalui User Management

#### Permissions:
- ✅ Semua permissions Subscriber
- ✅ Membuat berita baru
- ✅ Mengedit berita milik sendiri
- ✅ Melihat semua berita di dashboard (hanya milik sendiri)
- ❌ Mengedit berita orang lain
- ❌ Menghapus berita
- ❌ Mengelola user
- ❌ Publish berita (status draft/scheduled)

#### Access:
```
GET    /admin/news                    (Lihat berita sendiri)
GET    /admin/news/create             (Form buat berita)
POST   /admin/news                    (Store berita baru)
GET    /admin/news/{id}/edit          (Edit form - milik sendiri)
PUT    /admin/news/{id}               (Update - milik sendiri)
DELETE /admin/news/{id}               (Forbidden)
```

---

### 3️⃣ **EDITOR** (Promoted by Admin)
**Status:** Editor / Manajer konten  
**Diberikan oleh:** Admin melalui User Management

#### Permissions:
- ✅ Semua permissions Writer
- ✅ Mengedit semua berita (orang lain)
- ✅ Menghapus berita
- ✅ Publish/schedule berita
- ✅ Melihat dashboard lengkap
- ✅ Melihat semua berita
- ❌ Mengelola user
- ❌ Mengubah role user

#### Access:
```
GET    /admin/news                    (Lihat semua berita)
GET    /admin/news/create
POST   /admin/news
GET    /admin/news/{id}/edit          (Edit semua berita)
PUT    /admin/news/{id}               (Update semua berita)
DELETE /admin/news/{id}               (Delete allowed)
GET    /dashboard                     (Full dashboard)
```

---

### 4️⃣ **ADMIN** (System Administrator)
**Status:** Administrator sistem  
**Diberikan oleh:** Database seeding atau manual

#### Permissions:
- ✅ Semua permissions Editor
- ✅ Mengelola user (create, update, delete)
- ✅ Mengubah role user (subscriber ↔ writer ↔ editor ↔ admin)
- ✅ Melihat statistik user
- ✅ Bulk delete user
- ✅ Semua akses admin panel

#### Access:
```
GET    /admin/users                   (List all users)
PUT    /admin/users/{id}              (Update user role)
DELETE /admin/users/{id}              (Delete user)
POST   /admin/users/bulk-destroy      (Bulk delete)

PLUS: Semua akses Editor
```

---

## 🔧 Implementation Details

### Default Role Assignment

**File:** `app/Actions/Fortify/CreateNewUser.php`

```php
return User::create([
    'name'     => $input['name'],
    'email'    => $input['email'],
    'password' => Hash::make($input['password']),
    'role'     => 'subscriber',  // ← Default role
]);
```

### Role Helper Methods

**File:** `app/Models/User.php`

```php
$user->isSubscriber();  // Hanya subscriber?
$user->isWriter();      // Writer + Editor + Admin
$user->isEditor();      // Editor + Admin
$user->isAdmin();       // Hanya admin?

// Usage:
if ($user->isEditor()) {
    // Editors & admins dapat masuk sini
}

if (!$user->isEditor()) {
    // Only non-editors (subscriber & writer)
}
```

### Role Validation

**File:** `app/Http/Controllers/Admin/UserController.php`

```php
$request->validate([
    'role' => 'required|in:subscriber,writer,editor,admin',
]);
```

Available roles untuk assignment:
- `subscriber` - Default, hanya baca
- `writer` - Penulis konten
- `editor` - Editor/manajer
- `admin` - Administrator

---

## 👨‍💼 User Management Flow

### 1. User Baru Mendaftar
```
Register Form → Sistem Create User with role='subscriber' → 
Email Verification → Profile Completion → Home (read-only)
```

### 2. Admin Promote ke Writer
```
Admin Panel → Manage Users → Select User → Change Role to 'writer' 
→ User sekarang bisa create & edit berita sendiri
```

### 3. Admin Promote ke Editor
```
Admin Panel → Manage Users → Select User → Change Role to 'editor' 
→ User sekarang bisa manage semua berita
```

### 4. Admin Promote ke Admin
```
Admin Panel → Manage Users → Select User → Change Role to 'admin' 
→ User sekarang punya full access
```

### 5. Admin Demote Role
```
Admin Panel → Manage Users → Select User → Change Role to lower role 
→ User permissions berkurang
```

---

## 🎯 Role Assignment Best Practices

### ✅ Best Practices

1. **Default ke Subscriber**
   - Semua user baru otomatis subscriber
   - Aman dan scalable
   - Admin kontrol promosi

2. **Promote Based on Merit**
   - Review kualitas artikel writer sebelum promote ke editor
   - Confirm kontribusi konsisten
   - Assess responsibility

3. **Clear Communication**
   - Notify user saat role berubah
   - Jelaskan permissions baru
   - Provide onboarding untuk new role

4. **Monitor Usage**
   - Check admin panel untuk track role distribution
   - Ensure writer quality
   - Balance editor workload

### ❌ Anti-Patterns

1. ❌ **Give Writer Access on Register**
   - Risikonya: Spam, low-quality content
   - Solusi: Verify dulu, baru promote

2. ❌ **Direct Admin Access**
   - Risikonya: Security breach
   - Solusi: Promote to editor dulu

3. ❌ **No Permission Checks**
   - Risikonya: Users bypass restrictions
   - Solusi: Implement proper authorization

---

## 📱 Admin Panel - User Management

**URL:** `/admin/users`

### Features:
1. **User List**
   - Total user count
   - Sort by name
   - Search user

2. **Role Dropdown**
   - Subscriber (👤) - Read-only
   - Writer (📝) - Create/edit own
   - Editor (✏️) - Manage all
   - Admin (👑) - Full control

3. **Role Statistics**
   - Count by role
   - Visual indicators
   - Permission descriptions

4. **Bulk Actions**
   - Select multiple users
   - Bulk delete
   - Confirmation modal

5. **User Actions**
   - Individual delete
   - Edit role (dropdown)
   - Quick change

---

## 🔐 Permission Matrix

| Action | Subscriber | Writer | Editor | Admin |
|--------|:----------:|:------:|:------:|:-----:|
| View News | ✅ | ✅ | ✅ | ✅ |
| Create News | ❌ | ✅ | ✅ | ✅ |
| Edit Own News | ❌ | ✅ | ✅ | ✅ |
| Edit All News | ❌ | ❌ | ✅ | ✅ |
| Delete News | ❌ | ❌ | ✅ | ✅ |
| Publish News | ❌ | ❌ | ✅ | ✅ |
| Access Dashboard | ❌ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ✅ |
| Change Roles | ❌ | ❌ | ❌ | ✅ |
| Delete Users | ❌ | ❌ | ❌ | ✅ |

---

## 🚀 Database Schema

### Users Table - Role Column

```sql
ALTER TABLE users ADD COLUMN role VARCHAR(20) 
  DEFAULT 'subscriber'
  CHECK (role IN ('subscriber', 'writer', 'editor', 'admin'));
```

**Current values in DB:**
- `subscriber` - Default member
- `writer` - Content creator
- `editor` - Content manager
- `admin` - System administrator
- `alumni` - *DEPRECATED* (migrated to `subscriber`)

---

## 🔄 Role Migration from Old System

If you have existing users with `alumni` role:

```bash
# Migration command (jika diperlukan):
php artisan tinker

# Then in tinker:
User::where('role', 'alumni')->update(['role' => 'subscriber']);
```

---

## 📝 Changelog

### v1.0 (Current)
- ✅ Fixed default role to `subscriber` (was `alumni`)
- ✅ Added role hierarchy: subscriber → writer → editor → admin
- ✅ Updated permission checks in NewsController
- ✅ Enhanced admin User Management UI
- ✅ Added role helper methods in User model
- ✅ Updated role validation rules

### Future Enhancements
- [ ] Email notification saat role change
- [ ] Role approval workflow (tidak auto promote)
- [ ] Custom permissions per role
- [ ] Audit log untuk role changes
- [ ] Role-based news category access
- [ ] Department-based role assignment

---

## 💡 Usage Examples

### Check User Permission

```php
// In controller or model:
$user = Auth::user();

// Check specific role
if ($user->role === 'admin') {
    // Only admins
}

// Check permission level
if ($user->isEditor()) {
    // Editors & admins
}

if ($user->isWriter()) {
    // Writers & editors & admins
}

if ($user->isSubscriber()) {
    // Only subscribers
}
```

### Protect Route

```php
// In route:
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'show'])
        ->middleware('role:editor,admin');  // ← Use policy/middleware
});
```

### In Blade/React

```tsx
// In React component:
if (user.role === 'admin') {
    return <AdminPanel />;
}

if (user.isEditor) {
    return <EditorPanel />;
}

return <UserPanel />;
```

---

## ✅ Verification Checklist

- [x] Default role untuk new users = `subscriber`
- [x] Admin bisa change role via User Management
- [x] Role dropdown shows: subscriber, writer, editor, admin
- [x] Permission checks updated di NewsController
- [x] Role hierarchy: subscriber < writer < editor < admin
- [x] Helper methods di User model working
- [x] Validation rules updated
- [x] UI shows subscriber count & info

---

## 📞 Support & Questions

For questions about:
- **Permission checks:** Check NewsController `isEditor()` calls
- **Role assignment:** Go to `/admin/users`
- **Helper methods:** Check `app/Models/User.php`
- **Default role:** Check `app/Actions/Fortify/CreateNewUser.php`

---

**Status:** ✅ Production Ready  
**Last Updated:** January 19, 2026  
**Maintained By:** Portal Berita Team
