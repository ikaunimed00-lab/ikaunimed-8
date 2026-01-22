# 📢 Ad Placement System Documentation

## Overview

Sistem ad placement profesional untuk portal berita IKA UNIMED, terinspirasi dari praktik industry leader seperti detik.com dan kompas.com. Sistem ini mendukung Google AdSense dan mudah dikonfigurasi.

---

## 📋 Architecture

### 1. Blade Components (Backend)
Located in `resources/views/components/ads/`:

- **`banner.blade.php`** - General purpose ad slot (300x250, 300x600, responsive)
- **`sidebar.blade.php`** - Sticky sidebar ads untuk desktop
- **`inline.blade.php`** - In-article ads yang tidak mengganggu konten
- **`list.blade.php`** - Ads di antara list items

### 2. React Components (Frontend)
Located in `resources/js/components/`:

- **`AdInline.tsx`** - Komponen untuk inline ads di artikel
- **`AdSidebar.tsx`** - Komponen untuk sticky sidebar ads
- **`AdListItem.tsx`** - Komponen untuk ads di antara list berita

### 3. Helper Class
Located in `app/Helpers/AdPlacement.php`:

Menyediakan helper methods untuk manage ad configuration:
```php
AdPlacement::isEnabled()              // Cek apakah ads enabled
AdPlacement::isSidebarEnabled()       // Cek sidebar ads
AdPlacement::isInlineEnabled()        // Cek inline ads
AdPlacement::isListAdEnabled()        // Cek list ads
AdPlacement::shouldShowListAdAfter(5) // Cek apakah tampilin ad setelah item ke-5
```

### 4. Styling
Located in `resources/css/ads.css`:

CSS global untuk semua ad placements dengan:
- Responsive breakpoints
- Smooth animations
- Print media support
- Dark mode ready
- Accessibility considerations

---

## 🎯 Placements

### A. Sidebar Ads (Desktop Only)
**Location:** Halaman berita & artikel (News/Index.tsx & News/Show.tsx via NewsSidebar)

**Features:**
- ✅ Sticky positioning di desktop
- ✅ Hidden di mobile
- ✅ Two slots: 300x250 + optional 300x600
- ✅ Smooth scroll behavior

**Usage:**
```tsx
import AdSidebar from '@/components/AdSidebar';

<AdSidebar showSecondSlot={true} />
```

**Configuration:**
```tsx
// Disable second slot
<AdSidebar showSecondSlot={false} />
```

---

### B. Inline Article Ads
**Location:** Tengah artikel (News/Show.tsx)

**Features:**
- ✅ Smart positioning (setelah paragraf ke-3 atau tengah)
- ✅ Tidak memotong heading/media
- ✅ Responsive layout
- ✅ Seamless content flow

**Implementation:**
Secara otomatis ditambahkan di Show.tsx dengan logic:
```tsx
// Hitung total paragraf dan sisipkan ad di tengah
const adPosition = Math.ceil(paragraphCount / 2);
```

**Result:**
- Artikel dengan 5 paragraf → Ad setelah paragraf ke-3
- Artikel dengan 10 paragraf → Ad setelah paragraf ke-5

---

### C. List Ad Items
**Location:** Halaman list berita (News/Index.tsx)

**Features:**
- ✅ Placement: Setelah item ke-5 dan ke-10
- ✅ Responsive: 728x90 (desktop) → 320x50 (mobile)
- ✅ Konsisten styling dengan news items
- ✅ Easy to customize positions

**Usage:**
```tsx
import AdListItem from '@/components/AdListItem';

{/* Automatically inserted after 5th & 10th items */}
{restNews.map((item, idx) => (
  <React.Fragment key={item.id}>
    <NewsCard {...item} />
    {(idx + 1 === 5 || idx + 1 === 10) && 
      <AdListItem afterItem={idx + 1} />
    }
  </React.Fragment>
))}
```

---

## 🔧 Configuration

### Toggle Ads On/Off

**Globally disable all ads:**
```php
// In your controller or service
use App\Helpers\AdPlacement;

AdPlacement::setEnabled(false);
```

**Selective disabling:**
```php
AdPlacement::setSidebarEnabled(false);  // Disable sidebar ads only
AdPlacement::setInlineEnabled(false);   // Disable inline ads only
AdPlacement::setListAdEnabled(false);   // Disable list ads only
```

### Customize Ad Positions

**Change inline ad position:**
Edit konfigurasi di `app/Helpers/AdPlacement.php`:
```php
'inline' => [
    'after_paragraph' => 3,  // Change to 4, 5, etc.
    'enabled' => true,
],
```

**Change list ad positions:**
```php
'list' => [
    'positions' => [5, 10],  // Change to [3, 8, 15], etc.
    'enabled' => true,
],
```

---

## 🔗 Google AdSense Integration

### Step 1: Get AdSense Credentials
1. Sign up di Google AdSense
2. Get Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
3. Create Ad Slots dan dapatkan slot IDs

### Step 2: Update Components

**React Components:**
```tsx
// In AdInline.tsx, AdSidebar.tsx, AdListItem.tsx
{/* Replace placeholder with production code */}
{!config('app.debug') && (
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-YOUR-ID"
       data-ad-slot="YOUR-SLOT-ID"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
)}
```

**Blade Components:**
```blade
{{-- In components/ads/banner.blade.php, etc. --}}
@if(!config('app.debug'))
  {{-- Production AdSense script --}}
@else
  {{-- Debug placeholder --}}
@endif
```

