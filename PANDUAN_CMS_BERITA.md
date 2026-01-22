# 📝 PANDUAN CEPAT - CMS BERITA PROFESIONAL

## 🎯 3 FITUR UTAMA YANG DITAMBAHKAN

### 1. 🏷️ KATEGORI PILIHAN
```
┌─────────────────┐
│  KATEGORI       │
├─────────────────┤
│ ☑ Politik       │ ← Checkbox
│ ☐ Ekonomi       │
│ ☑ Pendidikan     │ ← Selected
│ ☐ Kesehatan      │
│ ☐ Teknologi      │
│ ☐ Olahraga       │
│ ☐ Hiburan        │
│ ☐ Gaya Hidup     │
│                 │
│ Pilih 1-3       │ ← Instructions
└─────────────────┘
```
**Fitur:** 
- Checkbox grid
- Max 3 pilihan
- Visual selection feedback
- Scrollable untuk banyak kategori

---

### 2. ✏️ EDITOR PROFESIONAL
```
┌──────────────────────────────┐
│ 📄 KONTEN BERITA            │
├──────────────────────────────┤
│ [B] [I] [U] [...] [H1] [H2] │ ← Toolbar
├──────────────────────────────┤
│                              │
│ Ketik konten berita di sini  │
│                              │
│ • Bisa bullet points         │
│ 1. Bisa numbered lists       │
│ **Bold**, *Italic*, `Code`   │
│                              │
│ > Blockquotes                │
│                              │
│ [Link](https://...)          │
│                              │
│ 100-50000 karakter           │ ← Hint
└──────────────────────────────┘
```
**Toolbar:**
- B (Bold), I (Italic), U (Underline)
- Heading levels (H1, H2, H3)
- Lists (Bullets, Numbered)
- Blockquotes
- Code blocks
- Links

---

### 3. 🚀 WORKFLOW STATUS
```
PILIH STATUS:

📋 DRAFT (Simpan saja)
   └─ Artikel tersimpan
   └─ Tidak terlihat di public
   └─ Bisa diedit kapan saja
   
⏰ SCHEDULED (Publish kemudian)
   └─ Tentukan waktu publish: [2026-01-25 08:00]
   └─ Otomatis publish di waktu itu
   └─ Muncul di public nanti
   
🚀 PUBLISHED (Langsung aktif)
   └─ Artikel langsung tampil
   └─ Visible di homepage, categories, RSS
   └─ Dapat di-index Google
```

---

## 📐 FORM LAYOUT BARU

```
┌─────────────────────────────────────────────────────┐
│ 📝 BUAT BERITA BARU                                │
│ "Tulis dan kelola konten dengan profesional"       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  MAIN EDITOR (2/3 width)  │  SIDEBAR (1/3 width)  │
│  ═════════════════════════╪═════════════════════════│
│                           │                         │
│  ✍️ Judul Berita          │  👤 PENULIS (admin)    │
│  [Input field]            │  [Dropdown]             │
│  min 10 karakter          │                         │
│                           │  🏷️ KATEGORI          │
│  📌 Ringkasan             │  ☑ Politik             │
│  [Textarea 3 rows]        │  ☐ Ekonomi             │
│  20-500 karakter          │  ☑ Pendidikan          │
│                           │  [scroll...]            │
│  🖼️ Gambar Featured       │                         │
│  [Drag-drop zone]         │  ⚙️ STATUS             │
│  Preview: [  IMG  ]       │  [Draft]               │
│                           │  [Scheduled]            │
│  📄 KONTEN                │  [Published]            │
│  ┌───────────────────┐   │                         │
│  │[B] [I] [U] [...]  │   │  📅 Waktu Publikasi    │
│  ├───────────────────┤   │  [DateTime picker]      │
│  │                   │   │                         │
│  │ Isi konten here   │   │  [SIMPAN DRAFT ▼]      │
│  │                   │   │  [Batal]                │
│  │ 100-50000 chars   │   │                         │
│  │                   │   │  (sticky)               │
│  └───────────────────┘   │                         │
│                           │                         │
└─────────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST SEBELUM PUBLISH

```
SEBELUM KLIK "PUBLISH SEKARANG":

Content
  [ ] Judul ≥ 10 karakter
  [ ] Judul belum pernah digunakan
  [ ] Ringkasan 20-500 karakter
  [ ] Konten ≥ 100 karakter
  [ ] Grammar & spelling OK
  [ ] Formatting clean

Media
  [ ] Gambar sudah diupload
  [ ] Gambar ratio 3:2 (600x400 minimal)
  [ ] Gambar < 5MB
  [ ] Gambar kualitas baik

