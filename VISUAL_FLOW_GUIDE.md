# 🗺️ VISUAL FLOW GUIDE - Alumni System

## 1️⃣ Registration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    HOMEPAGE (/)                             │
│  "Daftar" button → /register                                │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
        ┌──────────────────────────────────────────────────────┐
        │      REGISTER PAGE (/register)                       │
        │  ┌─ Simplified Form                                  │
        │  │  ├─ Email Address      [user@example.com]        │
        │  │  ├─ Nama Lengkap       [Full Name]               │
        │  │  ├─ Password           [●●●●●●●●]               │
        │  │  └─ Confirm Password   [●●●●●●●●]               │
        │  │                                                   │
        │  ├─ Colors: Teal gradient header                    │
        │  ├─ 2 Sections: Identitas Akun & Keamanan           │
        │  ├─ Submit: "Buat Akun Sekarang"                   │
        │  └─ Info: 4-step alur dijelaskan                   │
        └────────┬─────────────────────────────────────────────┘
                 │ Submit
                 ▼
        ┌──────────────────────────────────────────────────────┐
        │  CREATE NEW USER (Backend)                           │
        │  ├─ Validate: email, password, name                │
        │  ├─ Check: email is unique                         │
        │  ├─ Hash: password                                 │
        │  ├─ Create: User(name, email, password, role)      │
        │  └─ Set: role = 'alumni'                           │
        └────────┬─────────────────────────────────────────────┘
                 │ Auto Redirect
                 ▼
        ┌──────────────────────────────────────────────────────┐
        │    PROFILE EDIT PAGE (/profile/edit)                │
        │    ✓ User created, now complete profile             │
        └──────────────────────────────────────────────────────┘
```

---

## 2️⃣ Profile Completion Flow

```
┌──────────────────────────────────────────────────────────────┐
│          PROFILE EDIT PAGE (/profile/edit)                   │
│                                                               │
│  HEADER: "Lengkapi Profil Alumni"                           │
│  └─ Teal gradient, professional look                        │
│                                                               │
│  ┌─ SECTION 1: IDENTITAS PRIBADI (Blue)                    │
│  │ Nama Lengkap & Gelar      [________________]             │
│  │ WhatsApp                  [0812xxxxxx]                   │
│  │ NIK (16 digit)            [________________]             │
│  │ Tempat Lahir              [________________]             │
│  │ Tanggal Lahir             [____-____-____]               │
│  │ Alamat Lengkap            [________________]             │
│  │                                                            │
│  ├─ SECTION 2: PENDIDIKAN S1 (Teal)                        │
│  │ Fakultas                  [________________]             │
│  │ Program Studi             [________________]             │
│  │ Tahun Masuk               [____]                         │
│  │ Tahun Tamat               [____]                         │
│  │                                                            │
│  ├─ SECTION 3: S2/S3 OPTIONAL (Amber Dashed)               │
│  │ ┌─ S2 ────────────────────────────────┐                 │
│  │ │ Program Studi    [________________]  │                 │
│  │ │ Tahun Masuk [____]  Tahun Tamat [___]│                 │
│  │ └──────────────────────────────────────┘                 │
│  │ ┌─ S3 ────────────────────────────────┐                 │
│  │ │ Program Studi    [________________]  │                 │
│  │ │ Tahun Masuk [____]  Tahun Tamat [___]│                 │
│  │ └──────────────────────────────────────┘                 │
│  │                                                            │
│  ├─ INFO BOX (Blue)                                         │
│  │ 📋 Informasi Penting:                                   │
│  │ ✓ Data profil hanya diisi satu kali                    │
│  │ ✓ Data akan digunakan untuk semua layanan              │
│  │ ✓ Kami akan memverifikasi data dengan UNIMED          │
│  │ ✓ Setelah profil selesai, bisa ajukan legalisir       │
│  │                                                            │
│  └─ SUBMIT: "Simpan Profil & Lanjutkan" [BUTTON]          │
└──────────┬───────────────────────────────────────────────────┘
           │ Form Submit
           ▼
    ┌────────────────────────────────────────────────────────┐
    │  VALIDATE PROFILE (Backend)                            │
    │  ├─ Check all 9 required fields                       │
    │  ├─ Validate formats (NIK, WA, email, dates)         │
    │  ├─ Check data integrity                             │
    │  └─ If error → Show messages below fields             │
    └────────┬─────────────────────────────────────────────────┘
             │ If valid
             ▼
    ┌────────────────────────────────────────────────────────┐
    │  UPDATE USER (Backend)                                 │
    │  ├─ Save all profile data                             │
    │  ├─ Update: wa, nik, tempat_lahir, etc               │
    │  ├─ Commit to database                                │
    │  └─ Return success message                             │
    └────────┬─────────────────────────────────────────────────┘
             │ Redirect
             ▼
    ┌────────────────────────────────────────────────────────┐
    │     DASHBOARD (Alumni)                                 │
    │     ✓ Flash: "Profil berhasil diperbarui!"           │
    │     ✓ Profile data now COMPLETE                       │
    └────────────────────────────────────────────────────────┘