### Step 3: Environment Variable

Add to `.env`:
```
ADS_ENABLED=true
ADSENSE_PUBLISHER_ID=ca-pub-YOUR-ID
```

### Step 4: Load Script in Layout

Add ke `resources/views/app.blade.php`:
```html
@if(config('ads.enabled', false))
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ID"
        crossorigin="anonymous"></script>
@endif
```

---

## 📱 Responsive Behavior

### Desktop (lg+)
- Sidebar ads: **Fully visible** + sticky
- Inline ads: **Full width**
- List ads: **728x90** leaderboard

### Tablet (md)
- Sidebar ads: **Hidden**
- Inline ads: **Full width**
- List ads: **Responsive scaling**

### Mobile (sm)
- Sidebar ads: **Completely hidden**
- Inline ads: **Reduced height** (250px instead of 300px)
- List ads: **320x50** mobile banner

---

## 🎨 Styling Customization

### CSS Classes

**Main containers:**
- `.ad-container` - General wrapper
- `.ad-inline-container` - Inline ad wrapper
- `.ad-sidebar-wrapper` - Sidebar ad wrapper
- `.ad-list-item` - List ad item

**Inner elements:**
- `.ad-slot` - Individual ad slot
- `.ad-placeholder` - Placeholder content

### Modify Styles

Edit `resources/css/ads.css`:

```css
/* Example: Change ad colors */
.ad-slot {
  background: linear-gradient(135deg, #FF7E00, #FF9F3E);
}

/* Example: Change spacing */
.ad-inline-container {
  margin: 3rem 0; /* Increase spacing */
}
```

---

## 🧪 Development & Testing

### View Placeholder Ads

By default (in development), semua ads menampilkan placeholder:

```
📢 Ad Slot: ad-banner-default
300x250 • Display
```

### Enable Debug Mode

```php
// Force show placeholders even in production
config('app.debug', true);
```

### Monitor Ad Performance

In production, monitor via:
1. Google AdSense Dashboard
2. Backend analytics (track page views)
3. Browser DevTools → Network tab

---

## 📊 Ad Slot Reference

| Placement | Size | Position | Desktop | Mobile | Notes |
|-----------|------|----------|---------|--------|-------|
| Sidebar 1 | 300x250 | Right sidebar | ✅ | ❌ | Sticky |
| Sidebar 2 | 300x600 | Right sidebar | ✅ | ❌ | Optional |
| Inline | Responsive | Mid-article | ✅ | ✅ | Smart position |
| List 1 | 728x90 | After item 5 | ✅ | Auto-scale | Auto |
| List 2 | 728x90 | After item 10 | ✅ | Auto-scale | Auto |

---

## ⚙️ API Endpoints

Tidak ada API khusus untuk ads. Semua handled via:
- React components (frontend rendering)
- Blade components (if using server-side rendering)
- CSS styling (responsive behavior)

---

## 🚀 Deployment Checklist

- [ ] Google AdSense account created & verified
- [ ] Publisher ID dan Slot IDs obtained
- [ ] Update `ads.blade.php` dengan credentials
- [ ] Set `ADS_ENABLED=true` di production `.env`
- [ ] Test ads di staging environment
- [ ] Monitor ad performance first 24-48 hours
- [ ] Check click-through rates (CTR)
- [ ] Verify no layout breakage

---

## 🔍 Troubleshooting

### Ads not showing
1. Check if `ADS_ENABLED` is true in `.env`
2. Verify Google AdSense account status
3. Check browser console for errors
4. Ensure Publisher ID is correct

### Ads breaking layout
1. Check CSS conflicts in `resources/css/app.css`
2. Verify viewport meta tags
3. Test responsive breakpoints
4. Check Tailwind CSS precedence

### Blank ad placeholders
1. Normal in development mode
2. Check `config/app.debug` setting
3. Verify AdSense script loading
4. Check ad slot IDs

---

## 📚 File Structure

```
resources/
├── views/
│   └── components/ads/
│       ├── banner.blade.php      # General ad banner
│       ├── sidebar.blade.php      # Sticky sidebar ads
│       ├── inline.blade.php       # In-article ads
│       └── list.blade.php         # List item ads
│
├── js/
│   └── components/
│       ├── AdInline.tsx           # React inline ad
│       ├── AdSidebar.tsx          # React sidebar ad
│       └── AdListItem.tsx         # React list ad
│
├── css/
│   └── ads.css                    # Global ad styling
│
└── app/
    └── Helpers/
        └── AdPlacement.php        # Helper class
```

---

## 📝 Best Practices

### Content Quality
- ✅ Don't overload with ads (max 3 per page)
- ✅ Ensure ads don't block main content
- ✅ Maintain good content-to-ad ratio
- ✅ Keep ads above the fold on mobile

### User Experience
- ✅ Use responsive ad sizes
- ✅ Implement lazy loading untuk ad scripts
- ✅ Add visual separation between ads dan content
- ✅ No aggressive ad animations

### Performance
- ✅ Lazy load AdSense script
- ✅ Use async ad loading
- ✅ Cache ad impressions data
- ✅ Monitor page load time impact

---

## 🆘 Support & Updates

For issues atau questions, check:
1. Google AdSense Help Center: https://support.google.com/adsense
2. Laravel Blade Components Docs: https://laravel.com/docs/blade#components
3. React Best Practices: https://react.dev

---

**Last Updated:** January 19, 2026
**Version:** 1.0
**Status:** Production Ready ✅
