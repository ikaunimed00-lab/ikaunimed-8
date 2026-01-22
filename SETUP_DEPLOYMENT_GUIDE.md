# 🚀 SETUP & DEPLOYMENT GUIDE

## Phase 1: Development Setup (Local)

### 1. Database Setup
```bash
# Run migrations
php artisan migrate

# Seed default categories
php artisan db:seed --class=CategorySeeder

# Verify
php artisan tinker
> Category::count()  // should be 8
> exit
```

### 2. Frontend Build
```bash
# Install dependencies (if not done)
npm install

# Build assets for development
npm run dev

# (or production)
npm run build
```

### 3. Storage Setup
```bash
# Create storage link for public disk
php artisan storage:link

# Verify
ls -la public/storage  # should show symlink

# Set permissions
chmod -R 755 storage/
chmod -R 755 public/storage
```

### 4. Test Locally
```bash
# Start dev server
php artisan serve

# Visit http://localhost:8000/news
# Check if homepage loads properly
```

---

## Phase 2: Pre-Production Checklist

### Configuration
- [ ] Copy `.env.example` → `.env`
- [ ] Set `APP_KEY` via `php artisan key:generate`
- [ ] Set `APP_DEBUG=false` (production)
- [ ] Set `APP_ENV=production`
- [ ] Configure database connection
- [ ] Set cache driver (recommend: `redis` or `file`)

### Security
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set secure cookies in `.env`
- [ ] Configure CORS if needed
- [ ] Setup rate limiting middleware
- [ ] Enable CSRF protection

### Performance
```bash
# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize code
php artisan optimize
```

### Clean Up
```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Remove debug files
rm -f bootstrap/cache/packages.php
rm -f bootstrap/cache/services.php
```

---

## Phase 3: Production Deployment

### Option A: Traditional Server (cPanel, Plesk, etc)

#### 1. Upload Files
```bash
# Via FTP/SFTP - upload semua file KECUALI:
# - .env.local (buat baru di server)
# - node_modules/ (rebuild di server)
# - storage/logs/* (akan dibuat auto)
# - storage/framework/cache/* (will be created)
```

#### 2. Server Configuration
```bash
# Connect via SSH
ssh user@yourdomain.com

# Go to project directory
cd /home/yourdomain/public_html/ikaunimed

# Install composer dependencies
composer install --optimize-autoloader --no-dev

# Install npm dependencies
npm ci

# Build frontend
npm run build

# Set permissions
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/

# Create .env file (copy from local, adjust for server)
nano .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Seed categories
php artisan db:seed --class=CategorySeeder

# Create storage link
php artisan storage:link

# Cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear old caches
php artisan cache:clear

# Set cron job untuk scheduled publishing (optional)
# crontab -e
# * * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1
```

### Option B: Cloud Server (AWS, DigitalOcean, Linode)

#### 1. Setup Ubuntu 22.04 LTS
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y php8.4 php8.4-{fpm,common,mysql,zip,gd,mbstring,curl,xml,bcmath}
sudo apt install -y nginx mysql-server redis-server composer nodejs npm

