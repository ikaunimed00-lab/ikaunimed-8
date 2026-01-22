# 📐 HOMEPAGE 4-AREA LAYOUT - VISUAL GUIDE

## FULL LAYOUT (XL DESKTOP ≥ 1280px)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          HEADER & NAVIGATION                               │
├────────────────────────────────────────────────────────────────────────────┤
│                         HERO SECTION (Featured Article)                    │
├────────────────────────────────────────────────────────────────────────────┤
│                         CATEGORY NAVIGATION                                │
├─────┬──────────────────────────────┬──────────────────┬───────────────────┤
│ ¹  │ ²                            │ ³               │ ⁴                 │
│    │                              │                 │                   │
│ ED │ MAIN CONTENT               │ SIDEBAR CONTENT │ ADS & CAMPAIGN   │
│ IT │ (6 sections)                │                 │                   │
│ OR │ 1. FlashContent            │ 1. EditorsPicks │ • Campaign CTA   │
│ IA │ 2. Berita Utama            │ 2. Berita       │ • Donation CTA   │
│ L  │ 3. PollingSection          │    Populer      │ • Info Box       │
│    │ 4. VideoPopular            │ 3. Tag Populer  │                   │
│ NA │ 5. KolumOpini              │ 4. Komentar     │ (Sticky)          │
│ VI │ 6. Berita Lainnya          │    Terbanyak    │                   │
│    │    + Pagination            │                 │                   │
│ GA │ (Sticky)                   │ (Sticky)        │                   │
│ TI │                              │                 │                   │
│ ON │                              │                 │                   │
│    │                              │                 │                   │
│ (1 │                            │                 │                   │
│ co │                            │                 │                   │
│ l) │                            │                 │                   │
│    │                            │                 │                   │
│ ST │ (6 col)                    │ (3 col)         │ (2 col)           │
│ IC │                            │                 │                   │
│ KY │                            │                 │                   │
└─────┴──────────────────────────────┴──────────────────┴───────────────────┘
│                                    FOOTER                                   │
└────────────────────────────────────────────────────────────────────────────┘

COLUMN DISTRIBUTION:
1 col (LEFT NAV) | 6 col (MAIN) | 3 col (CONTENT) | 2 col (ADS) = 12 cols ✓
```

---

## DESKTOP LAYOUT (1024px - 1280px)

```
┌──────────────────────────────────────────────────────────────────┐
│                      HEADER & NAVIGATION                         │
├──────────────────────────────────────────────────────────────────┤
│                    HERO SECTION (Featured)                       │
├──────────────────────────────────────────────────────────────────┤
│                    CATEGORY NAVIGATION                           │
├─────────────────────────────────┬──────────────────────────────┤
│ ²                               │ ³                           │
│ MAIN CONTENT                    │ SIDEBAR CONTENT             │
│ (6 col)                         │ (3 col)                     │
│                                 │                             │
│ 1. FlashContent                │ 1. EditorsPicks             │
│ 2. Berita Utama                │ 2. Berita Populer           │
│ 3. PollingSection              │ 3. Tag Populer              │
│ 4. VideoPopular                │ 4. Komentar Terbanyak       │
│ 5. KolumOpini                  │                             │
│ 6. Berita Lainnya              │ (Sticky)                    │
│    + Pagination                │                             │
│                                 │                             │
│ (Sticky)                        │                             │
└─────────────────────────────────┴──────────────────────────────┘
│                              FOOTER                              │
└──────────────────────────────────────────────────────────────────┘

