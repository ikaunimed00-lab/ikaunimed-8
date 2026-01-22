# 📢 Ad System - Quick Reference Guide

**For Developers & Admins**

---

## 🚀 Quick Start

### View Ad Placements
```
1. List Page:    http://ikaunimed-8.or.id.test/news
   - See sidebar ads on right (desktop only)
   - See list ads after items 5 & 10

2. Article Page: http://ikaunimed-8.or.id.test/news/any-slug
   - See inline ad in middle of article
   - See sidebar ads on right (desktop only)
```

---

## ⚙️ Enable/Disable Ads

### All Ads Off
```php
use App\Helpers\AdPlacement;
AdPlacement::setEnabled(false);
```

### Specific Types
```php
AdPlacement::setSidebarEnabled(false);  // No sidebar ads
AdPlacement::setInlineEnabled(false);   // No inline ads
AdPlacement::setListAdEnabled(false);   // No list ads
```

### Back To Normal
```php
AdPlacement::setEnabled(true);
```

---

## 🔧 Customize Positions

### Edit File: `app/Helpers/AdPlacement.php`

**Change inline ad position:**
```php
'inline' => [
    'after_paragraph' => 3,  // ← Change this
],
```

**Change list ad positions:**
```php
'list' => [
    'positions' => [5, 10],  // ← Change this
],
```

**Example:** Show ads after items 3, 8, 15
```php
'positions' => [3, 8, 15],
```

---

## 🎯 Ad Types & Sizes

### Sidebar Ads (Desktop Only)
```
Size:     300x250 + 300x600 (optional)
Position: Right sidebar
Sticky:   Yes, follows scroll
Mobile:   Hidden
```

### Inline Ads (In-Article)
```
Size:     Responsive / Auto
Position: Middle of article
Mobile:   Visible, reduced height
Location: After calculated paragraph
```

### List Ads (Between News)
```
Size:     728x90 (desktop) → 320x50 (mobile)
Position: After item #5 & #10
Mobile:   Auto-scaling
```

---

## 📊 Component Files Map

```
SIDEBAR ADS
  React:  components/AdSidebar.tsx
  Blade:  views/components/ads/sidebar.blade.php
  CSS:    css/ads.css (.ad-sidebar-wrapper)

INLINE ADS
  React:  components/AdInline.tsx
  Blade:  views/components/ads/inline.blade.php
  CSS:    css/ads.css (.ad-inline-container)

LIST ADS
  React:  components/AdListItem.tsx
  Blade:  views/components/ads/list.blade.php
  CSS:    css/ads.css (.ad-list-item)

HELPER
  Class:  app/Helpers/AdPlacement.php

PAGES USING ADS
  News/Index.tsx     (list ads + sidebar)
  News/Show.tsx      (inline ads + sidebar)
  NewsSidebar.tsx    (sidebar integration)
```

---

## 🐛 Troubleshooting

### Ads not showing?
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh page (Ctrl+Shift+R)
3. Check dev server still running (`npm run dev`)
4. Check browser console for errors

### Sidebar ads on mobile?
1. Check viewport width (should be < 1024px)
2. Test with browser DevTools mobile view
3. Verify CSS media query active

### Inline ad in wrong position?
1. Check article has 3+ paragraphs
2. Reload page
3. Check paragraph count manually

### List ads in wrong place?
1. Edit positions in `AdPlacement.php`
2. Reload page
3. Verify item counting (starts at 0)

---

## 💾 Files Created

**Total: 9 Files**

### Blade Components (4)
- ✅ `resources/views/components/ads/banner.blade.php`
- ✅ `resources/views/components/ads/sidebar.blade.php`
- ✅ `resources/views/components/ads/inline.blade.php`
- ✅ `resources/views/components/ads/list.blade.php`

### React Components (3)
- ✅ `resources/js/components/AdInline.tsx`
- ✅ `resources/js/components/AdSidebar.tsx`
- ✅ `resources/js/components/AdListItem.tsx`