```

---

## 3️⃣ Profile Check for Legalization

```
┌────────────────────────────────────────────────────────────┐
│  User clicks "Ajukan Legalisir"                            │
└──────────────┬──────────────────────────────────────────────┘
               │ GET /legalization
               ▼
        ┌──────────────────────────────────────────────────┐
        │  MIDDLEWARE: ensure.profile.completed            │
        └──────┬──────────────────────────────────┬────────┘
               │                                  │
         Profile?                          No Profile?
         Complete?                               │
               │                                  ▼
               │                        ┌──────────────────────┐
               │                        │  REDIRECT            │
               │                        │  /profile/edit       │
               │                        │                      │
               │                        │  Flash:              │
               │                        │  "Lengkapi profil    │
               │                        │   terlebih dahulu"   │
               │                        └──────────────────────┘
               │
               ▼
        ┌──────────────────────────────────────────────────┐
        │  LEGALIZATION INDEX (/legalization)              │
        │  ├─ Show user's legalization requests            │
        │  ├─ Display status badges                         │
        │  ├─ Link to create new & show detail             │
        │  └─ Upload new ijazah                             │
        └──────────────────────────────────────────────────┘
```

---

## 4️⃣ Complete User Journey

```
DAY 1 - REGISTRATION
┌──────────────────────────────────────────┐
│  Homepage                                │
│    ↓ Click "DAFTAR"                      │
│  Register (/register)                    │
│    ├─ Input: email, password, name       │
│    └─ Time: ~1 minute                    │
│    ↓ Submit                              │
│  Profile Edit (/profile/edit)            │
│    ├─ Input: 9+ fields                   │
│    └─ Time: ~5 minutes                   │
│    ↓ Save                                │
│  Dashboard (Alumni)                      │
│    └─ Profile complete! ✓                │
└──────────────────────────────────────────┘

DAY 5 - SUBMIT LEGALIZATION
┌──────────────────────────────────────────┐
│  Dashboard                               │
│    ↓ Click "Ajukan Legalisir"           │
│  Legalization Create                     │
│    ├─ Input: jenjang, tahun, jumlah     │
│    └─ Time: ~2 minutes                   │
│    ↓ Submit                              │
│  Legalization Show                       │
│    ├─ Upload ijazah (multi-file)        │
│    └─ Time: ~3 minutes                   │
│    ↓ Upload complete                    │
│  Back to Index                           │
│    └─ Status: Submitted ⏳               │
└──────────────────────────────────────────┘

DAY 6 - ADMIN REVIEWS
┌──────────────────────────────────────────┐
│  Admin Dashboard                         │
│    ↓ Click "Kelola Legalisasi"          │
│  Admin Legalization Index                │
│    ├─ See all submissions                │
│    └─ Find user's request                │
│    ↓ Click Detail                        │
│  Admin Legalization Show                 │
│    ├─ Review dokumen                     │
│    ├─ Check data alumni                  │
│    ├─ Verify files                       │
│    └─ Time: ~5 minutes per request       │
│    ↓ Click "Verifikasi"                  │
│  Status updates to "Terverifikasi" ✓     │
└──────────────────────────────────────────┘

