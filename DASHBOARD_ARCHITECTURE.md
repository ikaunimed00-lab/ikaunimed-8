# Multi-Role Dashboard - System Architecture

**ikaunimed.or.id Dashboard System - Visual Overview**

---

## 🏗️ HIGH-LEVEL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                         PUBLIC WEB                              │
│                      (Homepage, News, etc)                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                    LOGIN / OAUTH
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    SUBSCRIBER             ADMIN             EDITOR / WRITER
    (Alumni)          (Administrator)       (Content Creator)
        │                   │                   │
        ▼                   ▼                   ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  DASHBOARD   │  │  DASHBOARD   │  │  DASHBOARD   │
  │  /subscriber │  │   /admin     │  │  /editor     │
  │              │  │              │  │              │
  │ • Legalisasi │  │ • Kelola     │  │ • Kelola     │
  │ • Status     │  │   Legalisasi │  │   Konten     │
  │ • Download   │  │ • Approve/   │  │ • Publish    │
  │   Dokumen    │  │   Reject     │  │              │
  │ • Notifikasi │  │ • Kelola     │  │ /writer      │
  │              │  │   Users      │  │              │
  │              │  │ • Notifikasi │  │ • Buat       │
  │              │  │              │  │   Artikel    │
  └──────────────┘  └──────────────┘  │ • Submit     │
        │                   │          │   Review    │
        │                   │          │ • Notifikasi│
        │                   │          └──────────────┘
        │                   │                  │
        └───────────────────┼──────────────────┘
                            │
        ┌───────────────────┴──────────────────┐
        │                                      │
        ▼                                      ▼
   ┌─────────────────────────┐      ┌────────────────┐
   │  BACKEND (Laravel 12)   │      │  FRONTEND      │
   │                         │      │  (React 19)    │
   │ • DashboardController   │      │                │
   │ • LegalizationAdmin     │      │ • DashboardLay-│
   │ • NotificationControll  │      │   out Component│
   │ • Models & Routes       │      │ • 8 React Pgs  │
   │                         │      │ • Tailwind CSS │
   └──────────────┬──────────┘      └────────────────┘
                  │                         ▲
                  └─────── Inertia.js ──────┘
                  (SPA Communication)

        ┌─────────────────────────────────────────┐
        │  DATABASE (SQLite/MySQL)                │
        │                                         │
        │  ├── users (updated)                   │
        │  ├── notifications (new)               │
        │  ├── legalizations (existing)          │
        │  ├── legalization_files (existing)     │
        │  └── other tables...                   │
        └─────────────────────────────────────────┘
```

---

## 📊 DATA FLOW ARCHITECTURE

### Subscriber Legalization Flow
```
┌─────────────┐
│  SUBSCRIBER │
└──────┬──────┘
       │ 1. Login
       ▼
   ┌──────────────────────┐
   │ /dashboard/subscriber│
   └──────┬───────────────┘
          │ 2. Click "Ajukan Legalisir"
          ▼
   ┌──────────────────────┐
   │ Create Form Component│ (React)
   └──────┬───────────────┘
          │ 3. Fill form + upload
          ▼
   ┌──────────────────────┐
   │ POST /legalization   │ (Laravel API)
   │ - Save to DB         │
   │ - Create record      │
   │ - Set status PENDING │
   └──────┬───────────────┘
          │ 4. Record created
          ▼
   ┌──────────────────────┐
   │ Dashboard Shows      │
   │ Status: PENDING      │ (React Component)
   └──────────────────────┘


        SUBSCRIBER SIDE DONE
        ================================
        ADMIN TAKES OVER


   ┌──────────┐
   │  ADMIN   │
   └────┬─────┘
        │ 1. Login
        ▼
    ┌────────────────────┐
    │ /dashboard/admin   │
    └────┬───────────────┘
         │ 2. View all legalization requests
         ▼
    ┌────────────────────────┐
    │ List with filters      │ (React Table)
    │ • Filter by status     │
    │ • Search by user       │
    │ • Date range           │
    └────┬───────────────────┘
         │ 3. Click "Review"
         ▼
    ┌────────────────────────┐
    │ /admin/legalizations/{id}
    │ Show detail:           │
    │ • User info            │
    │ • Legalization details │
    │ • Uploaded documents   │
    │ • Approve/Reject btn   │
    └────┬───────────────────┘
         │ 4. Admin approves
         │    POST /approve
         ▼
    ┌────────────────────────┐
    │ LegalizationAdmin      │
    │ Controller:            │ (Laravel)
    │ • Update status        │
    │ • Create Notification  │
    │ • Send to user         │
    └────┬───────────────────┘
         │ 5. Notification created
         ▼
    ┌────────────────────────┐
    │ Notification Table     │
    │ - user_id: subscriber  │ (Database)
    │ - status: success      │
    │ - message: Approved    │
    │ - created_at: now      │
    └────┬───────────────────┘
         │ 6. Notification shows
         │    in notification bell
         ▼
    ┌─────────────┐
    │ SUBSCRIBER  │ (Back to subscriber)
    │ Sees        │
    │ Notification│
    │ + Downloads │
    │ Dokumen     │
    └─────────────┘
