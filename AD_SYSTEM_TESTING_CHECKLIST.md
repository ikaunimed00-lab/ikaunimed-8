# ✅ Ad Placement System - Testing Checklist

**Test Date:** January 19, 2026  
**Tester:** QA Team  
**Status:** Ready for Testing  

---

## 🧪 Desktop Testing (1024px+)

### List Page (/news) - Sidebar Ads
- [ ] Sidebar appears on right side
- [ ] Two ad placeholders visible (300x250 & 300x600)
- [ ] Sidebar has proper styling (gradient background)
- [ ] Sticky behavior works on scroll
- [ ] "Berita Populer" section above ads
- [ ] No layout shift when scrolling
- [ ] Typography readable
- [ ] Spacing consistent

### List Page (/news) - List Ads
- [ ] First ad appears after 5th news item
- [ ] Second ad appears after 10th news item
- [ ] Ads have consistent styling with list
- [ ] Ads don't break grid/layout
- [ ] Proper margins around ads
- [ ] Text readable in all screen sizes

### Article Page (/news/slug) - Inline Ads
- [ ] Ad appears in middle of article
- [ ] Ad positioned after paragraph 3-4
- [ ] Ad doesn't break heading/images
- [ ] Content flows naturally around ad
- [ ] Proper spacing above/below ad
- [ ] 300px minimum height respected

### Article Page (/news/slug) - Sidebar Ads
- [ ] Same sidebar behavior as list page
- [ ] Sidebar stays visible while scrolling
- [ ] Ads properly aligned with article width

---

## 📱 Mobile Testing (< 768px)

### List Page (/news) - Sidebar
- [ ] Sidebar **NOT visible** on mobile
- [ ] Content takes full width
- [ ] No layout shift
- [ ] No horizontal scroll

### List Page (/news) - List Ads
- [ ] Ads still appear between items
- [ ] Ads scale to mobile width (auto-scaling)
- [ ] Text readable on mobile
- [ ] No overflow

### Article Page (/news/slug) - Inline Ads
- [ ] Ad still visible
- [ ] Height reduced to 250px
- [ ] Responsive width (full minus padding)
- [ ] No content overlap

---

## 🎨 Visual Quality

### Styling
- [ ] Ad backgrounds have gradient
- [ ] Border colors consistent
- [ ] Rounded corners applied (4px)
- [ ] Shadow depth appropriate
- [ ] Orange accent (#FF7E00) used correctly

### Typography
- [ ] Font sizes readable
- [ ] Labels visible in debug mode
- [ ] No text overflow
- [ ] Line height appropriate

### Spacing
- [ ] 24px margin around inline ads (desktop)
- [ ] 16px margin around inline ads (mobile)
- [ ] 16px margin around list ads
- [ ] Proper gap between sidebar items

---

## ⚡ Performance

### Page Load
- [ ] No layout shift on load
- [ ] CSS loads with app.tsx
- [ ] No console errors
- [ ] Dev server responds quickly

### Interaction
- [ ] Smooth scroll with sticky sidebar
- [ ] No jank when scrolling
- [ ] Animations play smoothly
- [ ] Hover states work

### Browser Compatibility
- [ ] Chrome ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Edge ✅

---

## 🔧 Functionality Tests

### Configuration Helper
```php
// Test in Tinker
use App\Helpers\AdPlacement;

AdPlacement::isEnabled()               // Should return true
AdPlacement::isSidebarEnabled()        // Should return true
AdPlacement::isInlineEnabled()         // Should return true
AdPlacement::isListAdEnabled()         // Should return true
AdPlacement::shouldShowListAdAfter(5)  // Should return true
AdPlacement::shouldShowListAdAfter(6)  // Should return false
AdPlacement::getListAdPositions()      // Should return [5, 10]
```

### Toggle Functionality
```php
// Test enable/disable
AdPlacement::setEnabled(false);
// All ads should disappear from pages

AdPlacement::setEnabled(true);
// All ads should reappear
```

---

## 🌐 Responsive Breakpoints

### Test Breakpoints
- [ ] XS (< 640px) - Mobile
- [ ] SM (640px) - Small device
- [ ] MD (768px) - Tablet
- [ ] LG (1024px) - Desktop
- [ ] XL (1280px) - Large desktop
- [ ] 2XL (1536px) - Extra large

---

## 📊 Debug Mode Verification

### Debug Placeholders Showing
- [ ] "📢 Sidebar Ad 1" text visible
- [ ] "📢 Sidebar Ad 2" text visible
- [ ] "📢 In-Article Ad Slot" visible
- [ ] "📢 List Ad Item" visible
- [ ] Position information displayed

### Placeholder Details
- [ ] Size information shown (300x250, etc.)
- [ ] Position labels displayed
- [ ] Font sizes readable

---

## 🔐 Security & Compliance

### Markup
- [ ] No inline scripts in production (debug only)
- [ ] Proper data attributes for AdSense
- [ ] No sensitive data in placeholders
- [ ] Clean HTML structure

### Accessibility
- [ ] Semantic HTML tags
- [ ] Proper heading hierarchy maintained
- [ ] Ad sections properly labeled
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

---

## 📄 Documentation

### Files Check
- [ ] AD_SYSTEM_DOCUMENTATION.md exists ✅
- [ ] AD_IMPLEMENTATION_SUMMARY.md exists ✅
- [ ] Code comments present
- [ ] JSDoc comments in components
- [ ] Blade component comments present

---

## 🚀 Production Readiness

### Pre-Deployment
- [ ] All components created ✅
- [ ] All styling applied ✅
- [ ] Helper class functional ✅
- [ ] No console errors ✅
- [ ] Responsive design tested ✅

### AdSense Ready
- [ ] Components accept `data-ad-client` prop ✅
- [ ] Slot IDs configurable ✅
- [ ] Placeholder fallback working ✅
- [ ] Async script loading ready ✅

---

## 📝 Test Results Template

```
Test Case: [Name]
Device: [Device Type]
Browser: [Browser + Version]
Resolution: [Width x Height]

Passed: ✅ / ❌
Status: PASS / FAIL / PARTIAL
Issues Found: [List any issues]
Notes: [Additional notes]
```

---

## 🐛 Known Limitations

- [ ] Mobile sidebar intentionally hidden (design choice)
- [ ] Inline ad position calculated from HTML (not JSON)
- [ ] List ad positions hardcoded (configurable via helper)
- [ ] AdSense script loading is async (ads may load after page)

---

## ✨ Sign-Off

- [ ] All tests passed
- [ ] No critical issues
- [ ] Ready for staging deployment
- [ ] Ready for production deployment

**Tested By:** _________________  
**Date:** _________________  
**Notes:** _________________  

---

## 📞 Support Contacts

**Issue Reporting:** [GitHub Issues / Slack Channel]  
**AdSense Support:** support@google.com  
**Laravel Support:** laravel.com/discussion  

---

**Document Version:** 1.0  
**Last Updated:** January 19, 2026  
**Next Review:** January 26, 2026  