DAY 8 - APPROVAL
┌──────────────────────────────────────────┐
│  Admin Legalization Show                 │
│    ├─ Review already verified request    │
│    └─ All looks good!                    │
│    ↓ Click "Setujui"                    │
│  Status updates to "Selesai" ✓✓          │
│    ↓                                     │
│  Alumni Dashboard (next login)           │
│    ├─ Status shows: Selesai ✓✓           │
│    └─ Can download hasil legalisasi     │
└──────────────────────────────────────────┘
```

---

## 5️⃣ Data Reusability

```
┌─────────────────────────────────────────────────────────────┐
│                    USER PROFILE DATA                         │
│                  (Filled ONCE on /profile/edit)              │
│                                                               │
│  Identitas Pribadi                                           │
│  ├─ Nama, WhatsApp, NIK, Tempat Lahir, Tgl Lahir, Alamat  │
│  │                                                            │
│  └─ REUSABLE FOR:                                           │
│     ├─ Legalization system (jenjang reference)              │
│     ├─ Alumni database (future feature)                     │
│     ├─ Karir system (contact info)                          │
│     ├─ Events & workshops (notification)                    │
│     └─ Reunion & networking (database)                      │
│                                                               │
│  Pendidikan S1                                              │
│  ├─ Fakultas, Prodi, Tahun Masuk, Tahun Tamat             │
│  │                                                            │
│  └─ REUSABLE FOR:                                           │
│     ├─ Legalization form (auto-fill jenjang)                │
│     ├─ Transcript requests (faculty/department)             │
│     ├─ Alumni statistics (batch year)                       │
│     ├─ Department networking (prodi alumni)                 │
│     └─ Career placement (education history)                 │
│                                                               │
│  Pendidikan S2/S3 (Optional)                                │
│  ├─ Program, Tahun Masuk, Tahun Tamat                      │
│  │                                                            │
│  └─ REUSABLE FOR:                                           │
│     ├─ Advanced degree networking                           │
│     ├─ Career profile completeness                          │
│     └─ Alumni achievement tracking                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘

KEY PRINCIPLE:
┌─────────────────────────────────────────────────────────────┐
│ "ASK ONCE, USE EVERYWHERE"                                  │
│                                                               │
│ Alumni fills their data ONCE during profile setup.          │
│ This data is then automatically available for:              │
│ ✓ Legalization form (no re-entry)                           │
│ ✓ Alumni database (automatic)                               │
│ ✓ Future features (already have data)                       │
│ ✓ Admin reports (accurate data)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6️⃣ Security & Protection

```
                     HTTP REQUEST
                           │
                           ▼
                   ┌─────────────────┐
                   │  Route Matching │
                   └────────┬────────┘
                            │
                   ┌────────▼────────┐
            YES    │   Middleware:   │
          ◄────────┤   'auth'?       │
         logged in └────────┬────────┘
                            │ NO
                    ┌───────▼───────┐
                    │   REDIRECT:   │
                    │   /login      │
                    └───────────────┘

                   ┌────────────────┐
            YES    │   Middleware:  │
          ◄────────┤ 'ensure.       │
          profile  │  profile.      │
          complete │  completed'?   │
                   └────────┬───────┘
                            │ NO
                    ┌───────▼───────────┐
                    │   REDIRECT:       │
                    │   /profile/edit   │
                    │                   │
                    │   Flash Message:  │
                    │   "Lengkapi       │
                    │    profil..."     │
                    └───────────────────┘

                   ┌────────────────┐
            YES    │ Authorization  │
          ◄────────│ checks passed  │
                   └────────┬───────┘
                            │
                   ┌────────▼──────────┐
                   │ Render requested  │
                   │ page to user      │
                   └───────────────────┘
```

---

## 7️⃣ Error Handling Flow

```
┌──────────────────────────────────────────────────────┐
│           USER SUBMITS FORM                           │
│  (Register, Profile, or Legalization)                │
└────────────┬─────────────────────────────────────────┘
             │
             ▼
    ┌────────────────────────────────────────────────┐
    │  FRONTEND VALIDATION                           │
    │  ├─ Check required fields not empty            │
    │  ├─ Check email format                         │
    │  ├─ Check password strength                    │
    │  ├─ Check NIK format                           │
    │  └─ If error → Show below field in RED         │
    └────┬──────────────────────────────────────────┘
         │ If passed
         ▼
    ┌────────────────────────────────────────────────┐
    │  BACKEND VALIDATION (Server)                   │
    │  ├─ Validate all fields again                  │
    │  ├─ Check unique constraints (email)           │
    │  ├─ Check data types & ranges                  │
    │  ├─ Check business rules                       │
    │  └─ If error → Return JSON with messages       │
    └────┬──────────────┬───────────────────────────┘
         │ IF VALID     │ IF INVALID
         │              │
         ▼              ▼
    ┌─────────┐    ┌──────────────────┐
    │ SAVE    │    │ RETURN ERRORS    │
    │ DATA    │    │ to frontend      │
    │ to DB   │    │                  │
    └────┬────┘    │ Flash message    │
         │         │ + Field errors   │
         ▼         └────┬─────────────┘
    ┌──────────┐        │
    │ REDIRECT │        ▼
    │ SUCCESS  │   ┌──────────────────┐
    │ Page     │   │ RE-RENDER FORM   │
    └──────────┘   │ Show error msgs  │
                   │ Keep form data   │
                   └──────────────────┘
```

---

## 8️⃣ Middleware Protection Visualization

