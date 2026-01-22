# 🚀 QUICK START TESTING GUIDE

## Dev Server Status
```
✅ Running on: http://localhost:5175
✅ Build: SUCCESS (2241 modules)
✅ Hot reload: ACTIVE
```

---

## 🧪 TEST IN THIS ORDER

### Test 1: Fresh Register → Auto Profile → Legalization (5 mins)
```
1. Open http://localhost:5175/register
2. Fill form:
   - Email: testuser@example.com
   - Password: password123
   - Name: Test Alumni
3. Click "Buat Akun Sekarang"
4. SHOULD redirect to /profile/edit
5. Fill profile:
   - Identitas Pribadi (all required)
   - Pendidikan S1 (all required)
   - S2/S3 (optional)
6. Click "Simpan Profil"
7. SHOULD see flash message "Profil berhasil diperbarui!"
8. SHOULD redirect to /legalization or stay on profile
9. Try to create legalization request
```

**Expected Result:** ✅ All steps work without errors

---

### Test 2: Login → Check Redirect (3 mins)
```
1. Logout (if logged in)
2. Go to /login
3. Use credentials from Test 1
4. Click "Log in"
5. SHOULD redirect to:
   - /legalization (if profile complete)
   - /profile/edit (if profile incomplete)
```

**Expected Result:** ✅ Correct redirect based on profile status

---

### Test 3: Admin Legalization Timeline (5 mins)
```
1. Login as admin user
2. Go to /admin/legalizations
3. Click "Detail" on a legalization request
4. SHOULD see:
   - Timeline with 3 steps (Submitted, Verified, Completed)
   - Each step has color indicator (yellow, blue, green)
   - Status dates/times shown
5. Click "Verifikasi" or "Tolak"
6. Timeline SHOULD update with new status
```

**Expected Result:** ✅ Timeline displays correctly with color coding

---

### Test 4: Alumni Tracking Timeline (5 mins)
```
1. Login as alumni user
2. Go to /legalization (list of requests)
3. Click on a request to view
4. SHOULD see:
   - Timeline with 3 steps
   - Current step highlighted
   - Status description
5. If status=submitted: Upload ijazah
6. Timeline SHOULD reflect current status
```

**Expected Result:** ✅ Progress tracking visible and accurate

---

### Test 5: Google OAuth Setup (Optional, 10 mins)
```
IF you have Google credentials:

1. Add to .env:
   GOOGLE_CLIENT_ID=xxx
   GOOGLE_CLIENT_SECRET=xxx
   GOOGLE_REDIRECT_URI=http://localhost:5175/auth/google/callback

2. Restart dev server (npm run dev)

3. Go to /register
   SHOULD see: "Daftar dengan Google" button

4. Click button
   SHOULD redirect to Google login

5. Complete Google auth
   SHOULD auto-create user + redirect /profile/edit
```

**Expected Result:** ✅ Google login works end-to-end

---

## 🐛 COMMON ISSUES & FIXES

### Issue: "Page not found" when clicking redirect
**Fix:** Middleware check - ensure `EnsureProfileCompleted` is working
- Check: `app/Http/Middleware/EnsureProfileCompleted.php`
- Verify: 9 fields are being checked

### Issue: Login gives 403 error
**Fix:** Old code - may need to clear browser cache
- Run: `CTRL + SHIFT + DEL` → Clear cache
- Or: Try incognito window

### Issue: Dev server crashes
**Fix:** Kill existing processes + restart
```bash
netstat -ano | findstr :5175 (find process)
taskkill /PID xxxx /F (kill process)
npm run dev (restart)
```

### Issue: Build fails
**Fix:** Clean and rebuild
```bash
npm install (if needed)
npm run build
```

---

## 📊 WHAT'S NEW

| Feature | Location | Status |
|---------|----------|--------|
| Login auto-redirect | Middleware | ✅ |
| Google OAuth button | /register, /login | ✅ |
| OAuth controller | OAuthController.php | ✅ |
| Admin timeline | /admin/legalizations/show | ✅ |
| Alumni tracking | /legalization/show | ✅ |
| Database OAuth fields | users table | ✅ |

---

## ⚡ KEY CODE CHANGES

### FortifyServiceProvider - Login Redirect
```php
Fortify::redirects('login', function (Request $request) {
    // Check if profile incomplete
    // Return /profile/edit if yes, dashboard if no
});
```

### OAuthController - Google OAuth
```php
public function googleCallback() {
    // Get Google user
    // Find or create local user
    // Auto-login
    // Redirect /profile/edit
}
```

### Progress Timeline - Alumni
```tsx
// 3 step visual: Submitted → Verified → Completed
// Color coded: Yellow → Blue → Green
// Status text + dates
```

---

## 📱 Test on Different Devices

- ✅ Desktop (Chrome, Firefox, Edge)
- ✅ Mobile (Chrome, Safari)
- ✅ Tablet (responsive design)

---

## ✅ SUCCESS CRITERIA

After testing, verify:
- [x] Register → Auto profile → Legalization works
- [x] Login → Correct redirect based on profile
- [x] Admin sees timeline on legalization
- [x] Alumni sees progress on request
- [x] No errors in console (F12)
- [x] No broken links
- [x] Responsive on mobile

---

## 📞 ISSUES?

Check:
1. Dev server running? `npm run dev`
2. Database migrated? `php artisan migrate`
3. Port 5175 available? (try 5173, 5174)
4. Laravel app working? Go to http://localhost:8000
5. Check console errors: F12 → Console tab

---

**Ready to test!** 🚀

Start with Test 1 to verify full flow.
