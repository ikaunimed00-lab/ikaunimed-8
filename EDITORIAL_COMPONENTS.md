# 📋 EDITORIAL COMPONENTS DOCUMENTATION

> **Status**: Phase 1 Complete - All components created as skeleton/placeholder only. NO integration to pages yet.

## 🎯 Overview

Semua component di bawah adalah **placeholder siap review** sebelum diintegrasikan ke News/Index.tsx atau halaman kategori.

**Key Principles:**
✅ Skeleton loading (animate-pulse placeholders)  
✅ Sesuai color system existing (#0F766E teal, #F8FAF9 background, #E6EAE8 borders)  
✅ Modular dan reusable  
✅ No API integration yet (mock data only)  
✅ NO changes to existing pages  
✅ NO breaking changes  

---

## 📦 Components Created

### **1. HorizontalScroll.tsx** (Wrapper - Foundation)
**Location**: `resources/js/components/HorizontalScroll.tsx`

**Purpose**: Reusable wrapper untuk horizontal scrolling content dengan navigation arrows

**Usage**:
```tsx
<HorizontalScroll
  title="🎬 Konten Video"
  viewAllLink="/video"
  showArrows={true}
>
  {/* Child items here */}
</HorizontalScroll>
```

**Features**:
- ✅ Smooth scroll dengan arrow buttons
- ✅ Responsive (auto-hide arrows saat tidak perlu)
- ✅ Customizable title & CTA link
- ✅ Used by: FlashContent, EditorsPicks

**Props**:
```tsx
interface HorizontalScrollProps {
  children: React.ReactNode;
  title: string;
  viewAllLink?: string;
  showArrows?: boolean;
}
```

---

### **2. FlashContent.tsx** (Main Content)
**Location**: `resources/js/components/FlashContent.tsx`

**Purpose**: Horizontal scroll section untuk video/TikTok/konten flash

**Features**:
- ✅ Play button overlay
- ✅ Video duration badge
- ✅ Responsive 5-item carousel
- ✅ Desktop-focused (bisa di-hide mobile)

**UI States**:
- Normal: Skeleton loading
- Hover: Play button visible, darker overlay
- Click: Navigasi ke video page

---

### **3. RecommendedForYou.tsx** (Main Content)
**Location**: `resources/js/components/RecommendedForYou.tsx`

**Purpose**: Grid rekomendasi untuk user (2 baris x 2 kolom)

**Features**:
- ✅ Card horizontal (image kiri, teks kanan)
- ✅ Responsive grid (1 col mobile, 2 col desktop)
- ✅ 4 item placeholder (mock)
- ✅ Hover state: border color change

**Structure**:
```
[Image] [Title]
        [Meta]
```

---

### **4. PollingSection.tsx** (Main Content)
**Location**: `resources/js/components/PollingSection.tsx`

**Purpose**: Interactive polling widget dengan progress bar

**Features**:
- ✅ 4 pilihan poll (mock data)
- ✅ Progress bar animasi saat vote
- ✅ Vote tracking (disabled after vote)
- ✅ Percentage calculation
- ✅ Total vote counter

**API Ready**: 
- Mock POST endpoint untuk vote
- Siap untuk backend integration

---

### **5. VideoPopuler.tsx** (Main Content)
**Location**: `resources/js/components/VideoPopuler.tsx`

**Purpose**: Grid video populer (3 kolom responsive)

**Features**:
- ✅ Video thumbnail dengan play overlay
- ✅ Duration badge
- ✅ View counter
- ✅ Responsive: 1 col mobile, 2 col tablet, 3 col desktop
- ✅ 6 item placeholder (mock)

---

### **6. EditorialSidebar.tsx** (Sidebar - Wrapper)
**Location**: `resources/js/components/EditorialSidebar.tsx`

**Purpose**: Main sidebar wrapper dengan multiple sections

**Contains**:
1. **Editor's Picks** - 3 items horizontal scroll
2. **Berita Populer** - 5 items list
3. **Tag Populer** - 8 tags grid
4. **Kolom Opini** - 2 items
5. **Komentar Terbanyak** - 3 items
6. **Campaign Donasi** - CTA dengan gradient
7. **Rekomendasi Anda** - 2 horizontal + 4 vertical

**Sub-component**:
```tsx
<SidebarSection
  title="Editor's Picks"
  icon="📌"
  action={{ label: 'Lihat', href: '#' }}
>
  {/* Content */}
</SidebarSection>
```

---

### **7. EditorsPicks.tsx** (Sidebar Item)
**Location**: `resources/js/components/EditorsPicks.tsx`

**Purpose**: Standalone component untuk editor's curated picks

**Features**:
- ✅ Horizontal scroll (bisa standalone atau di sidebar)
- ✅ Star badge ⭐
- ✅ Thumbnail + title + date
- ✅ 6 item placeholder

---

### **8. BeritaPopuler.tsx** (Flexible)
**Location**: `resources/js/components/BeritaPopuler.tsx`

**Purpose**: Popular news section dengan dual-variant support

**Props**:
```tsx
interface BeritaPopulerProps {
  variant?: 'list' | 'grid';     // List dengan ranking atau grid
  maxItems?: number;               // Default: 5
}
```

**Variants**:

**List Mode**:
```
[Image] Title
        Views + Ranking Badge
```

**Grid Mode** (2 kolom):
```
[Image]
Title
Views
```

---

### **9. TagPopuler.tsx** (Sidebar Item)
**Location**: `resources/js/components/TagPopuler.tsx`

**Purpose**: Popular tags/keywords section

**Features**:
- ✅ Flex grid tags
- ✅ Tag count (mock)
- ✅ Hover effect: border + bg color change
- ✅ 12 tags placeholder
- ✅ "Lihat Semua Tag" button

---

### **10. KolumOpini.tsx** (Main Content)
**Location**: `resources/js/components/KolumOpini.tsx`

**Purpose**: Opinion columns & editorial pieces grid

**Features**:
- ✅ 2-column grid (responsive)
- ✅ Category badge (Opini/Ilmiah)
- ✅ Author name highlighted
- ✅ Title + publish date
- ✅ 4 item placeholder (mock)

---

### **11. KomentarTerbanyak.tsx** (Sidebar Item)
**Location**: `resources/js/components/KomentarTerbanyak.tsx`

**Purpose**: Most commented articles section

**Features**:
- ✅ List view dengan comment count badge
- ✅ Last comment time
- ✅ Hover effect
- ✅ 5 item placeholder

---

### **12. SuratPembaca.tsx** (Main Content)
**Location**: `resources/js/components/SuratPembaca.tsx`

**Purpose**: Reader letters/feedback section

**Features**:
- ✅ Letter list dengan status (✓ Ditampilkan / ⏳ Menunggu)
- ✅ Author, subject, excerpt
- ✅ Read more link
- ✅ "Tulis Surat Pembaca" CTA button
- ✅ 3 item placeholder (mock)

---

## 🎨 Color System Applied

Semua component menggunakan color system yang sudah defined:

```
Background Colors:
- Page:     #F8FAF9
- Cards:    #FFFFFF
- Borders:  #E6EAE8
- Hover BG: #0F766E/5 (teal dengan opacity)

Text Colors:
- Heading:  #0F172A
- Body:     #374151
- Meta:     #6B7280

Accent:
- Primary:  #0F766E (teal)
- Hover:    #115E59 (darker teal)
- Light:    #0F766E/10 (teal badges)
```

---

## 📐 Layout Grid Reference

Saat di-integrate ke News/Index.tsx, akan menggunakan 4-column grid:

```
Desktop (1440px):
[1] [  6  ] [  3  ] [2]
    Main     Sidebar

Tablet (768px):
[       9       ] [3]
Main             Sidebar

Mobile (< 640px):
[    12    ]
Full width
```

---

## 🔄 Integration Checklist (Untuk Fase 2)

Saat siap integrate, gunakan checklist ini:

- [ ] Review component structure dengan user
- [ ] Approve responsive behavior
- [ ] Confirm data source untuk setiap section
- [ ] Add API endpoints di backend
- [ ] Create loading states lebih elegant
- [ ] Add error boundaries
- [ ] Performance optimization (lazy load)
- [ ] Test on mobile/tablet/desktop
- [ ] Add analytics tracking

---

## 📝 Mock Data Structure

Setiap component menggunakan mock data dengan struktur:

```tsx
// BeritaPopuler
{
  id: number;
  title: string;
  views: number;
}

// TagPopuler
{
  id: number;
  name: string;
  count: number;
}

// KolumOpini
{
  id: number;
  author: string;
  title: string;
  category: string;
}
```

---

## 🚀 Next Steps

**PHASE 2 (Ready for Approval)**:
1. Create API endpoints untuk data-fetching
2. Add error boundaries & loading states
3. Integrate ke News/Index.tsx dalam grid layout
4. Test responsiveness

**PHASE 3 (Polish)**:
1. Add animations & transitions
2. Optimize performance
3. Add analytics
4. SEO optimization

---

## 📞 Questions for Review

1. **Component Priority**: Mana yang paling penting untuk ditampilkan pertama?
2. **Data Source**: Dari API atau mock sementara?
3. **Analytics**: Perlu tracking untuk setiap section?
4. **Mobile Strategy**: Beberapa section bisa di-hide di mobile?
5. **Ad Placement**: Perlu ad slots di antara sections?

---

**Created**: 2026-01-20  
**Status**: Phase 1 Complete - Ready for Review  
**Files**: 12 components created  
**Breaking Changes**: NONE ✅