```
ROUTES:

Public (No middleware):
├─ GET  /              (Homepage)
├─ GET  /register      (Register page)
├─ POST /register      (Create user)
├─ GET  /login         (Login page)
└─ POST /login         (Authenticate)

Protected (auth only):
├─ GET  /profile/edit      (Edit profile)
└─ POST /profile/update    (Update profile)

Protected (auth + profile.completed):
├─ GET  /legalization                 ✓ Profile required
├─ GET  /legalization/create          ✓ Profile required
├─ POST /legalization                 ✓ Profile required
├─ GET  /legalization/{id}            ✓ Profile required
└─ POST /legalization/{id}/upload     ✓ Profile required

Admin only (auth + role:admin):
├─ GET    /admin/legalizations                ✗ No profile check
├─ GET    /admin/legalizations/{id}           ✗ No profile check
├─ PUT    /admin/legalizations/{id}/verify    ✗ No profile check
├─ PUT    /admin/legalizations/{id}/approve   ✗ No profile check
└─ PUT    /admin/legalizations/{id}/reject    ✗ No profile check


PROFILE CHECK (9 fields):
┌─ wa (WhatsApp)
├─ nik (NIK)
├─ tempat_lahir (Birthplace)
├─ tanggal_lahir (Birthdate)
├─ alamat_lengkap (Address)
├─ s1_fakultas (Faculty)
├─ s1_prodi (Study Program)
├─ s1_tahun_masuk (Year Entered)
└─ s1_tahun_tamat (Year Completed)

ALL 9 FIELDS MUST BE FILLED → Can access legalization
ANY FIELD MISSING → Redirect /profile/edit
```

---

## 9️⃣ Database State Tracking

```
NEW USER JOURNEY:

┌─────────────────────────────────────────────────────┐
│ Step 1: REGISTERED (Registration Complete)         │
│                                                     │
│ users table:                                        │
│ ├─ id: 123                                         │
│ ├─ name: "Budi Santoso"                           │
│ ├─ email: "budi@example.com"                       │
│ ├─ password: hash(*****)                           │
│ ├─ role: "alumni"                                  │
│ ├─ wa: NULL ⚠️  ← EMPTY                            │
│ ├─ nik: NULL ⚠️  ← EMPTY                           │
│ ├─ tempat_lahir: NULL ⚠️  ← EMPTY                 │
│ ├─ tanggal_lahir: NULL ⚠️  ← EMPTY                │
│ ├─ alamat_lengkap: NULL ⚠️  ← EMPTY               │
│ ├─ s1_fakultas: NULL ⚠️  ← EMPTY                  │
│ ├─ s1_prodi: NULL ⚠️  ← EMPTY                     │
│ ├─ s1_tahun_masuk: NULL ⚠️  ← EMPTY               │
│ └─ s1_tahun_tamat: NULL ⚠️  ← EMPTY               │
│                                                     │
│ Status: ❌ PROFILE INCOMPLETE                       │
│ Can access: /profile/edit only                     │
│ Cannot access: /legalization (blocked)             │
└─────────────────────────────────────────────────────┘
                      │
                      │ User fills profile
                      ▼
┌─────────────────────────────────────────────────────┐
│ Step 2: PROFILE COMPLETE (Profile Saved)           │
│                                                     │
│ users table:                                        │
│ ├─ id: 123                                         │
│ ├─ name: "Budi Santoso"                           │
│ ├─ email: "budi@example.com"                       │
│ ├─ password: hash(*****)                           │
│ ├─ role: "alumni"                                  │
│ ├─ wa: "081234567890" ✓ FILLED                    │
│ ├─ nik: "1234567890123456" ✓ FILLED               │
│ ├─ tempat_lahir: "Medan" ✓ FILLED                 │
│ ├─ tanggal_lahir: "1999-05-15" ✓ FILLED           │
│ ├─ alamat_lengkap: "Jl. Contoh No. 123" ✓ FILLED │
│ ├─ s1_fakultas: "FIP" ✓ FILLED                    │
│ ├─ s1_prodi: "Pendidikan Matematika" ✓ FILLED     │
│ ├─ s1_tahun_masuk: 2015 ✓ FILLED                  │
│ └─ s1_tahun_tamat: 2019 ✓ FILLED                  │
│                                                     │
│ Status: ✓ PROFILE COMPLETE                         │
│ Can access: ALL features                           │
│ Can use: Legalization system                       │
└─────────────────────────────────────────────────────┘
                      │
                      │ User submits legalization
                      ▼
┌─────────────────────────────────────────────────────┐
│ Step 3: LEGALIZATION CREATED                       │
│                                                     │
│ legalizations table:                               │
│ ├─ id: 456                                         │
│ ├─ user_id: 123 (linked to user)                   │
│ ├─ jenjang: "S1"                                   │
│ ├─ tahun_lulus: 2019                              │
│ ├─ jumlah_lembar: 2                                │
│ ├─ tujuan: "CPNS"                                  │
│ ├─ status: "submitted"                             │
│ ├─ admin_note: NULL                                │
│ ├─ submitted_at: "2026-01-18 10:00:00"            │
│ ├─ verified_at: NULL                               │
│ ├─ completed_at: NULL                              │
│ └─ timestamps...                                   │
│                                                     │
│ Status: ⏳ SUBMITTED                                 │
│ Can: Upload files (ijazah)                         │
│ Cannot: Change request                             │
└─────────────────────────────────────────────────────┘
                      │
                      │ User uploads ijazah files
                      ▼
┌─────────────────────────────────────────────────────┐
│ Step 4: FILES UPLOADED                             │
│                                                     │
│ legalization_files table:                          │
│ ├─ id: 789                                         │
│ ├─ legalization_id: 456                            │
│ ├─ filename: "ijazah_2019_xxxxx.pdf"              │
│ ├─ original_name: "Ijazah 2019.pdf"               │
│ ├─ mime_type: "application/pdf"                    │
│ ├─ size: 2048576                                   │
│ └─ timestamps...                                   │
│                                                     │
│ Status: ✓ FILES READY FOR REVIEW                   │
│ Admin can: Verify & approve                        │
└─────────────────────────────────────────────────────┘
```

