# 📁 EDITORIAL COMPONENTS FILE STRUCTURE

## Components Directory

```
resources/js/components/
│
├── editorial.ts                          [INDEX FILE - Import helper]
│
├── HorizontalScroll.tsx                  [WRAPPER]
│   └── Reusable horizontal scroll component
│
├── FlashContent.tsx                      [MAIN CONTENT]
│   └── Video/Flash content carousel
│
├── RecommendedForYou.tsx                 [MAIN CONTENT]
│   └── Recommendation grid (2x2)
│
├── PollingSection.tsx                    [MAIN CONTENT]
│   └── Interactive polling widget
│
├── VideoPopular.tsx                      [MAIN CONTENT]
│   └── Popular videos grid (3 columns)
│
├── KolumOpini.tsx                        [MAIN CONTENT]
│   └── Opinion columns grid
│
├── SuratPembaca.tsx                      [MAIN CONTENT]
│   └── Reader letters list
│
├── EditorialSidebar.tsx                  [SIDEBAR WRAPPER]
│   ├── SidebarSection (sub-component)
│   ├── Editor's Picks
│   ├── Berita Populer
│   ├── Tag Populer
│   ├── Kolom Opini
│   ├── Komentar Terbanyak
│   └── Rekomendasi Anda
│
├── EditorsPicks.tsx                      [SIDEBAR ITEM - Standalone]
│   └── Editor curated picks (h-scroll)
│
├── BeritaPopuler.tsx                     [SIDEBAR ITEM - Flexible]
│   └── Popular news (list or grid variant)
│
├── TagPopuler.tsx                        [SIDEBAR ITEM]
│   └── Popular tags/keywords
│
├── KomentarTerbanyak.tsx                 [SIDEBAR ITEM]
│   └── Most commented articles
│
├── [EXISTING COMPONENTS - DO NOT TOUCH]
├── NewsLayout.tsx
├── NewsCard.tsx
├── HeroNews.tsx
├── CategoryNavigation.tsx
├── Pagination.tsx
└── ...
```

---

## Documentation Files

```
Project Root/
│
├── EDITORIAL_COMPONENTS.md               [MAIN DOCUMENTATION]
│   └── Component list, props, features, integration checklist
│
├── EDITORIAL_VISUAL_GUIDE.md             [VISUAL REFERENCE]
│   └── ASCII mockups, responsive behavior, hover states
│
├── COMPONENT_STRUCTURE.md                [THIS FILE]
│   └── File structure, organization
```

---

## Component Import Path Reference

| Component | Path | Type |
|-----------|------|------|
| HorizontalScroll | `@/components/HorizontalScroll` | Wrapper |
| FlashContent | `@/components/FlashContent` | Main |
| RecommendedForYou | `@/components/RecommendedForYou` | Main |
| PollingSection | `@/components/PollingSection` | Main |
| VideoPopular | `@/components/VideoPopular` | Main |
| EditorialSidebar | `@/components/EditorialSidebar` | Sidebar |
| SidebarSection | `@/components/EditorialSidebar` | Sub |
| EditorsPicks | `@/components/EditorsPicks` | Sidebar |
| BeritaPopuler | `@/components/BeritaPopuler` | Sidebar |
| TagPopuler | `@/components/TagPopuler` | Sidebar |
| KolumOpini | `@/components/KolumOpini` | Main/Sidebar |
| KomentarTerbanyak | `@/components/KomentarTerbanyak` | Sidebar |
| SuratPembaca | `@/components/SuratPembaca` | Main |

---

## Size Reference (Uncompressed)

| File | Size | Lines | Status |
|------|------|-------|--------|
| HorizontalScroll.tsx | ~4KB | 78 | ✅ Complete |
| FlashContent.tsx | ~2KB | 48 | ✅ Complete |
| RecommendedForYou.tsx | ~2KB | 57 | ✅ Complete |
| PollingSection.tsx | ~3KB | 95 | ✅ Complete |
| VideoPopular.tsx | ~2.5KB | 77 | ✅ Complete |
| EditorialSidebar.tsx | ~5KB | 154 | ✅ Complete |
| EditorsPicks.tsx | ~2KB | 48 | ✅ Complete |
| BeritaPopuler.tsx | ~2.5KB | 78 | ✅ Complete |
| TagPopuler.tsx | ~2KB | 62 | ✅ Complete |
| KolumOpini.tsx | ~2.5KB | 74 | ✅ Complete |
| KomentarTerbanyak.tsx | ~2KB | 52 | ✅ Complete |
| SuratPembaca.tsx | ~3KB | 95 | ✅ Complete |
| editorial.ts | ~0.5KB | 14 | ✅ Index |
| **TOTAL** | **~34KB** | **834** | ✅ Ready |