```

### Notification Flow
```
┌─────────────────────────────────┐
│  ACTION TRIGGERS NOTIFICATION    │
│  (Admin approve/reject)          │
└──────────────┬──────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ NotificationController   │
    │ .create()                │ (Laravel)
    │                          │
    │ New Notification(        │
    │   user_id: X,            │
    │   title: "Status Changed"│
    │   message: "Approved...", │
    │   type: 'success',       │
    │   action_url: URL,       │
    │ )                        │
    └──────────────┬───────────┘
                   │ Save to DB
                   ▼
        ┌──────────────────────┐
        │ notifications table  │ (Database)
        │ ├─ id: 123          │
        │ ├─ user_id: 1       │
        │ ├─ title: ...       │
        │ ├─ read_at: null    │
        │ └─ created_at: now  │
        └──────────────┬───────┘
                       │
                       ▼ (User refreshes or bell checked)
            ┌──────────────────────┐
            │ NotificationBell     │
            │ Component (React)    │
            │                      │
            │ GET /api/            │
            │ notifications        │
            └──────────────┬───────┘
                           │ Fetch from API
                           ▼
            ┌──────────────────────┐
            │ NotificationController│
            │ .index()             │ (Laravel)
            │ Return unread count  │
            │ & notifications      │
            └──────────────┬───────┘
                           │ JSON response
                           ▼
            ┌──────────────────────┐
            │ Notification Bell    │
            │ Shows badge with     │ (React)
            │ unread count:  "1"   │
            │                      │
            │ List notifications:  │
            │ ├─ [✓] "Status      │
            │ │     Changed..."    │
            │ ├─ [✓] "Approved..." │
            │ └─ [✓] "..."        │
            │                      │
            │ [Mark all as read]   │
            │ [Delete]             │
            └──────────────┬───────┘
                           │ User clicks notification
                           ▼
            ┌──────────────────────────┐
            │ Mark as read             │
            │ POST /api/notifications  │
            │ /{id}/read               │ (API Call)
            └──────────────┬───────────┘
                           │ Update in DB
                           ▼
            ┌──────────────────────────┐
            │ Update: read_at = now    │ (Database)
            └──────────────┬───────────┘
                           │
                           ▼ Redirect to dashboard
            ┌──────────────────────────┐
            │ /dashboard/subscriber    │ (React Router)
            │ Shows status: APPROVED   │
            │ Can download dokumen     │
            └──────────────────────────┘
```

---

## 🗂️ FILE STRUCTURE DIAGRAM

```
app/
├── Models/
│   ├── User.php (UPDATED)
│   │   ├── notifications() ────────┐
│   │   ├── legalizations()         │
│   │   └── Role helpers            │
│   ├── Notification.php (NEW)      │
│   │   ├── markAsRead()            │
│   │   ├── user()                  │
│   │   └── scopeUnreadForUser()    │
│   └── Legalization.php (EXISTING) │
│       ├── user()                  │
│       └── files()                 │
│
├── Http/
│   ├── Controllers/
│   │   └── Dashboard/ (NEW)
│   │       ├── DashboardController.php
│   │       │   ├── subscriberDashboard()
│   │       │   ├── adminDashboard()
│   │       │   ├── editorDashboard()
│   │       │   └── writerDashboard()
│   │       ├── LegalizationAdminController.php
│   │       │   ├── index()
│   │       │   ├── show()
│   │       │   ├── approve()
│   │       │   ├── reject()
│   │       │   └── updateNote()
│   │       └── NotificationController.php
│   │           ├── index()
│   │           ├── markAsRead()
│   │           ├── markAllAsRead()
│   │           ├── unreadCount()
│   │           └── destroy()
│   │
│   └── Middleware/
│       ├── EnsureUserRole.php (Already exists)
│       └── EnsureProfileCompleted.php
│
├── Kernel.php (NO CHANGES - middleware already registered)
└── ...