LEFT NAV: HIDDEN ✗
ADS SIDEBAR: HIDDEN ✗
COLUMN DISTRIBUTION: 6 col (MAIN) | 3 col (CONTENT) = 9/12 cols
```

---

## TABLET LAYOUT (640px - 1024px)

```
┌────────────────────────────────────────────────────────┐
│               HEADER & NAVIGATION                      │
├────────────────────────────────────────────────────────┤
│              HERO SECTION (Featured)                   │
├────────────────────────────────────────────────────────┤
│              CATEGORY NAVIGATION                       │
├────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                           │
│ (md: col-span-9)                                       │
│                                                        │
│ 1. FlashContent                                        │
│ 2. Berita Utama                                        │
│ 3. PollingSection                                      │
│ 4. VideoPopular                                        │
│ 5. KolumOpini                                          │
│ 6. Berita Lainnya + Pagination                         │
├────────────────────────────────────────────────────────┤
│ SIDEBAR CONTENT                                        │
│ (lg: col-span-3)                                       │
│                                                        │
│ 1. EditorsPicks                                        │
│ 2. Berita Populer                                      │
│ 3. Tag Populer                                         │
│ 4. Komentar Terbanyak                                  │
└────────────────────────────────────────────────────────┘
│                           FOOTER                       │
└────────────────────────────────────────────────────────┘

LEFT NAV: HIDDEN ✗
ADS SIDEBAR: HIDDEN ✗
STACKING: Main content then Sidebar content below
COLUMN DISTRIBUTION: 9/12 total (responsive to lg:6+3)
```

---

## MOBILE LAYOUT (<640px)

```
┌──────────────────────────┐
│ HEADER & NAVIGATION      │
├──────────────────────────┤
│ HERO SECTION             │
├──────────────────────────┤
│ CATEGORY NAVIGATION      │
├──────────────────────────┤
│ MAIN CONTENT             │
│ (Full Width)             │
│                          │
│ 1. FlashContent          │
│    (responsive carousel) │
│ 2. Berita Utama          │
│    (featured article)    │
│ 3. PollingSection        │
│    (voting widget)       │
│ 4. VideoPopular          │
│    (1 col responsive)    │
│ 5. KolumOpini            │
│    (1 col responsive)    │
│ 6. Berita Lainnya        │
│    (news list)           │
│    Pagination            │
│                          │
│ [Ads after item 5]       │
│ [Ads after item 10]      │
├──────────────────────────┤
│        FOOTER            │
└──────────────────────────┘

LEFT NAV: HIDDEN ✗
SIDEBAR CONTENT: HIDDEN ✗
ADS SIDEBAR: HIDDEN ✗
SINGLE COLUMN STACK: Full responsive width
ALL SECTIONS READABLE & TOUCH FRIENDLY
```

---

## AREA DETAILS

### AREA 1: SIDEBAR KIRI (1 col) - XL ONLY

```
┌─────────────────┐
│ EDITORIAL       │
├─────────────────┤
│ • Berita Utama  │
│ • Tren Hari Ini │
│ • Video         │
│ • Opini         │
│ • Alumni Meraih │
│                 │
│ (Sticky top-24) │
└─────────────────┘

Styling: white card, border, light text links
Color: #0F766E (teal) on hover #115E59
Display: hidden xl:block
Position: sticky top-24
Width: 1 column (col-span-1)
```

### AREA 2: MAIN CONTENT (6 col) - ALL DEVICES

```
┌─────────────────────────────┐
│ 1. FLASHCONTENT             │
│    [Video Carousel]         │
├─────────────────────────────┤
│ 2. BERITA UTAMA             │
│    [Featured Article Card]  │
├─────────────────────────────┤
│ 3. POLLINGECTION            │
│    [Vote Widget]            │
├─────────────────────────────┤
│ 4. VIDEOPOPULAR             │
│    [3-col Video Grid]       │
├─────────────────────────────┤
│ 5. KOLUMOPINI               │
│    [Opinion Articles]       │
├─────────────────────────────┤
│ 6. BERITA LAINNYA           │
│    [News Item 1]            │
│    [News Item 2]            │
│    [AD after item 5]        │
│    [News Items...]          │
│    [AD after item 10]       │
│    [More News Items]        │
│    Pagination               │
│                             │
│ (sticky, space-y-8)         │
└─────────────────────────────┘

