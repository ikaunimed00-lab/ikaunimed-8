# 🎯 Sistem Alumni IKA UNIMED - Arsitektur Baru

**Status:** ✅ IMPLEMENTASI LENGKAP  
**Tanggal Update:** 18 Januari 2026

---

## 📋 Ringkasan Perubahan

Sistem telah distruktur ulang dengan pemisahan yang jelas antara **Authentication**, **Profile Management**, dan **Legalization Process**. Alumni hanya mengisi data sekali, dan data tersebut reusable untuk semua layanan.

---

## 🏗️ Arsitektur Sistem

### **ALUR LENGKAP**

```
┌─────────────────────────────────────────────────────────────┐
│  1. HOMEPAGE (/)                                             │
│  ├─ Menampilkan tombol "DAFTAR" & "MASUK"                  │
│  └─ Info fitur legalisir & data alumni                      │
└──────────────┬──────────────────────────────────────────────┘
               │
        ┌──────▼──────┐
        │  User Login │
        └──────┬──────┘
               │
        ┌──────▼────────────────────────────────────────┐
        │ 2. REGISTER PAGE (/register)                  │
        │ ├─ Email & Password SAJA                      │
        │ ├─ Validasi: email unique, password match     │
        │ ├─ Create User (role: alumni)                 │
        │ └─ Redirect → Profile Edit                    │
        └──────┬────────────────────────────────────────┘
               │
        ┌──────▼─────────────────────────────────────────────┐
        │ 3. ALUMNI PROFILE EDIT (/profile/edit) ⭐ BARU    │
        │ ├─ Identitas Pribadi:                             │
        │ │  ├─ Nama, WhatsApp, NIK (16 digit)             │
        │ │  ├─ Tempat & Tanggal Lahir                     │
        │ │  └─ Alamat Lengkap                             │
        │ ├─ Pendidikan S1 (WAJIB):                         │
        │ │  ├─ Fakultas, Prodi, Tahun Masuk, Tahun Tamat │
        │ ├─ Pendidikan S2/S3 (OPSIONAL)                   │
        │ └─ Redirect → Dashboard / Legalization Index      │
        └──────┬─────────────────────────────────────────────┘
               │
        ┌──────▼──────────────────────────────────────┐
        │ 4. DASHBOARD (Alumni)                       │
        │ ├─ Menampilkan Profil (read-only)          │
        │ └─ Link to Legalization Features           │
        └──────┬──────────────────────────────────────┘
               │
        ┌──────▼──────────────────────────────────┐
        │ 5. LEGALIZATION FLOW                    │
        │ ├─ Index: Daftar pengajuan              │
        │ ├─ Create: Form legalisir               │
        │ ├─ Store: Simpan data pengajuan         │
        │ ├─ Show: Upload ijazah (multi-file)     │
        │ └─ Upload: Proses file                  │
        └──────┬──────────────────────────────────┘
               │
        ┌──────▼──────────────────────────────────┐
        │ 6. ADMIN DASHBOARD                      │
        │ ├─ Index: Daftar semua pengajuan        │
        │ ├─ Show: Detail & Verifikasi            │
        │ ├─ Verify: Tandai terverifikasi         │
        │ ├─ Approve: Setujui & tandai selesai    │
        │ └─ Reject: Tolak dengan alasan          │
        └──────────────────────────────────────────┘
```

---

## 🔐 Security & Middleware

### **Middleware: `EnsureProfileCompleted`**

```php
// Route Middleware: ensure.profile.completed
// Melindungi: /legalization/**
// Fungsi: Cek apakah user sudah isi profil alumni
// Jika belum: Redirect ke /profile/edit dengan warning

// Field wajib yang dicek:
- wa, nik, tempat_lahir, tanggal_lahir, alamat_lengkap
- s1_fakultas, s1_prodi, s1_tahun_masuk, s1_tahun_tamat
```

### **Auth Flow**

```
REGISTER PAGE:
- Input: email, password, name
- Validasi: email unique, password strength
- Create: User (role=alumni) hanya dengan 3 field
- Tidak ada profil data di register page

LOGIN PAGE:
- Input: email, password
- Check: Profile complete? 
  ├─ YES → Redirect dashboard
  └─ NO  → Redirect /profile/edit (dengan warning)
```

---

## 📁 File Structure & Routes

### **Routes Configuration**

```php
// AUTH ROUTES (PUBLIC)
GET  /register          → Register page (email/password)
POST /register          → Create user
GET  /login             → Login page
POST /login             → Authenticate

// PROFILE ROUTES (AUTHENTICATED)
GET  /profile/edit      → Edit alumni profile form
POST /profile/update    → Update user data

// LEGALIZATION ROUTES (WITH PROFILE REQUIREMENT)
GET  /legalization                  → Index (list)
GET  /legalization/create           → Create form
POST /legalization                  → Store
GET  /legalization/{id}             → Show detail
POST /legalization/{id}/upload      → Upload files

// ADMIN ROUTES
GET    /admin/legalizations         → Index all
GET    /admin/legalizations/{id}    → Show detail
PUT    /admin/legalizations/{id}/verify   → Verify
PUT    /admin/legalizations/{id}/approve  → Approve
PUT    /admin/legalizations/{id}/reject   → Reject
```

