# 🎯 ROLE SYSTEM - QUICK REFERENCE

## Role Hierarchy (Pyramid of Permissions)

```
        👑 ADMIN
        ━━━━━━━━ Full Control
        ↑
        ✏️ EDITOR  
        ━━━━━━━━ Manage All Content
        ↑
        📝 WRITER
        ━━━━━━━━ Create Own Content
        ↑
        👤 SUBSCRIBER ← Default Role
        ━━━━━━━━ Read Only
```

---

## Permission Quick Check

| Aksi | Subscriber | Writer | Editor | Admin |
|------|:--:|:--:|:--:|:--:|
| Baca berita | ✅ | ✅ | ✅ | ✅ |
| Buat berita | ❌ | ✅ | ✅ | ✅ |
| Edit berita sendiri | ❌ | ✅ | ✅ | ✅ |
| Edit berita orang | ❌ | ❌ | ✅ | ✅ |
| Hapus berita | ❌ | ❌ | ✅ | ✅ |
| Kelola users | ❌ | ❌ | ❌ | ✅ |

---

## User Registration Flow

```
User Daftar
    ↓
System Create User
    ↓
role = 'subscriber' ← WAJIB DEFAULT
    ↓
Email Verification
    ↓
Profil Completion
    ↓
Home (Read-Only)
    ↓
Admin Promote? → Writer/Editor/Admin
```

---

## Admin Tasks

### Go to: `/admin/users`

### Available Actions:
1. **View All Users** - List dengan role
2. **Change Role** - Dropdown: Subscriber → Writer → Editor → Admin
3. **Delete User** - Dengan confirmation
4. **Bulk Delete** - Multiple users sekaligus
5. **View Stats** - Total per role

### Role Assignment:
```
Subscriber  → Writer    → Editor    → Admin
(Default)    (Promote)   (Promote)   (Promote)
             (Creator)   (Manager)   (Full Access)
```

---

## Code Reference

### Check Permission (PHP)

```php
$user = Auth::user();

// Check specific role:
if ($user->role === 'admin') { ... }

// Check permission level:
if ($user->isEditor()) { ... }      // editor + admin
if ($user->isWriter()) { ... }      // writer + editor + admin
if ($user->isAdmin()) { ... }       // admin only
if ($user->isSubscriber()) { ... }  // subscriber only
```

### Set Default Role (Create New User)

```php
// app/Actions/Fortify/CreateNewUser.php
return User::create([
    'role' => 'subscriber',  // ← WAJIB ini
]);
```

### Validate Role

```php
// app/Http/Controllers/Admin/UserController.php
$request->validate([
    'role' => 'required|in:subscriber,writer,editor,admin',
]);
```

---

## Common Scenarios

### Scenario 1: New User Registers
```
✓ Sistem auto-assign role = 'subscriber'
✓ User dapat membaca berita
✓ User tidak bisa buat/edit berita
✓ Admin promote nanti jika dibutuhkan
```

### Scenario 2: Promote to Writer
```
1. Go to /admin/users
2. Find user
3. Change dropdown dari 'subscriber' → 'writer'
4. User sekarang bisa buat & edit berita sendiri
```

### Scenario 3: Promote to Editor
```
1. Go to /admin/users
2. Find writer
3. Change dropdown dari 'writer' → 'editor'
4. User sekarang bisa manage semua berita
```

### Scenario 4: Demote Writer
```
1. Go to /admin/users
2. Find user
3. Change dropdown dari 'writer' → 'subscriber'
4. User kembali read-only, berita tetap di DB
```

---

## Key Files Modified

| File | Changes |
|------|---------|
| `app/Actions/Fortify/CreateNewUser.php` | Default role = 'subscriber' |
| `app/Models/User.php` | Added role helpers (isSubscriber, isWriter, isEditor, isAdmin) |
| `app/Http/Controllers/NewsController.php` | Updated permission checks |
| `app/Http/Controllers/Admin/UserController.php` | Updated validation rules |
| `resources/js/Pages/Admin/Users/Index.tsx` | Added subscriber to role selector |

---

## Troubleshooting

### Problem: User bisa buat berita padahal subscriber

**Solution:**
1. Go to `/admin/users`
2. Check role di database (should be 'subscriber')
3. Verify NewsController permission checks

### Problem: Admin tidak muncul di role dropdown

**Solution:**
1. Check `UserController@update` validation rules
2. Ensure validation includes: `in:subscriber,writer,editor,admin`

### Problem: New user mendapat role admin

**Solution:**
1. Check `CreateNewUser.php` - should set `'role' => 'subscriber'`
2. Verify tidak ada override di sebelah tempat

### Problem: Writer bisa edit berita orang lain

**Solution:**
1. Check NewsController `edit()` method
2. Should check: `if ($user->isWriter() && !$user->isEditor())`

---

## Testing Role System

### Quick Test (Artisan Tinker):

```bash
php artisan tinker

# Test role hierarchy:
$user = new User(); 
$user->role = 'subscriber';
$user->isSubscriber();  // true
$user->isWriter();      // false

$user->role = 'editor';
$user->isEditor();      // true
$user->isWriter();      // true (editor includes writer)
$user->isSubscriber();  // false
```

---

## Performance Tips

✅ **Good:**
- Use `$user->isEditor()` instead of `$user->role === 'editor' || $user->role === 'admin'`
- Cache role checks jika banyak query
- Use middleware untuk protect routes

❌ **Bad:**
- Hardcoding role strings di controller
- Checking role di blade/react tanpa backend validation
- Forgetting to protect sensitive routes

---

## Status

✅ **IMPLEMENTED & TESTED**

- Default role system: subscriber
- Role hierarchy: working
- Admin UI: responsive & functional
- Permission checks: updated
- Helper methods: operational

---

**Last Updated:** Jan 19, 2026  
**For Details:** See ROLE_SYSTEM_GUIDE.md