Metadata
  [ ] 1-3 kategori dipilih
  [ ] Kategori relevan dengan konten
  [ ] Status dipilih (Draft/Scheduled/Published)

Jika Scheduled
  [ ] Waktu publish dipilih
  [ ] Waktu di masa depan
  [ ] Format: YYYY-MM-DD HH:MM
```

---

## 🎨 VISUAL STATUS INDICATORS

```
📋 DRAFT STATUS
  Background: Gray
  Icon: 📋
  Meaning: Belum publikasi
  Visible: Admin & author only
  
⏰ SCHEDULED STATUS
  Background: Amber/Orange
  Icon: ⏰
  Meaning: Menunggu waktu publish
  Visible: Admin & author (preview only)
  
🚀 PUBLISHED STATUS
  Background: Green
  Icon: 🚀
  Meaning: Aktif & visible
  Visible: Public + feeds + search engines
```

---

## 📋 VALIDASI FIELD

| Field | Min | Max | Requirement |
|-------|-----|-----|-------------|
| Judul | 10 | 255 | Unique, alphanumeric |
| Ringkasan | 20 | 500 | Required for preview |
| Konten | 100 | 50000 | Quality control |
| Gambar | - | 5MB | 600x400, ratio 3:2 |
| Kategori | 1 | 3 | Required, valid IDs |
| Status | - | - | draft/scheduled/published |

---

## 🚀 CARA PUBLISH

### OPTION 1: DRAFT (Persiapan)
```
1. Isi form semua field
2. Status: [Draft]
3. Klik "SIMPAN DRAFT"
4. ✓ Article tersimpan tapi hidden
5. Edit lagi nanti ketika siap
6. Ubah status ke Published
7. Klik "PUBLISH SEKARANG"
```

### OPTION 2: LANGSUNG PUBLISH
```
1. Isi form semua field
2. Status: [Published]
3. Published At: [kosong]
4. Klik "PUBLISH SEKARANG"
5. ✓ Article langsung aktif di portal
6. Muncul di homepage & categories
```

### OPTION 3: SCHEDULE FUTURE
```
1. Isi form semua field
2. Status: [Scheduled]
3. Published At: [pilih tanggal & jam]
   Contoh: 2026-01-25 08:00
4. Klik "PUBLISH SEKARANG"
5. ✓ Article tersimpan tapi wait...
6. Otomatis publish di waktu tertentu
   (Needs cron job untuk automatic)
```

---

## ⚠️ ERROR MESSAGES

### Saat Isi Form

```
Judul required
❌ Judul wajib diisi

Judul minimal 10 karakter
❌ "tes" hanya 3 karakter

Judul sudah pernah digunakan
❌ Gunakan judul yang berbeda

Ringkasan minimal 20 karakter
❌ Ringkasan terlalu pendek

Konten minimal 100 karakter
❌ Konten terlalu pendek untuk publikasi

Gambar wajib diunggah
❌ Upload foto terlebih dahulu

Gambar rasio harus 3:2
❌ Foto bukan 3:2 ratio (coba 1200x800)

Pilih minimal 1 kategori
❌ Kategori wajib dipilih
```

---

## 🎯 PERMISSION RULES

```
SUBSCRIBER (Default)
  Can: Baca berita
  Can't: Create/edit/publish

WRITER (Promoted by admin)
  Can: Create berita
  Can: Edit berita sendiri
  Can: Save as draft
  Can't: Edit berita orang
  Can't: Delete berita
  Can't: Manage users

EDITOR (Promoted by admin)
  Can: Edit semua berita
  Can: Delete berita
  Can: Publish berita
  Can: Dashboard full
  Can't: Manage users

ADMIN
  Can: Everything
  Can: Manage users & roles
```

---

## 💾 MENYIMPAN & MENERBITKAN

### SAVE
Hanya untuk draft:
```
Klik "SIMPAN DRAFT"
  └─ Artikel tersimpan
  └─ Status: draft
  └─ Tidak visible di public
  └─ Bisa diedit kapan saja
```

### PUBLISH
Untuk publish sekarang:
```
Status: [Published]
Klik "PUBLISH SEKARANG"
  └─ Artikel langsung aktif
  └─ Status: published
  └─ published_at: now()
  └─ Visible di homepage, category, RSS
  └─ Indexed by Google
```

### SCHEDULE
Untuk publish nanti:
```
Status: [Scheduled]
Published At: [masa depan]
Klik "PUBLISH SEKARANG"
  └─ Artikel tersimpan
  └─ Status: scheduled
  └─ published_at: (future)
  └─ Will auto-publish later