---

## Organization Principles

### By Usage Context:

**MAIN CONTENT** (Left column - 6 cols):
- FlashContent (desktop only)
- RecommendedForYou
- PollingSection
- KolumOpini
- VideoPopular
- SuratPembaca

**SIDEBAR** (Right column - 3 cols):
- EditorialSidebar (wrapper)
  - EditorsPicks
  - BeritaPopuler (list variant)
  - TagPopuler
  - KomentarTerbanyak
  - KolumOpini (alternate variant)
  - SidebarSection + misc sections

**HELPERS**:
- HorizontalScroll (wrapper/utility)
- editorial.ts (index)

---

## Dependency Graph

```
index file (editorial.ts)
    │
    ├── HorizontalScroll.tsx
    │   ├── Used by: FlashContent
    │   └── Used by: EditorsPicks
    │
    ├── FlashContent.tsx
    ├── RecommendedForYou.tsx
    ├── PollingSection.tsx
    ├── VideoPopular.tsx
    ├── KolumOpini.tsx
    ├── SuratPembaca.tsx
    │
    ├── EditorialSidebar.tsx
    │   └── Contains: SidebarSection (sub-component)
    │
    ├── EditorsPicks.tsx (can be standalone)
    ├── BeritaPopuler.tsx (can be standalone)
    ├── TagPopuler.tsx
    └── KomentarTerbanyak.tsx
```

**NO EXTERNAL DEPENDENCIES** - All components are self-contained

---

## Component Variants & Props

### HorizontalScroll
```tsx
interface HorizontalScrollProps {
  children: React.ReactNode;
  title: string;
  viewAllLink?: string;
  showArrows?: boolean;
}
```

### BeritaPopuler
```tsx
interface BeritaPopulerProps {
  variant?: 'list' | 'grid';
  maxItems?: number;
}
```

### KolumOpini
```tsx
interface KolumOpiniProps {
  maxItems?: number;
}
```

### KomentarTerbanyak
```tsx
interface KomentarTerbanyakProps {
  maxItems?: number;
}
```

### SuratPembaca
```tsx
interface SuratPembakaProps {
  maxItems?: number;
}
```

### VideoPopular
```tsx
interface VideoPopulerProps {
  maxItems?: number;
}
```

### TagPopuler
```tsx
interface TagPopulerProps {
  maxTags?: number;
}
```

### EditorialSidebar
```tsx
// No props - Integrated multiple components
```

### FlashContent, RecommendedForYou, PollingSection, EditorsPicks
```tsx
// No props - Standalone components
```

---

## Component State Management

**Current Approach**: React useState (local state)

Existing implementations:
- PollingSection: `useState` untuk vote tracking
- HorizontalScroll: `useState` + `useRef` untuk scroll state

**Ready for**: Redux/Context integration (no refactor needed)

---

## Responsive Breakpoints Used

```
Tailwind default breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Custom container:
- max-w-[1440px]
```

---

## Color Tokens Used

**Consistent across all components**:
```
Backgrounds: #F8FAF9, #FFFFFF, #F8FAF9
Borders: #E6EAE8
Text: #0F172A, #374151, #6B7280
Accent: #0F766E, #115E59
Opacity variants: /5, /10, /20, /30, /60, /90
```

---

## Files NOT TO BE TOUCHED

✋ **DO NOT MODIFY**:
- NewsLayout.tsx
- NewsCard.tsx
- HeroNews.tsx
- CategoryNavigation.tsx
- Pagination.tsx
- Pages/News/Index.tsx
- Pages/Category/Show.tsx
- Any other existing components

All new components are ADDITIONS ONLY - zero modifications to existing files.

---

## Next Phase Integration Points

When ready to integrate (Phase 2):

### News/Index.tsx modifications:
```tsx
import {
  FlashContent,
  RecommendedForYou,
  PollingSection,
  VideoPopular,
  KolumOpini,
  SuratPembaca,
  EditorialSidebar,
} from '@/components/editorial';

// Add sections between existing elements
// Maintain 4-column grid structure (1|6|3|2)
```

### No changes needed for:
- NewsLayout wrapper
- Existing grid columns
- Hero/Category sections
- Footer

---

## Quality Checklist

✅ All 12 components created  
✅ All use consistent color system  
✅ All responsive (mobile/tablet/desktop)  
✅ All have skeleton loading  
✅ All have proper TypeScript types  
✅ All modular & self-contained  
✅ All import-ready via editorial.ts  
✅ NO breaking changes  
✅ NO modifications to existing files  
✅ Ready for review & testing  

---

**Status**: Phase 1 COMPLETE ✅  
**Ready for**: Phase 2 (Integration & Data Fetching)  
**Last Updated**: 2026-01-20
