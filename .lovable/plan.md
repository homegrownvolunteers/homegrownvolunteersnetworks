

# Plan: Enhanced Sector Pages, Admin System, and New Database Tables

This is a large request. I'll break it into phases to keep it manageable. Given the scope, I recommend implementing in two rounds. This plan covers **everything** but prioritizes the most impactful changes first.

## What Already Exists (No Changes Needed)
- Homepage pillars already link to `/agriculture`, `/sanaa-arts`, `/culture` with hover effects
- Agriculture, SanaaArts, Culture pages exist with hero sections, subcategory grids, and membership CTAs
- Color palette is already earthy (greens, browns, terracotta)
- Animations (stagger, parallax, float, blur-in) already implemented
- Database has: profiles, user_roles, memberships, volunteers, partnerships, stories, story_submissions, donations, products, orders, contact_messages
- `has_role` function exists for admin checks

## Phase 1: Sector Detail Pages + Enhanced Content

### 1A. Subcategory Detail Modals on Sector Pages
Currently `CategoryCard` components are static. Add click-to-open `Dialog` modals showing:
- Full description, related content, how to get involved, related TV content
- Use static data in constants for now (can be DB-driven later)

**Files**: Create `src/components/shared/SubcategoryDetailModal.tsx`, update `Agriculture.tsx`, `SanaaArts.tsx`, `Culture.tsx`, add detail data to `constants.ts`

### 1B. Newsletter Signup
Add a newsletter signup section to the homepage footer area.

**Files**: `src/pages/Index.tsx` (add section before footer)

## Phase 2: Admin System

### 2A. Database Migrations
Create new tables:
- `blog_posts` (id, title, slug, content, excerpt, image_url, category, author_id, published, created_at, updated_at)
- `tv_episodes` (id, title, description, video_url, thumbnail_url, category, published, created_at)
- `newsletter_subscribers` (id, email, created_at)

RLS: admin-only CRUD on blog_posts and tv_episodes; public SELECT on published items; anyone can INSERT newsletter_subscribers.

### 2B. Admin Auth Pages
- `/admin/login` — standalone login page (no Layout wrapper, clean admin UI)
- `/admin/register` — registration for admin personnel
- Password reset with `/reset-password` route
- Auth context/hook for session management

**Files**: `src/pages/admin/Login.tsx`, `src/pages/admin/Register.tsx`, `src/pages/ResetPassword.tsx`, `src/hooks/useAuth.ts`

### 2C. Admin Dashboard with Sidebar
- `/admin/dashboard` with `SidebarProvider` layout
- Sidebar navigation: Overview, Members, Content, TV Episodes, Registrations, Settings
- **Overview**: Stats cards (total members, volunteers, stories, TV episodes) queried from DB
- **Members**: Data table of memberships with search, date filter, export to Excel (via `xlsx` library) and PDF (via `jspdf`)
- **Content**: CRUD for blog posts with textarea editor; manage stories
- **TV Episodes**: Add/edit/delete episodes with video embed URL, title, description, category
- **Registrations**: View volunteers, partnerships, story submissions in tabs with export
- **Settings**: Admin profile update

**Files**: 
- `src/pages/admin/AdminLayout.tsx` (sidebar + outlet)
- `src/pages/admin/Overview.tsx`
- `src/pages/admin/Members.tsx`
- `src/pages/admin/Content.tsx`
- `src/pages/admin/TVEpisodes.tsx`
- `src/pages/admin/Registrations.tsx`
- `src/pages/admin/Settings.tsx`
- `src/components/admin/AdminSidebar.tsx`
- `src/components/admin/ProtectedRoute.tsx`

### 2D. Route Setup
Add all admin routes to `App.tsx` wrapped in a `ProtectedRoute` that checks `has_role(uid, 'admin')`.

## Phase 3: Homegrown TV from Database
Update `HomegrownTV.tsx` to fetch episodes from the new `tv_episodes` table instead of hardcoded data. Admin can manage episodes from the dashboard.

## Summary of All File Changes

| Area | Files |
|------|-------|
| Subcategory details | New modal component, update 3 sector pages, constants |
| Newsletter | `Index.tsx`, new `newsletter_subscribers` table |
| Admin auth | 3 new pages, auth hook, protected route component |
| Admin dashboard | 7 new pages/components, sidebar component |
| DB migrations | 3 new tables (blog_posts, tv_episodes, newsletter_subscribers) |
| TV from DB | Update `HomegrownTV.tsx` |
| Routes | Update `App.tsx` with ~10 new routes |
| Dependencies | Add `xlsx` and `jspdf` for export functionality |

This is a substantial build. Shall I proceed with implementation?