Width: 6 columns (col-span-6)
Responsive: md:col-span-9 → all devices
Spacing: space-y-8
Cards: white, border, rounded
Sticky: Yes (scrolling content stays)
```

### AREA 3: SIDEBAR KONTEN (3 col) - TABLET+

```
┌────────────────────┐
│ EDITORSPICKS       │
│ [Carousel]         │
├────────────────────┤
│ BERITAPOPULER      │
│ • News 1           │
│ • News 2           │
│ • News 3           │
│ • News 4           │
│ • News 5           │
│ • News 6           │
├────────────────────┤
│ TAGPOPULER         │
│ #Alumni #Kampus    │
│ #Networking #Event │
│ ... (12 tags)      │
├────────────────────┤
│ KOMENTARTERBANYAK  │
│ • Article 1        │
│ • Article 2        │
│ • Article 3        │
│ • Article 4        │
│ • Article 5        │
│                    │
│ (sticky, space-y-6)│
└────────────────────┘

Width: 3 columns (col-span-3)
Display: hidden md:block
Responsive: md:col-span-9 → lg:col-span-3
Sticky: Yes (top-24)
Spacing: space-y-6
Cards: white, border, rounded
Padding: md:p-5
```

### AREA 4: SIDEBAR IKLAN (2 col) - XL ONLY

```
┌──────────────────────┐
│ CAMPAIGN CTA         │
│ Gradient Teal Card   │
│ [Teal text content]  │
│ [White button]       │
├──────────────────────┤
│ DONATION CTA         │
│ White Card / Border  │
│ [Call to action]     │
│ [Teal button]        │
├──────────────────────┤
│ INFO BOX             │
│ Light Gray BG        │
│ [Portal info]        │
│                      │
│ (sticky, space-y-6)  │
└──────────────────────┘

Width: 2 columns (col-span-2)
Display: hidden xl:block
Sticky: Yes (top-24)
Spacing: space-y-6
Cards: Various (gradient, white, gray)
Purpose: CTAs, campaigns, donations
```

---

## RESPONSIVE GRID ANIMATION

```
Mobile (<640px)
┌────────┐
│ FULL   │
│ WIDTH  │
├────────┤
│ CONTENT│
├────────┤
│ ALL    │
│ STACK  │
└────────┘

↓ Grow to tablet

Tablet (640-1024px)
┌─────────────────────┐
│ 9/12 MAIN CONTENT   │
├─────────────────────┤
│ 9→3/12 SIDEBAR      │
└─────────────────────┘

↓ Grow to desktop

Desktop (1024-1280px)
┌────────────┬───────┐
│ 6/12 MAIN  │ 3 COL │
│            │ SIDE  │
└────────────┴───────┘

↓ Grow to XL

XL Desktop (≥1280px)
┌──┬────────────┬───────┬──┐
│1 │ 6/12 MAIN  │ 3 COL │2 │
│  │            │ SIDE  │  │
└──┴────────────┴───────┴──┘

SEAMLESS RESPONSIVE TRANSFORMATION ✓
```

---

## CONTENT FLOW (Main Area)

```
START: Top of Page
  ↓
[1] FlashContent (Video Carousel)
  ↓ space-y-8 (large spacing)
[2] Berita Utama (Featured Article)
  ↓ space-y-8
[3] PollingSection (Voting Widget)
  ↓ space-y-8
[4] VideoPopular (3-Column Grid)
  ↓ space-y-8
[5] KolumOpini (Opinion Articles)
  ↓ space-y-8
[6] Berita Lainnya (News List)
  │
  ├─ News Item 1
  ├─ News Item 2
  ├─ News Item 3
  ├─ News Item 4
  ├─ News Item 5
  ├─ [AD INSERTED]  ← After item 5
  ├─ News Item 6
  ├─ News Item 7
  ├─ ...
  ├─ News Item 10
  ├─ [AD INSERTED]  ← After item 10
  ├─ News Item 11
  └─ ... (remaining items)
  ↓
