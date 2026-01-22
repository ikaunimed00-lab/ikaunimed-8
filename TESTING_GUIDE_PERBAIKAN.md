# 🧪 QUICK TESTING GUIDE - PERBAIKAN BERITA & DASHBOARD

**Build:** Running di Port 5175  
**Status:** Ready untuk testing

---

## 🎯 TEST SCENARIOS

### TEST 1: Real-time Category News Count

**Lokasi:** http://localhost:5175/news

**Steps:**
1. ✅ Buka halaman /news
2. ✅ Lihat tombol kategori (Politik, Ekonomi, Pendidikan, etc)
3. ✅ Catat jumlah berita di setiap kategori
   ```
   Contoh: 📰 Politik (5) | 📌 Ekonomi (3) | ...
   ```
4. ✅ Dari terminal/admin, tambah berita baru dengan kategori tertentu
5. ✅ Lihat halaman /news lagi TANPA refresh
6. ✅ Angka kategori harus update dalam 3 detik

**Expected Result:**
```
BEFORE: 📌 Pendidikan (8)
AFTER (3 sec): 📌 Pendidikan (9) ← Increment otomatis!
```

**Pass/Fail:**
- ✅ PASS: Angka berubah dalam 3-5 detik tanpa refresh
- ❌ FAIL: Angka tidak berubah atau ada error di console

---

### TEST 2: News Images Display

**Lokasi:** http://localhost:5175/news

**Steps:**
1. ✅ Scroll ke section "Berita Terbaru"
2. ✅ Lihat grid gambar artikel (3 kolom)
3. ✅ Perhatikan setiap card punya gambar:
   ```
   [Gambar] ← Should show here
   Judul Berita
   Excerpt / Preview text
   ```
4. ✅ Hover over gambar - harus ada zoom effect
5. ✅ Refresh halaman (F5)
6. ✅ Gambar tetap ada (tidak disappear)
7. ✅ Click kategori (misal Teknologi)
8. ✅ Lihat berita dalam kategori
9. ✅ Gambar berita harus muncul

**Expected Result:**
```
Berita Terbaru
├─ [Gambar] [Judul 1]
├─ [Gambar] [Judul 2]
└─ [Gambar] [Judul 3]
```

**Pass/Fail:**
- ✅ PASS: Semua gambar visible, smooth hover, load cepat
- ❌ FAIL: Gambar missing, broken image icon, atau 404 errors

---

### TEST 3: Admin Sidebar - Logo & Design

**Lokasi:** http://localhost:5175/admin/news

**Steps:**
1. ✅ Login sebagai admin
2. ✅ Go to Dashboard atau Kelola Berita
3. ✅ Lihat sidebar sebelah kiri
4. ✅ Verifikasi logo:
   ```
   ┌─────────────────┐
   │ [Logo] IKA UNI  │
   │        MED      │
   │    Admin Panel  │
   └─────────────────┘
   ```
5. ✅ Logo harus persis sama dengan di Homepage header
6. ✅ Warna: Orange (IKA), Cyan (UNI), Yellow (MED)
7. ✅ Cek navigation items:
   - 🏠 Home Portal (orange)
   - 📊 Dashboard (blue)
   - 📰 Kelola Berita (orange)
   - 👥 Kelola User (teal) - admin only
   - 📋 Kelola Legalisasi (purple)
8. ✅ Hover over tombol - warna berubah
9. ✅ Icon harus scale up saat hover
10. ✅ Lihat tombol collapse (< icon) di bottom sidebar
11. ✅ Klik tombol collapse - sidebar harus shrink
12. ✅ Sidebar minimal (hanya icons visible)
13. ✅ Klik lagi - expand kembali

