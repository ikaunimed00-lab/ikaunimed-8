# 🚀 Multi-Role Dashboard - Commands & Quick Setup

**Fast Reference for Running the Multi-Role Dashboard**

---

## ⚡ ONE-COMMAND SETUP

```bash
php artisan migrate && npm run build && php artisan cache:clear
```

Then access dashboards at:
- `http://localhost:8000/dashboard/subscriber`
- `http://localhost:8000/dashboard/admin`
- `http://localhost:8000/dashboard/editor`
- `http://localhost:8000/dashboard/writer`

---

## 📋 STEP-BY-STEP COMMANDS

### Step 1: Database Setup
```bash
# Run migrations
php artisan migrate

# Verify tables created
php artisan tinker
>>> Notification::count()  # Should return 0
>>> exit
```

### Step 2: Frontend Build
```bash
# Production build
npm run build

# OR development build with watch
npm run dev
```

### Step 3: Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:cache --forget
```

### Step 4: Create Test Users
```bash
php artisan tinker

# Make user a subscriber
$user = User::find(1);
$user->role = 'subscriber';
$user->save();

# Make another user an admin
$admin = User::find(2);
$admin->role = 'admin';
$admin->save();

# Check roles
User::all(['id', 'name', 'role'])
exit
```

### Step 5: Test Dashboards
```bash
# In browser
http://localhost:8000/dashboard/subscriber  # Login as subscriber
http://localhost:8000/dashboard/admin       # Login as admin
http://localhost:8000/dashboard/editor      # Login as editor
http://localhost:8000/dashboard/writer      # Login as writer
```

---

## 🔧 USEFUL COMMANDS

### Development
```bash
# Start development server
php artisan serve

# Watch frontend changes
npm run dev

# Rebuild frontend
npm run build
```

### Database
```bash
# Show all migrations
php artisan migrate:status

# Rollback last migration
php artisan migrate:rollback

# Fresh database (CAUTION: Deletes data!)
php artisan migrate:fresh

# Seed database
php artisan db:seed
```

### Cache & Optimization
```bash
# Clear all cache
php artisan cache:clear

# Clear config cache
php artisan config:clear

# Clear view cache
php artisan view:cache --forget

# Optimize everything
php artisan optimize
```

### Tinker (Interactive Shell)
```bash
# Start tinker
php artisan tinker

# Inside tinker:
>>> User::first()                          # Get first user
>>> User::where('role', 'admin')->first()  # Get admin
>>> Notification::all()                    # Get all notifications
>>> route('dashboard.subscriber')          # Get route URL
>>> Auth::attempt(['email' => 'user@test.com', 'password' => 'password'])
>>> exit                                   # Exit tinker
```

### Routes
```bash
# List all routes
php artisan route:list

# List dashboard routes only
php artisan route:list | grep dashboard

# List API routes only
php artisan route:list --api
```

### Files & Permissions
```bash
# Fix storage permissions
chmod -R 755 storage/

# Fix public storage permissions
chmod -R 755 public/storage

# Create storage symlink
php artisan storage:link
```

---

## 🧪 TESTING COMMANDS

### Test Subscriber Flow
```bash
# 1. Login as subscriber
# 2. Access http://localhost:8000/dashboard/subscriber
# 3. Create legalization request
# 4. Submit

# Verify in database:
php artisan tinker
>>> Legalization::where('user_id', 1)->first()
>>> exit
```

### Test Admin Approval
```bash
# 1. Login as admin
# 2. Access http://localhost:8000/dashboard/admin
# 3. Find subscriber's request
# 4. Click review
# 5. Approve or reject

# Verify notification created:
php artisan tinker
>>> Notification::where('user_id', 1)->first()
>>> exit
```

### Test Notifications
```bash
php artisan tinker

# Get all notifications
>>> Notification::all()

# Get notifications for user
>>> Notification::where('user_id', 1)->get()

# Get unread notifications
>>> Notification::where('user_id', 1)->whereNull('read_at')->get()

# Mark as read
>>> $n = Notification::first()
>>> $n->markAsRead()

# Check unread count
>>> User::find(1)->unreadNotificationsCount()

exit
```

---

## 🔍 DEBUGGING COMMANDS

### Check Migrations
```bash
# List all migrations
php artisan migrate:status

# Show pending migrations
php artisan migrate:status | grep Pending
```

### Check Models
```bash
php artisan tinker

# Verify User model
>>> $user = User::first()
>>> $user->role
>>> $user->notifications()->count()
>>> $user->legalizations()->count()

# Verify Notification model
>>> Notification::first()

# Verify relationships
>>> User::first()->notifications()->get()

exit
```

### Check Routes
```bash
# List dashboard routes
php artisan route:list | grep dashboard

# Show specific route
php artisan route:list | grep notification
```

### Check Database
```bash
# Show users table structure
php artisan tinker
>>> Schema::getColumnListing('users')
>>> Schema::getColumnListing('notifications')
>>> exit
```

### Check Errors
```bash
# View last error
tail -f storage/logs/laravel.log

# Clear errors
> storage/logs/laravel.log

# Check for 403/404
grep "403\|404" storage/logs/laravel.log
```

---

## 🚀 PRODUCTION COMMANDS

### Before Deploy
```bash
# Verify everything works
php artisan migrate --dry-run

