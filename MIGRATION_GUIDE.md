# Database Migration Guide

## Overview
This guide explains how to apply database migrations to your Supabase database. There are 6 migration files that set up the complete database schema with tables, policies, and functions.

## Prerequisites
1. **Docker Desktop** - Must be installed and running
2. **Supabase CLI** - Install with: `npm install -g supabase`
3. **Git** - Already installed on your system

## Migration Files

### 1. `20260308183338_7693b67b-0b61-4713-9f57-18c689c01dc0.sql` (Core Schema)
**Purpose**: Creates the foundational database schema
**Creates**:
- Enums: `app_role`, `membership_sector`, `membership_tier`, `membership_status`, `donation_frequency`, `order_status`
- Tables: `profiles`, `user_roles`, `memberships`, `products`, `orders`, `order_items`
- RLS Policies: Access control for all tables
- Functions: `has_role()` - Check if user has a specific role

### 2. `20260308211143_3825b5ee-164f-4d05-9e8b-7438a8e50ab1.sql` (Additional Tables)
**Purpose**: Adds content management and community features
**Creates**:
- Tables: `blog_posts`, `tv_episodes`, `newsletter_subscribers`
- RLS Policies: For content and newsletter management
- Triggers: Auto-update timestamps

### 3. `20260308212515_fa0aeac1-3572-4a66-93b9-d1feb0dd0bd1.sql` (Policy Fixes)
**Purpose**: Fixes and refines RLS policies for all tables
**Updates**:
- Fixes restrictive vs permissive policies
- Adds proper type casting for `has_role()` calls
- Ensures admin and user policies work correctly

### 4. `20260308220155_44e365da-4dec-41f0-ba9e-6eb526800793.sql` (Membership & Storage)
**Purpose**: Adds membership approval workflow and storage
**Creates/Updates**:
- Adds `approved` column to memberships
- Adds volunteer fields: `location`, `experience`, `why_join`
- Creates `content-images` storage bucket with RLS policies
- Adds admin update policy for memberships

### 5. `20260309000000_allow_public_tv_episode_inserts.sql` (Public Episodes)
**Purpose**: Allows public users to submit TV episodes
**Creates**:
- RLS Policy: Anyone can insert episodes (moderated later by admins)

### 6. `20260309000001_admin_access_management.sql` (Admin Control)
**Purpose**: Creates admin access management system
**Creates**:
- Tables: `admin_users`, `admin_requests`
- RLS Policies: Admin-only modifications
- Functions: `grant_admin_role()`, `revoke_admin_role()`

## How to Apply Migrations

### Step 1: Start Docker
```bash
# Open Docker Desktop from Applications
# Wait for it to say "Docker is running"
```

### Step 2: Link to Supabase Project
```bash
cd "/Users/pc/Desktop/Work Websites/Homegrown 2/homegrownvolunteersnetworks"
supabase link --project-ref [YOUR_PROJECT_REF]
```

Get your project ref from: https://app.supabase.com/projects

### Step 3: Push Migrations
```bash
supabase db push
```

This will:
- Connect to your Supabase project
- Read all migration files in `supabase/migrations/`
- Apply them in chronological order
- Update your Supabase database schema

### Step 4: Generate Updated Types
After migrations are applied, update your TypeScript types:
```bash
supabase gen types typescript --project-ref [YOUR_PROJECT_REF] > src/types/database.ts
```

This generates TypeScript definitions for all tables and functions, which fixes the admin access management compilation errors.

### Step 5: Re-enable Admin Features
Once types are generated, uncomment/add these in `src/App.tsx`:
```typescript
import AdminAccess from './pages/admin/AdminAccess';
import AdminAccessRequest from './pages/admin/AdminAccessRequest';

// In the admin routes:
<Route path="admin" element={<ProtectedRoute><AdminSidebar /></ProtectedRoute>}>
  <Route path="access" element={<AdminAccess />} />
  <Route path="request-access" element={<AdminAccessRequest />} />
  {/* ... other routes ... */}
</Route>
```

And in `src/components/admin/AdminSidebar.tsx`, add:
```typescript
import { Shield } from 'lucide-react';

// In the menu items:
<NavLink to="/admin/access" icon={Shield}>
  Admin Access
</NavLink>
```

## Verification

### Check if Migrations Applied
```bash
supabase migration list
```

### Test the Database
1. Go to https://app.supabase.com/projects/[YOUR_PROJECT]/
2. Navigate to SQL Editor
3. Run: `SELECT * FROM pg_tables WHERE schemaname = 'public';`
4. You should see all the tables listed above

### Test TypeScript Compilation
```bash
npm run build
```

This should complete without TypeScript errors.

## Rollback (if needed)
```bash
supabase db reset
```

This resets the database and re-applies all migrations from scratch.

## File Locations
```
supabase/
├── config.toml
└── migrations/
    ├── 20260308183338_7693b67b-0b61-4713-9f57-18c689c01dc0.sql
    ├── 20260308211143_3825b5ee-164f-4d05-9e8b-7438a8e50ab1.sql
    ├── 20260308212515_fa0aeac1-3572-4a66-93b9-d1feb0dd0bd1.sql
    ├── 20260308220155_44e365da-4dec-41f0-ba9e-6eb526800793.sql
    ├── 20260309000000_allow_public_tv_episode_inserts.sql
    └── 20260309000001_admin_access_management.sql
```

## Key Features After Migration

✅ **User Profiles**: User information and settings
✅ **Memberships**: Sector-based community membership with approval workflow
✅ **Role Management**: Admin, moderator, and user roles with RLS
✅ **Products & Orders**: E-commerce functionality for the shop
✅ **Blog Posts**: Content management with publish/draft system
✅ **TV Episodes**: Video hosting with admin submission control
✅ **Admin Access Control**: Granular admin permission management
✅ **Storage Buckets**: Image storage with access controls

## Environment Variables
Make sure your `.env.local` has:
```
VITE_SUPABASE_URL=https://[YOUR_PROJECT].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

## Support
If you encounter issues:
1. Check Docker is running: `docker ps`
2. Verify Supabase project: `supabase projects list`
3. Check migration status: `supabase migration list`
4. Review logs: `supabase migration list --json`