### **Controller & View Files**

```
app/Http/Controllers/
├── AlumniProfileController.php    ✨ NEW
│   ├── edit()      → Render form
│   └── update()    → Simpan data
├── LegalizationController.php     (Existing - No change)
└── Admin/LegalizationAdminController.php (Existing - No change)

app/Http/Middleware/
└── EnsureProfileCompleted.php     ✨ NEW
    └── handle()    → Check profile completion

resources/js/Pages/
├── auth/
│   └── register.tsx               ✅ UPDATED (simplified)
├── Alumni/Profile/
│   └── Edit.tsx                   ✨ NEW
└── Legalization/
    ├── Index.tsx                  (Existing)
    ├── Create.tsx                 (Existing)
    └── Show.tsx                   (Existing)
```

---

## 🔄 User Data Flow

### **Registration**

```
1. User di homepage klik "DAFTAR"
   ↓
2. Buka register.tsx
   - Input: Email, Password, Nama
   - TIDAK ada field profil alumni
   ↓
3. Submit → CreateNewUser action
   - Validate: email, password, name
   - Create: User(name, email, password, role='alumni')
   - NO profil fields saved
   ↓
4. Fortify redirect → /profile/edit
   ↓
5. AlumniProfileController::edit()
   - Render form profil alumni lengkap
```

### **Profile Completion**

```
1. User di /profile/edit
   - Lihat form identitas pribadi (Nama, NIK, WA, dll)
   - Lihat form pendidikan S1 (Fakultas, Prodi, Tahun)
   - Lihat form S2/S3 opsional
   ↓
2. Fill & Submit
   - Validasi 9 field wajib
   - Validasi 3 field opsional (S2/S3)
   ↓
3. AlumniProfileController::update()
   - Update user dengan semua data
   - Simpan ke database users table
   ↓
4. Redirect → /dashboard
   - Flash message: "Profil berhasil diperbarui!"
   - Profile sekarang COMPLETE
```

### **Legalization Access**

```
1. User klik "Ajukan Legalisir" di dashboard
   ↓
2. Route: /legalization (GET)
   - Middleware: auth
   - Middleware: ensure.profile.completed
   ↓
3. Check: Profile lengkap?
   - YES → Render Legalization/Index.tsx
   - NO  → Redirect /profile/edit (dengan warning)
```

---

## 🎨 UI/UX Improvements

### **Register Page (Simplified)**

**Before:**
- Form panjang dengan semua profil alumni
- Upload ijazah di register
- Confusing untuk user baru

**After:**
- Hanya email, password, nama
- 2 section sederhana: "Identitas Akun" & "Keamanan Akun"
- Clear alur: daftar → profil → legalisir
- Info box menjelaskan 4 langkah

### **Profile Edit Page (Professional)**

- Header gradient teal matching homepage
- 3 sections rapi:
  1. **Identitas Pribadi** (blue accent)
  2. **Pendidikan S1** (teal accent)
  3. **Pendidikan S2/S3** (amber accent - dashed border)
- Clear labels & placeholders
- Form validation dengan error messages
- Info box dengan poin penting
- Smooth save button dengan loading state

### **Color Scheme**

```
Primary: Teal (#00A69D)
├─ Register button
├─ Profile form accents
└─ Submit buttons

Secondary: Blue (#3B82F6)
├─ Identitas Pribadi section

Tertiary: Amber (#F59E0B)
├─ Pendidikan S2/S3 section

Success: Green (#10B981)
├─ Completed status

Warning: Amber (#FBBF24)
├─ Alert messages

Danger: Red (#EF4444)
├─ Error messages

Background: Gradient
├─ from-slate-50 to-blue-50
```

---

## 📊 Database Schema (No Changes)

```
users table:
├─ id, name, email, password, email_verified_at, role
├─ wa, nik, tempat_lahir, tanggal_lahir, alamat_lengkap
├─ s1_fakultas, s1_prodi, s1_tahun_masuk, s1_tahun_tamat
├─ s2_prodi, s2_tahun_masuk, s2_tahun_tamat
├─ s3_prodi, s3_tahun_masuk, s3_tahun_tamat
└─ timestamps

legalizations table: (No changes)
├─ id, user_id, jenjang, tahun_lulus, jumlah_lembar, tujuan
├─ status (submitted/verified/completed/rejected)
├─ admin_note
├─ submitted_at, verified_at, completed_at
└─ timestamps

legalization_files table: (No changes)
├─ id, legalization_id, type, filename, original_name
├─ mime_type, size
└─ timestamps
```

---

## ✅ Implementation Checklist