---

## 🔟 Complete Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  auth/             Alumni/              Legalization/        │
│  ├─ register.tsx   ├─ Profile/          ├─ Index.tsx       │
│  └─ login.tsx      │  └─ Edit.tsx ✨     ├─ Create.tsx      │
│                    └─ Dashboard.tsx      ├─ Show.tsx        │
│                                          └─ Admin/          │
│                                             ├─ Index.tsx    │
│                                             └─ Show.tsx     │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│          HTTP / Inertia.js / Route Navigation              │
├─────────────────────────────────────────────────────────────┤
│                      BACKEND (Laravel)                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Middleware:                                                │
│  ├─ auth                                                    │
│  ├─ ensure.profile.completed ✨                             │
│  └─ role-based access                                       │
│                                                               │
│  Routes (web.php):                                          │
│  ├─ Public: /register, /login, /home                       │
│  ├─ Auth: /profile/edit, /profile/update                   │
│  ├─ Protected: /legalization/* with profile check           │
│  └─ Admin: /admin/legalizations/*                          │
│                                                               │
│  Controllers:                                                │
│  ├─ AlumniProfileController ✨                              │
│  │  ├─ edit() → Render form                                │
│  │  └─ update() → Save profile                             │
│  ├─ LegalizationController                                  │
│  │  ├─ index(), create(), store()                          │
│  │  ├─ show(), upload()                                    │
│  │  └─ [All working, no changes]                           │
│  └─ Admin/LegalizationAdminController                       │
│     ├─ index(), show()                                      │
│     ├─ verify(), approve(), reject()                        │
│     └─ [All working, no changes]                           │
│                                                               │
│  Models:                                                     │
│  ├─ User (with all profile fields)                          │
│  ├─ Legalization                                            │
│  └─ LegalizationFile                                        │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│            Database (SQLite / MySQL / PostgreSQL)           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  users table:                                               │
│  ├─ id, name, email, password, role                         │
│  ├─ wa, nik, tempat_lahir, tanggal_lahir                   │
│  ├─ alamat_lengkap                                          │
│  ├─ s1_fakultas, s1_prodi, s1_tahun_masuk, s1_tahun_tamat │
│  ├─ s2_prodi, s2_tahun_masuk, s2_tahun_tamat              │
│  ├─ s3_prodi, s3_tahun_masuk, s3_tahun_tamat              │
│  └─ timestamps                                              │
│                                                               │
│  legalizations table:                                       │
│  ├─ id, user_id, jenjang, tahun_lulus, jumlah_lembar      │
│  ├─ tujuan, status, admin_note                             │
│  ├─ submitted_at, verified_at, completed_at                │
│  └─ timestamps                                              │
│                                                               │
│  legalization_files table:                                  │
│  ├─ id, legalization_id, filename, original_name           │
│  ├─ mime_type, size                                         │
│  └─ timestamps                                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Legend:
✨ = New in this update
→ = Shows/Renders
← = Receives/Processes
```

---

**VISUAL GUIDE COMPLETE!**

Semua alur sudah clear, dari registration → profile → legalization → admin approval.

Siap untuk testing & production deployment! 🚀