**Expected Result:**
```
┌─────────────────────┐
│ [Logo] IKA UNI MED │ ← Logo seperti homepage
│     Admin Panel    │
├─────────────────────┤
│ 🏠 Home Portal      │ ← Hover = orange bg
│ 📊 Dashboard        │ ← Hover = blue bg
│ 📰 Kelola Berita    │ ← Hover = orange bg
│ 👥 Kelola User      │ ← Hover = teal bg
│ 📋 Legalisasi       │ ← Hover = purple bg
├─────────────────────┤
│ 🚪 Logout (red)     │ ← Bottom
│ 👤 Username         │ ← User info
├─────────────────────┤
│ [<] Collapse Toggle │ ← Bottom
└─────────────────────┘
```

**Pass/Fail:**
- ✅ PASS: Logo correct, colors match, collapse works, user name shows
- ❌ FAIL: Logo wrong, colors off, collapse broken, or text misaligned

---

### TEST 4: Edit & Hapus Buttons Styling

**Lokasi:** http://localhost:5175/admin/news (after login)

**Steps:**
1. ✅ Go to Kelola Berita (Manage News)
2. ✅ Lihat table berita
3. ✅ Scroll to kolom "Aksi" (rightmost)
4. ✅ Lihat button Edit dan Hapus:
   ```
   ┌──────────────────┐
   │ [✏️ Edit] [🗑️ Hapus] │
   └──────────────────┘
   ```
5. ✅ Button harus:
   - Edit: Blue gradient background
   - Hapus: Red gradient background
   - Text: White (bukan dark)
   - Harus ada icon (edit icon untuk Edit, trash icon untuk Hapus)
   - Padding besar (not cramped)
   - Shadow effect (depth)
6. ✅ Hover over Edit button:
   - Background warna berubah (darker blue)
   - Shadow bertambah
   - Smooth transition
7. ✅ Hover over Hapus button:
   - Background berubah (darker red)
   - Shadow bertambah
8. ✅ Click Edit button:
   - Navigate ke edit form ✓
9. ✅ Back to list, Click Hapus button:
   - Confirmation dialog muncul
   - "Hapus berita ini?" message ✓
   - Click Batalkan - tetap di halaman
   - Click Hapus - berita dihapus ✓

**Expected Result:**
```
┌─────────────────────────────────────────┐
│ Aksi                                    │
├─────────────────────────────────────────┤
│ [✏️ Edit] [🗑️ Hapus]                     │ ← Blue & Red gradient
│ [✏️ Edit] [🗑️ Hapus]                     │ ← Professional styling
│ [✏️ Edit] [🗑️ Hapus]                     │ ← Grouped together
└─────────────────────────────────────────┘
```

**Pass/Fail:**
- ✅ PASS: Buttons professional, correct colors, icons visible, interactions work
- ❌ FAIL: Colors wrong, icons missing, cramped layout, or interactions fail

---

### TEST 5: Image Delay Kategori

**Lokasi:** http://localhost:5175/news

**Steps:**
1. ✅ Buka /news
2. ✅ Tunggu sampai gambar berita semua load
3. ✅ Click kategori (misal "Teknologi")
4. ✅ Lihat berita di kategori itu
5. ✅ Gambar harus:
   - Tidak ada delay (instant visible atau fade-in smooth)
   - Kalau loading, ada skeleton placeholder
   - Tidak flickering
6. ✅ Click kategori lain
7. ✅ Repeat - same result every time
8. ✅ Click "Semua" (show all news)
9. ✅ Semua gambar harus visible

**Expected Result:**
```
Click Kategori
→ Berita muncul
→ Gambar visible/loading smoothly
→ Tidak ada broken images
→ No console errors
```

**Pass/Fail:**
- ✅ PASS: Smooth transitions, no delays, images always load
- ❌ FAIL: Broken images, delay > 2 sec, flickering, atau 404 errors

---

## 📋 BROWSER CONSOLE CHECK

**Steps:**
1. ✅ Open DevTools (F12)
2. ✅ Go to Console tab
3. ✅ Look for errors (red X)
4. ✅ Look for warnings (yellow !)

