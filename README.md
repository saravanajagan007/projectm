# ProjectM — Agency Website & Enterprise Company Portal

A production-ready full-stack TypeScript monorepo built with **Turborepo**, **Next.js (Frontend)**, and **NestJS (Backend)**.

---

## 🌐 Public Website & Admin Routing Structure

- **Public Agency Website (`/`):** The root URL serves the high-performance ProjectM digital agency landing page (converted from the HTML5 agency template with Tailwind CSS, Google Fonts Outfit & Plus Jakarta Sans, dynamic hero rotator, service tabs, process roadmap, testimonials, FAQ, and working project inquiry form).
- **Admin Portal & Login (`/admin`):** 
  - The login interface is accessible at `/admin` (any navigation to `/login` automatically redirects to `/admin`).
  - Unauthenticated visitors see the secure Admin Login card with quick-fill demo credentials.
  - Authenticated users are directed directly to the unified **Manage Companies** panel (`/admin/manage-companies`).
- **Manage Companies (`/admin/manage-companies`):** The primary hub for authenticated users:
  - **`ADMIN` Role**: Can add companies, view gallery, edit company details/images, and delete companies.
  - **`ADD_COMPANY` Role**: Can add companies and view image gallery; edit/delete actions are hidden and guarded.
  - Includes debounced global search across name, contact person, phone numbers, and email; server-side pagination; country code selector with 10-digit phone validation; and a maximum limit of 5 images per company.

---

## 🏗️ Monorepo Architecture

```
projectm/
├── apps/
│   ├── web/                    # Next.js 15+ App Router, Tailwind CSS, Lucide Icons, RHF + Zod
│   │   ├── app/
│   │   │   ├── page.tsx        # Public Agency Homepage (Root /)
│   │   │   ├── admin/          # Dedicated Admin Login & Session router (/admin)
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/  # Company Directory (Search, Pagination, Lightbox Gallery)
│   │   │   │   └── admin/manage-companies/ # ADMIN ONLY Management Data Table
│   │   │   ├── login/          # Redirects to /admin
│   │   │   └── unauthorized/   # Friendly RBAC Access-Denied Fallback
│   │   ├── components/         
│   │   │   ├── landing/        # HeroSection, Services, About, Process, Faq, Contact...
│   │   │   └── ui/             # Modals, Navbar, Pagination, SearchInput...
│   │   └── middleware.ts       # Edge route protection & RBAC validation
│   └── api/                    # NestJS 11+ REST API
│       ├── src/
│       │   ├── auth/           # 15m Access + 7d Refresh token rotation & revocation
│       │   ├── companies/      # Multi-image multipart upload, CRUD, 4-field search
│       │   ├── contact/        # Public inquiry handler (POST /api/contact)
│       │   ├── storage/        # StorageService abstraction (Local disk / S3 / R2)
│       │   ├── users/          # User repository & hashed refresh token persistence
│       │   ├── common/         # JwtAuthGuard, RolesGuard, @Roles(), @CurrentUser()
│       │   └── prisma/         # PrismaService
│       └── prisma/
│           ├── schema.prisma   # SQLite default for instant zero-dependency local run
│           ├── schema.postgres.prisma # PostgreSQL schema for production
│           └── seed.ts         # Pre-seeds ADMIN, ADD_COMPANY, and initial companies
├── packages/
│   └── shared/                 # Shared TypeScript interfaces, DTOs, and Zod schemas
├── legacy/                     # Archived previous static website files
├── turbo.json                  # Turborepo task pipeline
└── pnpm-workspace.yaml         # pnpm workspace configuration
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Database Sync & Seed
```bash
# Sync database schema (SQLite dev.db)
pnpm db:push

# Seed ADMIN, ADD_COMPANY accounts & sample companies
pnpm db:seed
```

### 3. Start Development Servers
```bash
pnpm dev
```
- **Public Agency Website:** [http://localhost:3000](http://localhost:3000)
- **Admin Portal Login:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API:** [http://localhost:4000/api](http://localhost:4000/api)
- **Photo Uploads:** [http://localhost:4000/uploads/](http://localhost:4000/uploads/)

---

## 🔐 Demo Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **`ADMIN`** | `admin@projectm.com` | `Password123!` | Full Access: Manage Companies screen (`/admin/manage-companies`), Edit records, delete companies, upload/remove images, add company modal, view directory. |
| **`ADD_COMPANY`** | `operator@projectm.com` | `Password123!` | Operator Access: Add Company modal popup, view directory, global search, pagination, photo galleries. Blocked from Edit/Delete. |

*(The `/admin` login page includes one-click demo quick-fill buttons for fast testing).*