```

---

## 🔄 EDIT ARTIKEL

```
1. Go to /admin/news
2. Cari artikel yang ingin diedit
3. Klik [EDIT]
4. Form muncul dengan data lama
5. Ubah field yang perlu
6. Klik "UPDATE"

Special:
- Jika ubah judul → slug berubah
- Jika ubah gambar → gambar lama dihapus
- Kategori ter-sync otomatis
```

---

## ❌ HAPUS ARTIKEL

```
1. Go to /admin/news
2. Cari artikel
3. Klik [DELETE]
4. Confirmation: "Hapus?"
5. Klik "Hapus"
6. ✓ Article dihapus (soft delete)
7. Article tetap di DB (deleted_at set)
8. Tidak visible di public
```

---

## 📊 STATISTIK FORM

**Total Fields:** 7
- Title
- Excerpt (NEW)
- Content
- Image
- Categories (NEW)
- Status (NEW)
- Published At (NEW)

**Validations:** 15+
- Title: unique, min/max, regex
- Excerpt: min/max
- Content: min/max
- Image: type, size, dimensions
- Categories: exist, array, min/max
- Status: in enum
- Published At: date format, future

**Permissions:** 4 levels
- Subscriber: read only
- Writer: create own
- Editor: manage all
- Admin: full control

---

## 🧠 BEST PRACTICES

### Title
✅ DO:
- "Universitas Raih Penghargaan Internasional"
- "Alumni Sukses Jadi CEO Tech Startup"
- "Beasiswa Program S1 Dibuka Tahun Ini"

❌ DON'T:
- "test" (terlalu pendek)
- "!!!!!!" (special chars)
- Sama seperti artikel lain (unique required)

### Excerpt
✅ DO:
- Ringkasan 1-2 kalimat
- Catchy & compelling
- Summarize main point

❌ DON'T:
- Terlalu panjang
- Copy-paste dari content
- Generic ("Baca selengkapnya")

### Content
✅ DO:
- Well-structured paragraphs
- Use headings untuk sections
- Lists untuk bullet points
- Bold untuk emphasis

❌ DON'T:
- Wall of text
- ALL CAPS
- Typos & grammar errors

### Image
✅ DO:
- High quality photo
- Ratio 3:2 (landscape)
- Min 600x400px
- Relevant to content

❌ DON'T:
- Low resolution
- Portrait (1:1 ratio)
- Too large file
- Generic stock photos

### Categories
✅ DO:
- Pilih 1-3 relevan
- Utama + supporting
- Focused selection

❌ DON'T:
- Semua kategori
- Random selection
- Tidak relevan

---

## 🎓 CONTOH PENGISIAN

**Skenario:** Artikel tentang alumni yang sukses

```
✍️ Judul:
   "Alumnus IKA UNIMED Jadi Director PT Telkom"

📌 Ringkasan:
   "Ridho Hutomo (Angkatan 2010) berhasil naik jabatan
    menjadi Director PT Telkom setelah 12 tahun berkarir
    di industri telekomunikasi."

🖼️ Gambar:
   [Upload foto: ridho-telkom.jpg - 1200x800px]

📄 Konten:
   "## Perjalanan Karir Ridho Hutomo
   
    Ridho Hutomo merupakan alumnus Universitas Medan
    yang menyelesaikan studi S1 Teknik Informatika...
    
    ### Pencapaian Utama:
    • 2014 - Bergabung PT Telkom
    • 2018 - Senior Manager
    • 2022 - Director
    • 2024 - Vice Director
    
    Beliau terus berbagi pengalaman kepada adik tingkat..."

🏷️ Kategori:
   ☑ Pendidikan
   ☑ Alumni Sukses
   ☐ Kesehatan
   ☐ Olahraga

⚙️ Status:
   [Published]

🚀 Klik "PUBLISH SEKARANG"

✓ Artikel published! Visible di portal.
```

---

## ⏱️ PERKIRAAN WAKTU

- Fill form: 10-15 menit
- Upload gambar: 2-3 menit
- Review & proof: 5-10 menit
- **Total:** 20-30 menit per artikel

---

## 📞 BANTUAN

Jika ada error:
1. Baca error message
2. Perbaiki field yang disebutkan
3. Submit lagi

Jika masih error:
1. Check validation rules (lihat tabel di atas)
2. Pastikan file gambar ratio 3:2
3. Pastikan kategori valid
4. Contact admin jika stuck

---

**Portal Berita IKA UNIMED**  
**Pengelolaan Konten Profesional** ✨

*Dibuat: 19 Januari 2026*
