# 🚀 Deployment Checklist - Database Migration

Use this checklist to track your database migration and deployment progress.

## Pre-Migration Setup

- [ ] Docker Desktop downloaded from https://www.docker.com/products/docker-desktop
- [ ] Docker Desktop installed on your system
- [ ] Docker Desktop launched and running ("Docker is running" appears)
- [ ] Terminal open in project directory
- [ ] Git repository up to date with `git pull`

## Supabase Setup

- [ ] Supabase account created at https://app.supabase.com
- [ ] Supabase project created
- [ ] Project Reference ID noted (format: `xxxxx` from settings)
- [ ] Supabase CLI installed: `npm install -g supabase`
- [ ] Supabase CLI verified: `supabase --version` works

## Migration Execution

### Automated Route (Recommended)
- [ ] Run: `bash migrate.sh`
- [ ] Enter Project Reference ID when prompted
- [ ] Enter Project ID when prompted
- [ ] Wait for all steps to complete
- [ ] Script reports ✅ All done!

### Manual Route
- [ ] Run: `supabase link --project-ref [YOUR_PROJECT_REF]`
- [ ] Run: `supabase db push`
- [ ] Migrations applied successfully
- [ ] Run: `supabase gen types typescript --project-ref [YOUR_PROJECT_REF] > src/types/database.ts`
- [ ] Types file generated: `src/types/database.ts`
- [ ] Run: `npm run build` - Build succeeds

## Verification

- [ ] Check migrations: `supabase migration list`
- [ ] All 6 migrations show as "✓ Complete"
- [ ] Supabase dashboard shows new tables:
  - [ ] profiles
  - [ ] user_roles
  - [ ] memberships
  - [ ] products
  - [ ] orders
  - [ ] order_items
  - [ ] blog_posts
  - [ ] tv_episodes
  - [ ] newsletter_subscribers
  - [ ] admin_users
  - [ ] admin_requests
- [ ] Storage bucket exists: `content-images`
- [ ] Functions created:
  - [ ] has_role()
  - [ ] grant_admin_role()
  - [ ] revoke_admin_role()

## Re-enable Admin Features (Optional)

- [ ] Open `src/App.tsx`
- [ ] Uncomment `import AdminAccess from './pages/admin/AdminAccess'`
- [ ] Uncomment `import AdminAccessRequest from './pages/admin/AdminAccessRequest'`
- [ ] Uncomment the two admin routes in the admin section
- [ ] Open `src/components/admin/AdminSidebar.tsx`
- [ ] Uncomment `import { Shield } from 'lucide-react'`
- [ ] Uncomment the Admin Access menu item
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors

## Development Testing

- [ ] Run: `npm run dev`
- [ ] Dev server starts: http://localhost:8083
- [ ] Browser loads without errors
- [ ] No console errors in DevTools
- [ ] Logo displays correctly
- [ ] Navigation works
- [ ] Login/signup flows work
- [ ] Member dashboard accessible after login
- [ ] Admin panel loads for admin users
- [ ] Admin member viewing shows data

## Production Build

- [ ] Run: `npm run build` (production build)
- [ ] Build completes: `✓ built in X.XXs`
- [ ] No chunk size warnings
- [ ] No TypeScript errors
- [ ] dist/ folder populated

## Git Commit & Push

- [ ] All changes staged: `git add .`
- [ ] Changes committed: `git commit -m "Enable admin features post-migration"`
- [ ] Pushed to main: `git push origin main`
- [ ] Repository shows latest commits

## Lovable Deployment (if applicable)

- [ ] Connect Lovable to GitHub repository
- [ ] Preview builds successfully
- [ ] Features working in preview
- [ ] Deploy to production
- [ ] Production build succeeds
- [ ] All features working in production

## Post-Deployment

- [ ] Create first admin user via Supabase dashboard
  - [ ] Insert into user_roles table: (user_id, 'admin')
  - [ ] Create admin_users entry with email
- [ ] Test admin access features
- [ ] Grant admin access to team members
- [ ] Document admin procedures
- [ ] Set up backup strategy
- [ ] Monitor error logs

## Troubleshooting Notes

If you encounter issues:

1. **Docker Issues**
   - [ ] Docker Desktop is running (check System Tray)
   - [ ] `docker ps` returns container list
   - [ ] Restart Docker if needed

2. **Supabase Issues**
   - [ ] Project is active (not paused)
   - [ ] API keys are copied correctly
   - [ ] Check Supabase dashboard for errors
   - [ ] Try: `supabase migration list --json`

3. **Build Issues**
   - [ ] Clear cache: `rm -rf node_modules .next dist`
   - [ ] Reinstall: `npm install`
   - [ ] Types outdated: `supabase gen types typescript`

4. **Permission Issues**
   - [ ] RLS policies enabled on all tables
   - [ ] Authenticated required for admin operations
   - [ ] Test policy with simple query first

## Performance Optimization (Post-Migration)

- [ ] Create indexes on frequently queried columns
- [ ] Set up connection pooling
- [ ] Enable caching for public content
- [ ] Monitor query performance
- [ ] Set up automated backups

## Documentation

- [ ] README updated with DB schema info
- [ ] Migration guide saved locally
- [ ] Team briefed on new features
- [ ] Admin procedures documented
- [ ] Emergency procedures documented

## Final Checklist

- [ ] All migrations applied successfully
- [ ] All tests passing
- [ ] Production build successful
- [ ] Deployed to production
- [ ] Admin features working
- [ ] Team trained on admin panel
- [ ] Backup strategy in place
- [ ] Monitoring enabled

---

## Quick Command Reference

```bash
# Check Docker
docker ps

# Check Supabase CLI
supabase --version

# Link project
supabase link --project-ref [REF]

# Apply migrations
supabase db push

# Generate types
supabase gen types typescript --project-ref [REF] > src/types/database.ts

# Build
npm run build

# Develop
npm run dev

# Check migrations
supabase migration list

# Reset database (careful!)
supabase db reset
```

---

**Status**: Ready for deployment 🚀

**Date Started**: _____________
**Date Completed**: _____________
**Deployed By**: _____________
**Notes**: _________________________________________________