# Build frontend
npm run build

# Optimize
php artisan optimize

# Check storage
du -sh storage/
```

### Deploy
```bash
# Run migrations
php artisan migrate --force

# Clear cache
php artisan cache:clear

# Cache routes
php artisan route:cache

# Cache config
php artisan config:cache

# Check status
php artisan tinker
>>> Cache::all()
>>> exit
```

### Monitor
```bash
# Watch logs
tail -f storage/logs/laravel.log

# Check disk space
df -h

# Check database
php artisan tinker
>>> User::count()
>>> Notification::count()
>>> Legalization::count()
>>> exit
```

---

## 📊 QUICK STATS COMMANDS

```bash
php artisan tinker

# User statistics
>>> User::count()
>>> User::where('role', 'admin')->count()
>>> User::where('role', 'subscriber')->count()

# Legalization statistics
>>> Legalization::count()
>>> Legalization::where('status', 'pending')->count()
>>> Legalization::where('status', 'approved')->count()
>>> Legalization::where('status', 'rejected')->count()

# Notification statistics
>>> Notification::count()
>>> Notification::whereNull('read_at')->count()
>>> Notification::whereNotNull('read_at')->count()

# Recent activities
>>> Legalization::latest()->limit(10)->get()
>>> Notification::latest()->limit(10)->get()

exit
```

---

## 🆘 TROUBLESHOOTING COMMANDS

### Issue: Routes not found
```bash
# Refresh routes
php artisan route:clear
php artisan route:cache

# Verify routes exist
php artisan route:list | grep dashboard
```

### Issue: Permissions error
```bash
# Fix all permissions
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/
chmod 777 storage/logs/

# Verify
ls -la storage/
ls -la bootstrap/
```

### Issue: Database error
```bash
# Check connection
php artisan tinker
>>> DB::connection()->getPdo()

# Check migrations table
>>> DB::table('migrations')->get()

# Verify tables exist
>>> Schema::hasTable('users')
>>> Schema::hasTable('notifications')

exit
```

### Issue: Frontend not working
```bash
# Check build
ls -la public/build/

# Rebuild
npm run build

# Check Vite config
cat vite.config.ts

# Clear cache
npm cache clean --force
```

### Issue: Can't login
```bash
# Verify users
php artisan tinker
>>> User::all()

# Reset password
>>> $user = User::find(1)
>>> $user->password = Hash::make('password')
>>> $user->save()

exit
```

---

## 💡 HELPFUL ALIASES

Add to `.bashrc` or `.zshrc` for quick access:

```bash
# Laravel commands
alias pa='php artisan'
alias pat='php artisan tinker'
alias pam='php artisan migrate'
alias par='php artisan route:list'

# NPM commands
alias nrd='npm run dev'
alias nrb='npm run build'

# Quick dashboard check
alias dashcheck='php artisan tinker <<< "User::first(); Notification::count(); Legalization::count(); exit"'

# Quick logs
alias logs='tail -f storage/logs/laravel.log'

# Quick cache clear
alias cache-clear='php artisan cache:clear && php artisan config:clear'
```

Then use:
```bash
pa migrate
pat
nrd
logs
cache-clear
dashcheck
```

---

## 📝 COMMON WORKFLOWS

### Workflow 1: Daily Development
```bash
# Start
php artisan serve      # Terminal 1
npm run dev            # Terminal 2

# Make changes, save automatically
# Test in browser
# Check logs if issues

# Before commit
npm run build
php artisan cache:clear
```

### Workflow 2: Testing All Features
```bash
php artisan migrate
npm run build

# Test subscriber
# Login as subscriber
# Create legalization
# Check dashboard

# Test admin
# Login as admin
# View legalization
# Approve/reject
# Check notification

# Repeat for editor and writer
```

### Workflow 3: Production Deployment
```bash
# Local testing
npm run build
php artisan migrate

# Push to production
# On production server:
php artisan migrate --force
php artisan cache:clear
npm run build          # Or just upload built files
```

---

## 🎯 One-Liner Reference

```bash
# Setup
php artisan migrate && npm run build && php artisan cache:clear

# Development
php artisan serve & npm run dev

# Testing
php artisan migrate:fresh --seed && npm run build

# Production
php artisan migrate --force && php artisan optimize

# Debug
php artisan tinker

# Monitor
tail -f storage/logs/laravel.log

# Quick stats
php artisan tinker <<< "Notification::count(); Legalization::count(); User::count(); exit"
```

---

## 📚 Command Categories

### Essential (Must Know)
- `php artisan migrate` - Run migrations
- `npm run build` - Build frontend
- `php artisan tinker` - Interactive shell
- `php artisan serve` - Start dev server

### Important (Should Know)
- `php artisan migrate:rollback` - Undo migrations
- `php artisan cache:clear` - Clear cache
- `php artisan route:list` - List routes
- `npm run dev` - Development watch

### Nice to Have (Good to Know)
- `php artisan db:seed` - Seed database
- `php artisan optimize` - Optimize
- `php artisan storage:link` - Link storage
- `npm cache clean` - Clear npm cache

---

**Last Updated:** January 20, 2026
**Version:** 1.0
**Ready for:** Developers, DevOps, System Admins

🎉 **Everything set up!**
