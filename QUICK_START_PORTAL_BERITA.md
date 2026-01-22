# ⚡ QUICK START - PORTAL BERITA

## 1️⃣ Setup (Satu kali saja)

```bash
# Migrasi database
php artisan migrate

# Seed kategori default
php artisan db:seed --class=CategorySeeder

# Build frontend assets
npm run build
```

---

## 2️⃣ Buat Berita (Admin/Editor/Writer)

### Via Admin Panel
1. Login → Dashboard
2. Klik "Kelola Berita" atau ke `/admin/news`
3. Klik "Buat Berita" 
4. Isi form:
   - **Judul**: Judul berita (min 10 karakter)
   - **Ringkasan**: Excerpt (20-500 karakter)
   - **Konten**: Isi berita (min 100 karakter)
   - **Gambar**: Upload foto (3:2 ratio, min 600x400px)
   - **Kategori**: Pilih 1-3 kategori
   - **Status**: Pilih Draft atau Publish
   - **Jadwal Publish**: (opsional) Untuk publikasi terjadwal

### Catatan
- ✅ Gambar otomatis disimpan ke `storage/app/public/news`
- ✅ Slug otomatis generate dari judul (unik, tanpa random)
- ✅ Berita draft tersimpan dan bisa diedit kapan saja
- ✅ Berita published langsung muncul di portal

---

## 3️⃣ Lihat Berita di Frontend

### Halaman Berita
- **URL**: `/news`
- **Fitur**:
  - Hero section: Berita terbaru utama
  - Grid berita: 12 berita per halaman
  - Pagination: Navigate antar halaman
  - Kategori nav: Filter per kategori
  - View counter: Lihat jumlah pembaca

### Halaman Kategori
- **URL**: `/kategori/{slug}` (contoh: `/kategori/teknologi`)
- **Fitur**:
  - Header dengan kategori info
  - Berita per kategori dengan pagination
  - Related categories: Filter cepat

### Halaman Detail Berita
- **URL**: `/news/{slug}`
- **Fitur**:
  - Hero image besar
  - Breadcrumb navigation
  - Meta: Author, publish date, view count
  - Share buttons: WA, FB, Twitter, Copy link
  - Berita terkait: Related news dari kategori sama
  - Responsive design: Mobile-first

---

## 4️⃣ SEO & Google News

### Google News Indexing
1. Submit sitemap ke Google Search Console:
   - **URL**: `https://yourdomain.com/sitemap/google-news.xml`
   - Ke menu "Sitemaps" di GSC

2. Verify di Google News Publisher Center:
   - https://news.google.com/news/publisher-center/
   - Add publication
   - Verify dengan DNS/HTML tag/metatag
   - Wait 7-14 days untuk indexing

### Sitemap URLs
```
/sitemap.xml                    → Index semua sitemaps
/sitemap/news.xml               → News URLs (12 jam cache)
/sitemap/categories.xml         → Category URLs (24 jam cache)
/sitemap/google-news.xml        → Google News format (2 jam cache)
```

### Verify SEO
1. **Schema.org**: https://schema.org/validator
   - Paste `/news/{slug}` URL
   - Check NewsArticle schema

2. **Google Mobile-Friendly**: https://search.google.com/test/mobile-friendly

3. **PageSpeed**: https://pagespeed.web.dev

---

## 5️⃣ Management Features

### Filter & Search (Admin)
- **Search**: Cari berita by title
- **Status filter**: Draft, Published, Scheduled
- **Sort**: By latest, by popularity, by date

### Bulk Operations
- ✅ Multi-select berita
- ✅ Bulk delete (soft delete)
- ✅ Restore deleted news (via tinker)

### Soft Delete
- Berita yang dihapus tetap di database (safe)
- Hanya admin yang bisa restore

---

## 6️⃣ Caching & Performance

### Auto Cache
- Homepage: 60 menit
- Category pages: 60 menit each
- Related news: 30 menit
- Dashboard: 15 menit

### Clear Cache Manually
```bash
# Clear semua
php artisan cache:clear

# Clear tertentu
php artisan cache:forget news.list.page.1
php artisan cache:forget sitemap.news
```

### Page Speed
- Lazy load images: ✅
- Responsive images: ✅
- Minified CSS/JS: ✅
- Database queries optimized: ✅

---

## 7️⃣ Common Tasks

### 📝 Ubah Judul Berita
- Edit berita → ubah title → save
- Slug otomatis update (atau manual set)
- Cache terputus otomatis

### 🖼️ Update Gambar
- Edit berita → upload image baru
- Gambar lama dihapus otomatis
- Image validation: 3:2 ratio, min 600x400

### 📂 Ganti Kategori
- Edit berita → ubah category selection
- Pilih 1-3 kategori
- Related news akan update

### 📅 Jadwalkan Publikasi
- Create berita → set `Published At` (masa depan)
- Berita akan publish otomatis saat waktu tiba
- Butuh artisan scheduler running

### 🔍 Trending News
- Berita dengan view count tertinggi
- Ranking otomatis berdasarkan viewers
- Update real-time

---

## 8️⃣ Troubleshooting

### ❌ Gambar tidak muncul
- Check file ada di `storage/app/public/news/`
- Verify symlink: `php artisan storage:link`
- Check permission: `chmod -R 755 storage/`

### ❌ Cache tidak clear
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### ❌ Slug tidak unik
- Sistem auto-increment: `slug-2`, `slug-3`, etc
- Manual set slug di database jika perlu

### ❌ Berita tidak muncul
- Check status = `published` ✅
- Check published_at ≤ now() ✅
- Check soft delete: `deleted_at` = NULL ✅

---

## 📊 Metrics Dashboard

### Available Stats
```
/admin dashboard shows:
- Total berita
- Published berita
- Draft berita
- Scheduled berita
- Berita publish today
- Berita publish this month
- Total views all news
- Top 5 trending news
```

---

## 🔗 Useful URLs

| Halaman | URL |
|---------|-----|
| Semua berita | `/news` |
| Detail berita | `/news/{slug}` |
| Kategori | `/kategori/{slug}` |
| Admin list | `/admin/news` |
| Buat berita | `/admin/news/create` |
| Edit berita | `/admin/news/{slug}/edit` |
| Dashboard | `/dashboard` |
| Login | `/login` |

---

## 📞 API Endpoints (for React)

```
GET    /kategori                          → List categories
GET    /kategori/{slug}                   → Show category + news
GET    /kategori/{slug}/trending          → Trending per category
GET    /sitemap.xml                       → Sitemap index
GET    /sitemap/news.xml                  → News sitemap
GET    /sitemap/categories.xml            → Category sitemap
GET    /sitemap/google-news.xml           → Google News sitemap
```

---

**Tips**: 
- Jangan lupa upload gambar dengan ratio 3:2 untuk hasil terbaik
- Minimal 3 berita untuk portal terlihat full
- Update berita minimal 2-3x seminggu untuk SEO
- Monitor Google News Publisher untuk approval status

**Support**: Lihat `PORTAL_BERITA_DOCUMENTATION.md` untuk detail lengkap
