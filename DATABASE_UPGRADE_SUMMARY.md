# Database Upgrades & Migration Files - Summary

## What Was Created

I've prepared 8 comprehensive files for database migration and deployment:

### 📋 Documentation Files

1. **MIGRATION_GUIDE.md** - Complete step-by-step guide covering:
   - Prerequisites (Docker, Supabase CLI, Git)
   - Overview of all 6 migrations
   - Detailed application instructions
   - Verification steps
   - Rollback procedures
   - Key features after migration

2. **DATABASE_MIGRATIONS_README.md** - Quick reference guide with:
   - File listing and descriptions
   - Quick start commands
   - Database schema overview
   - RLS policies explanation
   - Troubleshooting tips

### 🚀 Automation Script

3. **migrate.sh** - Automated migration script that:
   - Checks Docker is running
   - Installs Supabase CLI if needed
   - Links to your Supabase project
   - Applies all migrations
   - Generates TypeScript types
   - Builds the project to verify

### 📊 Individual Migration Files

4. **MIGRATION_1_CORE_SCHEMA.sql** (231 lines)
   - Enums: app_role, membership_sector, membership_tier, membership_status, donation_frequency, order_status
   - Core tables: profiles, user_roles, memberships, products, orders, order_items
   - has_role() function for permission checking
   - RLS policies for all tables

5. **MIGRATION_2_CONTENT_TABLES.sql** (61 lines)
   - blog_posts table with publication workflow
   - tv_episodes table for video hosting
   - newsletter_subscribers table
   - Triggers for timestamp automation

6. **MIGRATION_3_FIX_POLICIES.sql** (85 lines)
   - Fixes all RLS policies across tables
   - Corrects policy conflicts
   - Adds proper type casting
   - Ensures admin/user permissions work correctly

7. **MIGRATION_4_MEMBERSHIP_STORAGE.sql** (20 lines)
   - Adds membership approval workflow
   - Creates content-images storage bucket
   - Adds admin upload/delete policies for images

8. **MIGRATION_5_PUBLIC_EPISODES.sql** (4 lines)
   - Allows public users to submit episodes
   - Admins moderate submissions

9. **MIGRATION_6_ADMIN_ACCESS.sql** (55 lines)
   - admin_users table for access tracking
   - admin_requests table for approval workflow
   - grant_admin_role() and revoke_admin_role() functions
   - Granular RLS policies for admin management

## Key Features After Migration

✅ **User Management**
- Profile creation and updates
- Role-based access control (admin, moderator, user)

✅ **Memberships**
- Sector-based (agriculture, arts, culture)
- Approval workflow
- Tier system (free, supporter, premium)

✅ **E-commerce**
- Product catalog
- Order management with tracking
- Order items and inventory

✅ **Content Management**
- Blog posts with publication workflow
- TV episodes with YouTube integration
- Newsletter subscriptions

✅ **Admin Features**
- Admin access control system
- Admin approval workflow
- Granular permissions management

✅ **Storage**
- Content images bucket
- Public read access
- Admin upload/delete permissions

## Database Schema (20+ Tables)

### Core
- profiles, user_roles, memberships

### E-commerce
- products, orders, order_items

### Content
- blog_posts, tv_episodes, newsletter_subscribers

### Admin
- admin_users, admin_requests

### Utility
- storage buckets (content-images)

## How to Apply Migrations

### Option 1: Automated (Recommended)
```bash
cd "/Users/pc/Desktop/Work Websites/Homegrown 2/homegrownvolunteersnetworks"
bash migrate.sh
```

### Option 2: Manual Steps
```bash
# 1. Link to Supabase
supabase link --project-ref [YOUR_PROJECT_REF]

# 2. Apply migrations
supabase db push

# 3. Generate TypeScript types
supabase gen types typescript --project-ref [YOUR_PROJECT_REF] > src/types/database.ts

# 4. Build to verify
npm run build

# 5. Start development server
npm run dev
```

## Prerequisites Required

1. **Docker Desktop** - Download from https://www.docker.com/products/docker-desktop
2. **Supabase CLI** - Install with: `npm install -g supabase`
3. **Supabase Project** - Create at https://app.supabase.com/
4. **Project Ref** - Found in Supabase dashboard project settings