# Start services
sudo systemctl start nginx
sudo systemctl start mysql
sudo systemctl start redis-server
sudo systemctl enable nginx mysql redis-server
```

#### 2. Database Setup
```bash
# Create database
sudo mysql -e "CREATE DATABASE ikaunimed; CREATE USER 'ikaunimed'@'localhost' IDENTIFIED BY 'strong_password'; GRANT ALL ON ikaunimed.* TO 'ikaunimed'@'localhost'; FLUSH PRIVILEGES;"
```

#### 3. Nginx Configuration
```nginx
# /etc/nginx/sites-available/ikaunimed.com
server {
    listen 80;
    server_name ikaunimed.com www.ikaunimed.com;
    root /home/www-data/ikaunimed/public;
    index index.php;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ikaunimed.com www.ikaunimed.com;
    root /home/www-data/ikaunimed/public;
    index index.php;

    # SSL certificates (from Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/ikaunimed.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ikaunimed.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss;

    # PHP-FPM
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Laravel routing
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Storage access
    location /storage {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to .env dan hidden files
    location ~ /\. {
        deny all;
    }
}
```

#### 4. Application Deployment
```bash
# Clone from git (recommended)
cd /home/www-data
git clone https://github.com/yourname/ikaunimed.git
cd ikaunimed

# Or upload via SCP
# scp -r . user@server:/home/www-data/ikaunimed/

# Setup application
composer install --optimize-autoloader --no-dev
npm ci && npm run build

# Configure
cp .env.example .env
# Edit .env dengan production values
php artisan key:generate

# Database
php artisan migrate --force
php artisan db:seed --class=CategorySeeder

# Permissions
chown -R www-data:www-data /home/www-data/ikaunimed
chmod -R 755 storage/ bootstrap/cache/

# Storage link
php artisan storage:link

# Caching
php artisan config:cache
php artisan route:cache
php artisan view:cache

# SSL with Let's Encrypt
sudo certbot certonly --standalone -d ikaunimed.com -d www.ikaunimed.com
```

### Option C: Docker Deployment
```dockerfile
# Dockerfile
FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    libmysqlclient-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    && docker-php-ext-install pdo_mysql zip gd

WORKDIR /app

COPY . /app
COPY --chown=www-data:www-data . /app

RUN composer install --optimize-autoloader --no-dev
RUN npm ci && npm run build

EXPOSE 9000
CMD ["php-fpm"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    volumes:
      - .:/app
    depends_on:
      - db
      - redis
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - .:/app

  db:
    image: mysql:8.0
    environment:
      - MYSQL_DATABASE=ikaunimed
      - MYSQL_PASSWORD=password
      - MYSQL_ROOT_PASSWORD=root

  redis:
    image: redis:7-alpine
```

---

## Phase 4: Post-Deployment

### 1. Verify Installation
```bash
# Check homepage loads
curl https://ikaunimed.com/news

# Check sitemap
curl https://ikaunimed.com/sitemap.xml

# Check API
curl https://ikaunimed.com/kategori
```

### 2. Submit to Google
```
1. Google Search Console:
   - Add property: https://ikaunimed.com
   - Add sitemap: /sitemap.xml
   
2. Google News:
   - Go to: https://news.google.com/news/publisher-center
   - Submit publication
   - Add sitemap: /sitemap/google-news.xml
   - Wait 7-14 days for approval
```

### 3. Monitor Performance
```bash
# Setup monitoring
- Install New Relic or DataDog APM
- Monitor error logs: tail -f storage/logs/laravel.log
- Monitor server: htop, iotop
- Setup alerts for errors, high CPU, low disk space
```

### 4. Setup Backups
```bash
# Automated database backup (cron)
0 2 * * * mysqldump -u ikaunimed -p'password' ikaunimed | gzip > /backup/ikaunimed_$(date +\%Y\%m\%d).sql.gz

# Backup uploaded files
0 3 * * * tar -czf /backup/ikaunimed_$(date +\%Y\%m\%d).tar.gz /home/www-data/ikaunimed/storage/app/public/news/
```

### 5. Setup Cron Jobs (Optional)
```bash
# For scheduled publishing
* * * * * cd /home/www-data/ikaunimed && php artisan schedule:run >> /dev/null 2>&1

# For cache clearing (daily at 2 AM)
0 2 * * * cd /home/www-data/ikaunimed && php artisan cache:clear
```

---

## Phase 5: Maintenance

### Weekly Tasks
- [ ] Check error logs
- [ ] Monitor database size
- [ ] Verify backups running
- [ ] Test news creation/editing

### Monthly Tasks
- [ ] Update packages: `composer update`, `npm update`
- [ ] Review analytics
- [ ] Optimize images (if needed)
- [ ] Clean old logs

### Quarterly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Database maintenance (OPTIMIZE, ANALYZE)
- [ ] Update SSL certificate (auto-renewal setup)

---

## Environment Variables (.env)

```env
# App
APP_NAME=IKAUNIMED
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:xxxxxxxxxxxxx
APP_URL=https://ikaunimed.com

# Database
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=ikaunimed
DB_USERNAME=ikaunimed
DB_PASSWORD=strong_password

# Cache
CACHE_DRIVER=redis
CACHE_PREFIX=ikaunimed_

# Session
SESSION_DRIVER=cookie
SESSION_LIFETIME=120

# Redis
REDIS_HOST=localhost
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail (optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=xxxxx
MAIL_PASSWORD=xxxxx
```

---

## Troubleshooting

### 500 Error
```bash
# Check logs
tail -f storage/logs/laravel.log

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Check permissions
chmod -R 755 storage/ bootstrap/cache/
chown -R www-data:www-data /path/to/app
```

### Database Connection Error
```bash
# Verify .env credentials
cat .env | grep DB_

# Test connection
php artisan tinker
> DB::connection()->getPdo()

# Check MySQL running
sudo systemctl status mysql
```

### File Upload Issues
```bash
# Check storage link
ls -la public/storage

# Recreate if broken
php artisan storage:link

# Check permissions
chmod -R 755 storage/app/public/news/
chmod -R 755 public/storage/
```

### Cache Issues
```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Restart Redis (if using)
sudo systemctl restart redis-server
```

---

## Performance Optimization

### Server
- Enable gzip compression ✅
- Setup CDN for static assets
- Enable HTTP/2 ✅
- Setup Redis for caching ✅
- Use SSD storage

### Database
- Run OPTIMIZE periodically: `OPTIMIZE TABLE news, categories, users;`
- Use proper indexes ✅
- Archive old logs

### Application
- Enable query caching ✅
- Enable view caching ✅
- Enable route caching ✅
- Minify CSS/JS ✅
- Lazy load images ✅

---

**Last Updated**: January 19, 2026  
**Version**: 1.0.0