database/
├── migrations/
│   ├── 2026_01_20_100001_add_dashboard_columns.php
│   │   └── Add to users table:
│   │       ├── last_dashboard_visit
│   │       ├── email_notifications
│   │       └── notification_preference
│   │
│   └── 2026_01_20_100002_create_notifications_table.php
│       └── Create notifications table:
│           ├── id
│           ├── user_id
│           ├── title
│           ├── message
│           ├── type
│           ├── action_url
│           ├── read_at
│           └── timestamps
│
└── ...

resources/
└── js/
    ├── components/
    │   ├── DashboardLayout.tsx (NEW - Shared Layout)
    │   │   ├── Header with notification bell
    │   │   ├── Stats cards
    │   │   ├── NotificationBell component
    │   │   └── Responsive design
    │   │
    │   └── LegalizationForm.tsx (NEW - Reusable Form)
    │       ├── Form fields
    │       ├── File upload
    │       ├── Validation
    │       └── Submit handler
    │
    └── Pages/
        └── Dashboard/
            ├── Subscriber.tsx (NEW)
            │   ├── Statistics
            │   ├── Legalization list
            │   ├── Create button
            │   └── Detail modal
            │
            ├── Admin.tsx (NEW)
            │   ├── Statistics
            │   ├── Quick actions
            │   ├── Legalization list
            │   └── Recent activities
            │
            ├── Editor.tsx (NEW)
            │   ├── Statistics
            │   ├── Content list
            │   ├── Create/Edit buttons
            │   └── Category management
            │
            ├── Writer.tsx (NEW)
            │   ├── Statistics
            │   ├── My articles
            │   ├── Create article
            │   └── Writing tips
            │
            └── Admin/
                ├── Legalizations.tsx (NEW - List)
                │   ├── Filters
                │   ├── Table view
                │   ├── Search/Filter
                │   └── Pagination
                │
                └── LegalizationDetail.tsx (NEW - Detail)
                    ├── User info
                    ├── Legalization details
                    ├── File list
                    ├── Approve/Reject
                    └── Admin notes