### Other (2)
- ✅ `app/Helpers/AdPlacement.php`
- ✅ `resources/css/ads.css`

---

## 📝 Files Modified

**Total: 4 Files**

- ✅ `resources/js/Pages/News/Show.tsx` (added AdInline)
- ✅ `resources/js/Pages/News/Index.tsx` (added AdListItem)
- ✅ `resources/js/components/NewsSidebar.tsx` (added AdSidebar)
- ✅ `resources/js/app.tsx` (imported ads.css)

---

## 🔌 Google AdSense Integration

### 1. Get Publisher ID
```
Visit: https://www.google.com/adsense/start/
Get:   ca-pub-XXXXXXXXXXXXXXXX
```

### 2. Update React Components
In `AdInline.tsx`, `AdSidebar.tsx`, `AdListItem.tsx`:

Replace:
```tsx
data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
data-ad-slot="YOUR-SLOT-ID"
```

### 3. Add to .env
```
ADS_ENABLED=true
ADSENSE_PUBLISHER_ID=ca-pub-YOUR-ID
```

### 4. Add Script to Layout
In `resources/views/app.blade.php`:

```html
<script async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ID"
        crossorigin="anonymous"></script>
```

---

## 📱 Responsive Preview

### Desktop (1024px+)
```
┌────────────────────────────────────┐
│  Content (7 cols) │ Sidebar (5 cols)│
│                   │ [Ad: 300x250]   │
│  Article/List     │ [Ad: 300x600]   │
│  with ads inserted│ [Sticky scroll] │
└────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────┐
│  Content        │
│  Full Width     │
│  [Ad: 320x50]   │
│  More Content   │
│  [Ad: 320x50]   │
└─────────────────┘
(Sidebar Hidden)
```

---

## 🎨 CSS Classes

### Use Custom Styling
```css
/* Override ad colors */
.ad-inline {
  background: linear-gradient(135deg, #FF7E00, #FF9F3E);
}

/* Change sidebar width */
.ad-slot[style*="300px"] {
  width: 350px;
}

/* Custom ad spacing */
.ad-inline-container {
  margin: 3rem 0;
}
```

---

## 📊 Testing Commands

### Test Helper Class
```bash
php artisan tinker
> use App\Helpers\AdPlacement;
> AdPlacement::isEnabled()
> AdPlacement::getListAdPositions()
```

### Check CSS Load
```javascript
// In browser console
document.querySelector('.ad-inline-container')  // Should exist
```

### Verify Components
```bash
ls resources/js/components/Ad*.tsx
ls resources/views/components/ads/
```

---

## 🚀 Deployment Steps

1. **Staging**
   ```bash
   git add .
   git commit -m "Add ad placement system"
   git push origin feature/ads
   ```

2. **Testing**
   - Test all 3 ad types
   - Check responsiveness
   - Verify no layout breaks

3. **Production**
   ```bash
   git checkout main
   git merge feature/ads
   npm run build
   php artisan cache:clear
   ```

---

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| Ads not showing | Clear cache, reload |
| Sidebar on mobile | Check viewport width |
| Wrong inline position | Check paragraph count |
| Layout broken | Review CSS in ads.css |
| AdSense not working | Check Publisher ID |

---

## 📚 Full Documentation

- **Full Docs:** `AD_SYSTEM_DOCUMENTATION.md`
- **Implementation:** `AD_IMPLEMENTATION_SUMMARY.md`
- **Testing:** `AD_SYSTEM_TESTING_CHECKLIST.md`

---

## ✅ Checklist Before Deploy

- [ ] All ads rendering
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Styling looks good
- [ ] Performance acceptable
- [ ] AdSense credentials ready
- [ ] .env configured
- [ ] Tests passed

---

**Status:** ✅ Ready to Use  
**Last Updated:** January 19, 2026  
**Version:** 1.0