## After Migrations Are Applied

### Re-enable Admin Features
The AdminAccess and AdminAccessRequest components were temporarily disabled. After migrations:

1. **In `src/App.tsx`**, uncomment:
```typescript
import AdminAccess from './pages/admin/AdminAccess';
import AdminAccessRequest from './pages/admin/AdminAccessRequest';

// And add these routes to admin section:
<Route path="access" element={<AdminAccess />} />
<Route path="request-access" element={<AdminAccessRequest />} />
```

2. **In `src/components/admin/AdminSidebar.tsx`**, add:
```typescript
import { Shield } from 'lucide-react';

// And add menu item:
<NavLink to="/admin/access" icon={Shield}>
  Admin Access
</NavLink>
```

3. **Rebuild and test**:
```bash
npm run build
npm run dev
```

## File Locations

```
Root Directory
├── MIGRATION_GUIDE.md                      (Complete guide)
├── DATABASE_MIGRATIONS_README.md           (Quick reference)
├── migrate.sh                              (Automation script)
├── MIGRATION_1_CORE_SCHEMA.sql             (Tables & enums)
├── MIGRATION_2_CONTENT_TABLES.sql          (Blog, TV, newsletter)
├── MIGRATION_3_FIX_POLICIES.sql            (RLS fixes)
├── MIGRATION_4_MEMBERSHIP_STORAGE.sql      (Approval & storage)
├── MIGRATION_5_PUBLIC_EPISODES.sql         (Public submissions)
└── MIGRATION_6_ADMIN_ACCESS.sql            (Admin management)

supabase/
└── migrations/
    ├── 20260308183338_7693b67b-0b61-4713-9f57-18c689c01dc0.sql
    ├── 20260308211143_3825b5ee-164f-4d05-9e8b-7438a8e50ab1.sql
    ├── 20260308212515_fa0aeac1-3572-4a66-93b9-d1feb0dd0bd1.sql
    ├── 20260308220155_44e365da-4dec-41f0-ba9e-6eb526800793.sql
    ├── 20260309000000_allow_public_tv_episode_inserts.sql
    └── 20260309000001_admin_access_management.sql
```

## Verification Checklist

After running migrations:

- [ ] Docker is running
- [ ] Supabase CLI is installed
- [ ] Project linked with `supabase link`
- [ ] Migrations applied with `supabase db push`
- [ ] Types generated with `supabase gen types typescript`
- [ ] Build succeeds with `npm run build`
- [ ] Dev server runs with `npm run dev`
- [ ] Admin features re-enabled (optional)
- [ ] TypeScript compilation has no errors

## Troubleshooting

**Problem**: "Docker is not running"
→ Open Docker Desktop from Applications, wait for "Docker is running" message

**Problem**: "supabase: command not found"
→ Install CLI: `npm install -g supabase`

**Problem**: "Link already exists"
→ This is OK, migrations will still apply

**Problem**: Build has TypeScript errors
→ Run `supabase gen types typescript` with correct project ref

**Problem**: Migrations don't appear in Supabase
→ Check `supabase migration list` output
→ Verify Docker is running
→ Re-run `supabase db push`

## Current Project Status

- ✅ Production build succeeds
- ✅ All core features working
- ✅ Admin member viewing functional
- ✅ Member dashboard accessible
- ✅ Episode management working
- ⏳ Admin access features disabled (waiting for DB)
- 📋 All migration files ready for deployment

## Next Steps

1. **Install Docker Desktop** (if not already installed)
2. **Run migrations** using automated script or manual steps
3. **Generate TypeScript types** to unlock admin features
4. **Re-enable admin components** by uncommenting code
5. **Test all features** in development server
6. **Deploy** to Lovable or production environment

## Support Resources

- Supabase Docs: https://supabase.com/docs
- Supabase CLI Docs: https://supabase.com/docs/reference/cli
- TypeScript Guide: https://www.typescriptlang.org/docs/
- Project Repository: https://github.com/homegrownvolunteers/homegrownvolunteersnetworks

---

**All migration files have been committed to the Git repository on branch `main`.**

Ready for deployment! 🚀