routes/
└── web.php (UPDATED)
    ├── /dashboard/subscriber
    ├── /dashboard/admin
    ├── /dashboard/editor
    ├── /dashboard/writer
    ├── /dashboard/admin/legalizations/*
    └── /api/notifications/*
```

---

## 🔐 ROLE-BASED ACCESS CONTROL

```
┌────────────────────────────────────────────────────────────┐
│                    USER ROLES                              │
└────────────────────────────────────────────────────────────┘

┌──────────────┐
│ SUBSCRIBER   │ (Alumni/Regular User)
├──────────────┤
│ Can:         │
│ ✓ Login      │
│ ✓ Create     │
│   legalization
│ ✓ View own   │
│   requests   │
│ ✓ Upload     │
│   dokumen    │
│ ✓ Download   │
│   approved   │
│ ✓ Receive    │
│   notification
│              │
│ Cannot:      │
│ ✗ Approve    │
│ ✗ View other │
│   requests   │
│ ✗ Manage     │
│   content    │
└──────────────┘

         ┌──────────────┐
         │    WRITER    │ (Content Creator)
         ├──────────────┤
         │ Can:         │
         │ ✓ Create     │
         │   articles   │
         │ ✓ Edit own   │
         │   articles   │
         │ ✓ Submit for │
         │   review     │
         │ ✓ View own   │
         │   articles   │
         │              │
         │ Cannot:      │
         │ ✗ Publish    │
         │ ✗ Edit other │
         │   articles   │
         │ ✗ Delete     │
         │ ✗ Manage     │
         │   legalization
         └──────────────┘

                  ┌──────────────┐
                  │   EDITOR     │ (Content Editor)
                  ├──────────────┤
                  │ Can:         │
                  │ ✓ Create     │
                  │   articles   │
                  │ ✓ Edit all   │
                  │   articles   │
                  │ ✓ Publish    │
                  │ ✓ Review     │
                  │   articles   │
                  │ ✓ Manage     │
                  │   categories │
                  │              │
                  │ Cannot:      │
                  │ ✗ Approve    │
                  │   legalization
                  │ ✗ Manage     │
                  │   users      │
                  └──────────────┘

                         ┌──────────────┐
                         │    ADMIN     │ (Administrator)
                         ├──────────────┤
                         │ Can:         │
                         │ ✓ Everything │
                         │ ✓ Approve/   │
                         │   Reject     │
                         │   legalization
                         │ ✓ Manage     │
                         │   users      │
                         │ ✓ Manage     │
                         │   all content│
                         │ ✓ Send       │
                         │   notifications
                         │ ✓ View       │
                         │   analytics  │
                         │              │
                         │ Cannot:      │
                         │ (Unrestricted│
                         │  access)     │
                         └──────────────┘

Permission Matrix:
┌─────────────────┬────────┬────────┬────────┬──────┐
│ Feature         │ Sub    │ Writer │ Editor │ Admin│
├─────────────────┼────────┼────────┼────────┼──────┤
│ View Own Dash   │ ✓      │ ✓      │ ✓      │ ✓    │
│ Create Legalization
│                 │ ✓      │ ✗      │ ✗      │ ✗    │
│ Create Article  │ ✗      │ ✓      │ ✓      │ ✓    │
│ Edit Own        │ ✗      │ ✓      │ ✓      │ ✓    │
│ Edit All        │ ✗      │ ✗      │ ✓      │ ✓    │
│ Delete          │ ✗      │ ✗      │ ✓      │ ✓    │
│ Approve Leg.    │ ✗      │ ✗      │ ✗      │ ✓    │
│ Manage Users    │ ✗      │ ✗      │ ✗      │ ✓    │
└─────────────────┴────────┴────────┴────────┴──────┘
```

---

## 🔄 REQUEST-RESPONSE CYCLE

```
USER ACTION (Frontend)
        │
        ▼
    React Component
    (onClick, onSubmit, etc)
        │
        ▼
    Inertia.js
    (router.post, router.get, etc)
        │
        ▼
    HTTP Request
    (POST /dashboard/admin/legalizations/{id}/approve)
        │
        ▼
    Laravel Router
    (routes/web.php)
        │
        ▼
    Middleware Check
    (auth, role, etc)
        │
        ├─── FAIL ──────► 403 Forbidden
        │
        └─── PASS
                │
                ▼
            Controller
            (DashboardController, etc)
                │
                ├── Validate Input
                ├── Business Logic
                ├── Database Operations
                └── Create Notification
                │
                ▼
            Database
            (Save/Update)
                │
                ▼
            Response (JSON)
                │
        ┌───────┴───────┐
        │               │
        ▼               ▼
    Success        Error
        │               │
        ▼               ▼
    Inertia        Error
    Response       Response
        │               │
        ▼               ▼
    React           Handle
    Component       Error
    Updates
        │
        ▼
    UI Updates
    (Notifications, 
     Lists, etc)
        │
        ▼
    USER SEES RESULT
```

---

## 📱 RESPONSIVE DESIGN BREAKPOINTS

```
Mobile (320px - 767px)
├── Single column layout
├── Stacked cards
├── Large buttons
├── Touch-friendly
└── Full-width forms

      ▼

Tablet (768px - 1199px)
├── Two column layout
├── Side-by-side cards
├── Balanced spacing
└── Normal-size buttons

      ▼

Desktop (1200px+)
├── Multi-column layout
├── Grid of cards
├── Optimized spacing
└── Hover effects
```

---

## 🔄 STATE MANAGEMENT FLOW

```
User State:
├── user.id
├── user.role
├── user.name
├── user.email
└── last_dashboard_visit

Notification State (in React):
├── notifications: []
├── unreadCount: number
├── isNotificationOpen: boolean
└── loading: boolean

Form State (Legalization):
├── jenjang: string
├── tahun_lulus: number
├── jumlah_lembar: number
├── tujuan: string
├── documents: File[]
├── errors: object
└── isSubmitting: boolean

Dashboard State:
├── stats: object
├── items: []
├── filters: object
├── currentPage: number
└── totalPages: number
```

---

**System Design Complete**

This architecture ensures:
✅ Scalability - Easy to add new features
✅ Security - Role-based access at every level
✅ Maintainability - Clear separation of concerns
✅ Performance - Efficient queries and caching
✅ User Experience - Responsive and intuitive

🚀 Ready for deployment!
