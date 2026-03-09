# Database Migration Files

This directory contains all the SQL migration files needed to set up your Supabase database.

## Files Included

### 1. **MIGRATION_GUIDE.md**
Complete step-by-step guide for applying migrations. Start here!

### 2. **migrate.sh**
Automated migration script. Run with: `bash migrate.sh`

### 3. **MIGRATION_1_CORE_SCHEMA.sql**
Creates all foundational tables:
- Enums (roles, membership types, etc.)
- profiles, user_roles, memberships
- products, orders, order_items
- RLS security policies

### 4. **MIGRATION_2_CONTENT_TABLES.sql**
Creates content management tables:
- blog_posts
- tv_episodes
- newsletter_subscribers

### 5. **MIGRATION_3_FIX_POLICIES.sql**
Fixes and optimizes Row-Level Security policies across all tables

### 6. **MIGRATION_4_MEMBERSHIP_STORAGE.sql**
Adds membership approval workflow and storage buckets

### 7. **MIGRATION_5_PUBLIC_EPISODES.sql**
Allows public episode submissions

### 8. **MIGRATION_6_ADMIN_ACCESS.sql**
Admin access management system with approval workflow

## Quick Start

```bash
# Option 1: Automated (recommended)
bash migrate.sh

# Option 2: Manual
supabase link --project-ref [YOUR_PROJECT_REF]
supabase db push
supabase gen types typescript --project-ref [YOUR_PROJECT_REF] > src/types/database.ts
npm run build
```

## Database Schema Overview

After migrations, your database will have:

### Core Tables
- **profiles** - User profile information
- **user_roles** - Role assignments (admin, moderator, user)
- **memberships** - Community memberships with approval workflow

### E-commerce
- **products** - Shop products
- **orders** - Customer orders
- **order_items** - Order line items

### Content
- **blog_posts** - Blog articles
- **tv_episodes** - Video episodes
- **newsletter_subscribers** - Newsletter signups

### Admin
- **admin_users** - Admin access tracking
- **admin_requests** - Admin access requests

### Storage
- **content-images** - Public image storage bucket

## RLS Policies

All tables have Row-Level Security enabled:
- **Public reads**: Anyone can view public content
- **User writes**: Users can modify their own data
- **Admin only**: Admins manage products, posts, episodes
- **Authenticated required**: Some operations require login

## Functions

- **has_role(user_id, role)** - Check if user has a role
- **grant_admin_role(user_id)** - Grant admin access
- **revoke_admin_role(user_id)** - Remove admin access

## Troubleshooting

**Issue**: Docker not running
- Solution: Open Docker Desktop from Applications

**Issue**: Supabase CLI not found
- Solution: `npm install -g supabase`

**Issue**: Link failed
- Solution: Visit https://app.supabase.com/projects and get your Project Ref

**Issue**: Type generation failed
- Solution: Run manually: `supabase gen types typescript --project-ref [REF] > src/types/database.ts`

## Support

For issues, check:
1. MIGRATION_GUIDE.md for detailed instructions
2. Supabase dashboard: https://app.supabase.com
3. Supabase CLI docs: https://supabase.com/docs/reference/cli
