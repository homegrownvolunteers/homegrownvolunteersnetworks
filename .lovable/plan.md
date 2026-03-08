

# Content Display: Blog Posts Are Not Shown on Any Public Page

Currently, the blog posts created in the admin Content page are stored in the `blog_posts` database table but **are not displayed anywhere on the public site**. The Stories page (`/stories`) uses hardcoded sample data, not the database.

## What Needs to Be Built

There are two options:

**Option A: Add a dedicated Blog/News page** (e.g., `/blog`) that fetches and displays published `blog_posts` from the database, with individual post pages (`/blog/:slug`).

**Option B: Replace the hardcoded Stories page** (`/stories`) with dynamic content from `blog_posts`, since the categories overlap (Agriculture, Arts & Culture, Community, etc.).

## Recommended: Option A — Create a Blog Page + Detail Page

### 1. Create `src/pages/Blog.tsx`
- Fetch published blog posts from `blog_posts` table
- Filter by category using the same categories defined in admin
- Display cards with image, title, excerpt, category, date
- Link each card to `/blog/:slug`

### 2. Create `src/pages/BlogPost.tsx`
- Fetch single post by slug
- Display full content, image, author, date, category

### 3. Update `App.tsx`
- Add routes: `/blog` and `/blog/:slug`

### 4. Update Navigation
- Add "Blog" or "News" link to the navbar

### 5. Optionally update Stories page
- Keep Stories as-is (for curated stories from the `stories` table) or merge both

## Files to Create/Edit
| File | Change |
|------|--------|
| `src/pages/Blog.tsx` | New — list of published blog posts |
| `src/pages/BlogPost.tsx` | New — single post detail view |
| `src/App.tsx` | Add `/blog` and `/blog/:slug` routes |
| `src/components/layout/Navbar.tsx` | Add Blog nav link |