Pagination Controls
  ↓
END: Footer

FLOW OPTIMIZATION:
✓ Large spacing between major sections
✓ Tight spacing within news list
✓ Strategic ad placement
✓ Natural reading rhythm
```

---

## COLOR GUIDE

```
PRIMARY ACCENT
████████████ #0F766E (Teal) - Main theme color
████████████ #115E59 (Darker Teal) - Hover state

BACKGROUNDS
████████████ #FFFFFF (White) - Cards
████████████ #F8FAF9 (Light Gray) - Page background

BORDERS & DIVIDERS
████████████ #E6EAE8 (Subtle Gray) - Card borders

TEXT COLORS
████████████ #0F172A (Dark Blue-Gray) - Headlines
████████████ #374151 (Medium Gray) - Body text
████████████ #6B7280 (Light Gray) - Meta/Secondary

GRADIENTS
████████████ #0F766E → #115E59 (Campaign CTA gradient)
```

---

## BREAKPOINT REFERENCE

```
Mobile:     < 640px   (default Tailwind sm threshold)
Tablet:     640px     (Tailwind sm breakpoint)
Large:      768px     (Tailwind md breakpoint)
Desktop:    1024px    (Tailwind lg breakpoint)
XL:         1280px    (Tailwind xl breakpoint)
2XL:        1536px    (Tailwind 2xl breakpoint)

APPLIED BREAKPOINTS:
md:grid-cols-9    - Tablet responsive width
md:block           - Show sidebar at tablet+
lg:grid-cols-12   - Desktop full grid
lg:col-span-3     - Sidebar width at desktop
lg:col-span-6     - Main width at desktop
xl:block           - Show left nav at XL
xl:col-span-1     - Left nav at XL
xl:col-span-2     - Ads sidebar at XL
```

---

## STICKY BEHAVIOR

```
┌────────────────────────────┐
│ HEADER (fixed top)         │
├────────────────────────────┤
│ HERO SECTION               │
├────────────────────────────┤
│ CATEGORY NAV               │
├────────────────────────────┤
│ ↓ Scroll down below this   │
├─┬──────────────┬────────┬─┤
│L│ MAIN         │SIDEBAR │A│
│E│ (scrolls)    │(sticky)│D│
│F│              │top-24  │S│
│T│              │        │(s
│ │              │        │t
│N│              │        │i
│A│              │        │c
│V│              │        │k
│(│              │        │y
│s│              │        │)
│t│              │        │
│i│              │        │
│c│              │        │
│k│ ↓ Scroll up above this  │
│)│              │        │
└─┴──────────────┴────────┴─┘
│ FOOTER                     │
└────────────────────────────┘

STICKY ELEMENTS:
✓ Sidebar Kiri (top-24, XL)
✓ Sidebar Konten (top-24, MD+)
✓ Sidebar Iklan (top-24, XL)
✓ Main content (scrolls normally)

Offset: top-24 (below header ~96px)
```

---

## ✅ LAYOUT CHECKLIST

```
Grid System:
  ✓ 12-column layout
  ✓ Responsive grid-cols
  ✓ Proper gap spacing
  ✓ Mobile-first approach

4 Areas:
  ✓ Sidebar Left (1 col, XL)
  ✓ Main Content (6 col, all)
  ✓ Sidebar Content (3 col, MD+)
  ✓ Sidebar Ads (2 col, XL)

Responsiveness:
  ✓ Mobile stack
  ✓ Tablet 2-column
  ✓ Desktop 3-column
  ✓ XL 4-area full

Styling:
  ✓ Color consistency
  ✓ Card styling
  ✓ Spacing system
  ✓ Hover effects

Functionality:
  ✓ Sticky sidebars
  ✓ Content flow
  ✓ Ad placement
  ✓ Pagination
```

---

**Visual Guide Complete** ✓  
**Ready for Reference** ✓  
**Production Ready** ✓