### **1. Backend**
- [x] Create `AlumniProfileController`
- [x] Create `EnsureProfileCompleted` middleware
- [x] Register middleware in `Kernel.php`
- [x] Update `CreateNewUser` action (remove profil fields)
- [x] Update `FortifyServiceProvider` (add redirect)
- [x] Update routes with profile & middleware

### **2. Frontend**
- [x] Simplify `auth/register.tsx`
- [x] Create `Alumni/Profile/Edit.tsx`
- [x] Update form validations
- [x] Match color scheme with homepage

### **3. Routes**
- [x] Add profile routes
- [x] Add middleware to legalization routes
- [x] Test redirect flow

---

## 🧪 Testing Scenarios

### **Test 1: New User Registration**
```
1. Go to / → Click "DAFTAR"
2. Fill: email, password, name
3. Click "Buat Akun Sekarang"
   ✓ User created with role=alumni
   ✓ Redirect to /profile/edit
```

### **Test 2: Profile Completion**
```
1. At /profile/edit
2. Fill all required fields (9 fields)
3. Click "Simpan Profil & Lanjutkan"
   ✓ Validate all fields
   ✓ User data updated
   ✓ Redirect to /dashboard
   ✓ Flash message: "Profil alumni berhasil diperbarui!"
```

### **Test 3: Access Legalization Without Profile**
```
1. Register user (profil BLANK)
2. Try access /legalization
   ✓ Middleware blocks
   ✓ Redirect to /profile/edit
   ✓ Warning: "Lengkapi profil alumni Anda terlebih dahulu"
```

### **Test 4: Access Legalization With Profile**
```
1. Register & complete profile
2. Access /legalization
   ✓ Legalization index renders
   ✓ Can create, upload, submit
```

### **Test 5: Admin Access (No Profile Check)**
```
1. Admin login
2. Access /admin/legalizations
   ✓ No profile check required (admin only)
   ✓ Can see all submissions
```

---

## 📝 Validation Rules

### **Registration Form**

```php
'name'     => 'required|string|max:255'
'email'    => 'required|email|unique:users'
'password' => 'required|string|min:8|confirmed'
```

### **Profile Form**

```php
// Identitas Pribadi (WAJIB)
'name'               => 'required|string|max:255'
'wa'                 => 'required|regex:/^(\+62|62|0)[0-9]{9,12}$/'
'nik'                => 'required|size:16|regex:/^[0-9]{16}$/'
'tempat_lahir'       => 'required|string|max:100'
'tanggal_lahir'      => 'required|date|before:today'
'alamat_lengkap'     => 'required|string|max:500'

// Pendidikan S1 (WAJIB)
's1_fakultas'        => 'required|string|max:150'
's1_prodi'           => 'required|string|max:150'
's1_tahun_masuk'     => 'required|integer|min:1990|max:2026'
's1_tahun_tamat'     => 'required|integer|min:1990|max:2026'

// Pendidikan S2 (OPSIONAL)
's2_prodi'           => 'nullable|string|max:150'
's2_tahun_masuk'     => 'nullable|integer|min:1990|max:2026'
's2_tahun_tamat'     => 'nullable|integer|min:1990|max:2026'

// Pendidikan S3 (OPSIONAL)
's3_prodi'           => 'nullable|string|max:150'
's3_tahun_masuk'     => 'nullable|integer|min:1990|max:2026'
's3_tahun_tamat'     => 'nullable|integer|min:1990|max:2026'
```

---

## 🎯 Benefits of New Architecture

1. **Separation of Concerns**
   - Auth: Hanya email/password
   - Profile: Lengkap data alumni
   - Legalization: Proses legalisasi saja

2. **Better UX**
   - Register cepat (hanya email/password)
   - Profile sekali, reusable untuk semua layanan
   - Clear progression: Register → Profile → Legalization

3. **Security**
   - Profile middleware protects sensitive features
   - Validation at both frontend & backend
   - No duplicate data entry

4. **Scalability**
   - Mudah add layanan baru (karir, database, dll)
   - Reuse profile data tanpa duplikasi
   - Consistent data source

5. **Admin Experience**
   - Lebih rapi: hanya proses legalisasi
   - Tidak perlu input ulang data alumni
   - Alumni data already validated

---

## 🚀 Next Steps (Opsional - Fase 2)

- [ ] Implementasi Google OAuth (alternative login)
- [ ] Email verification before profile edit
- [ ] Profile update feature (alumni bisa ubah data)
- [ ] Profile completion percentage indicator
- [ ] Data consistency checks dengan UNIMED database
- [ ] Export alumni data untuk admin reporting

---

## 📞 Support & Questions

Pertanyaan tentang flow?
- Sistem akan auto-redirect user jika belum lengkap profil
- Flash messages menjelaskan setiap step
- Alur clear: Register → Profile → Legalization

---

*Generated: 2026-01-18 | Version: 2.0 (Complete Restructure)*