**Should NOT see:**
```
❌ Cannot find module 'route'
❌ Failed to load resource (404)
❌ Uncaught TypeError
❌ Image.jsx:25 Uncaught ReferenceError
```

**Can ignore:**
```
⚠️ [HMR] Hmm, seems like the server is gone, let me reconnect
  → This is normal (hot reload connection)
```

**Pass/Fail:**
- ✅ PASS: No errors or warnings (or only HMR warnings)
- ❌ FAIL: Multiple errors, missing imports, or 404s

---

## 🎯 PERFORMANCE CHECKS

### Image Load Time
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for image files:
   ```
   article-1.jpg: 150-300ms ✅
   article-2.jpg: 150-300ms ✅
   article-3.jpg: 150-300ms ✅
   ```
5. Total should < 2 seconds

**Pass/Fail:**
- ✅ PASS: Images load in 150-500ms each
- ❌ FAIL: Images take > 2sec or 404 errors

### Category Polling
1. Open DevTools Network tab
2. Refresh /news page
3. Watch for `/api/categories` requests
4. Should see one request on page load
5. Wait 3 seconds...
6. Should see another request automatically
7. No errors (200 OK status)

**Pass/Fail:**
- ✅ PASS: Polling every 3-5 seconds, all 200 OK
- ❌ FAIL: No polling requests or all 404 errors

---

## ✅ FINAL CHECKLIST

Before marking as DONE:

General
- [ ] Dev server running on port 5175 ✓
- [ ] No TypeScript errors ✓
- [ ] No console errors ✓

Frontend Tests
- [ ] Real-time category count updates ✓
- [ ] News images display on /news ✓
- [ ] Images persist after refresh ✓
- [ ] Images load when category clicked ✓
- [ ] No image 404 errors ✓

Admin Dashboard
- [ ] Sidebar shows logo (same as homepage) ✓
- [ ] Colors: Orange, Cyan, Yellow ✓
- [ ] Navigation items all visible ✓
- [ ] Collapse toggle works ✓
- [ ] User name displays ✓

Admin News
- [ ] Edit button styled (blue gradient) ✓
- [ ] Hapus button styled (red gradient) ✓
- [ ] Both buttons have icons ✓
- [ ] Edit button navigates ✓
- [ ] Hapus button confirms ✓

Performance
- [ ] Images load < 500ms each ✓
- [ ] No flickering on category click ✓
- [ ] Smooth fade-in animations ✓
- [ ] Category polling smooth ✓

---

## 🐛 IF SOMETHING DOESN'T WORK

### Images not showing
```
1. Check console (F12) for 404 errors
2. Verify image path in NewsCard console
3. Check if /storage directory exists
4. Verify image files exist in storage/app/public/news/
```

### Category count not updating
```
1. Check Network tab for /api/categories requests
2. Should see requests every 3 seconds
3. If not, check if useEffect interval is running
4. Check browser console for fetch errors
```

### Sidebar looks wrong
```
1. Check if logo file exists: /public/images/favicon_ikaunimed.png
2. Verify colors in CSS classes
3. Check if collapse button clickable
4. Verify auth.user.name is set
```

### Buttons look ugly
```
1. Make sure Tailwind CSS loaded (check Network)
2. Verify gradient classes: from-blue-500 to-blue-600
3. Check if icon components imported correctly
4. Refresh page (hard refresh: Ctrl+Shift+R)
```

---

## 📞 SUPPORT

**If issues persist:**
1. Check PERBAIKAN_BERITA_DAN_DASHBOARD.md (technical docs)
2. Check console for specific error messages
3. Try hard refresh (Ctrl+Shift+R)
4. Try incognito/private window (cache issue)
5. Check if node_modules need update: `npm install`

---

**Status:** 🎯 Ready for Testing  
**Date:** 19 Januari 2026  
**Environment:** Development (Vite 7.2.7)
