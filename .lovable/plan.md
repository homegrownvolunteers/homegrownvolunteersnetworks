

# Homegrown Volunteer Network -- Full Build Plan

## Summary
Build a complete 12+ page website for HVN with Supabase backend, brand theming (green/yellow/brown), animations, membership system, donation UI, art shop, and all forms. Payments are UI-only for now.

---

## 1. Foundation & Theming

**Tailwind config** -- Add brand colors and custom animations:
- `hvn-green: #1d6f0a`, `hvn-yellow: #f6ea16`, `hvn-brown: #582b07`
- Map primary to green, secondary to yellow, accent to brown
- Add keyframes: fade-up, count-up, parallax, 3D tilt hover, slide-in

**CSS variables** in `index.css` -- Update HSL values for the brand palette

**Shared layout component** -- `Layout.tsx` with:
- Responsive navbar (hamburger on mobile, smooth slide menu)
- Footer with newsletter signup, social links, contact info (Meru, Kenya)

---

## 2. Supabase Backend Setup

**Tables** (via migrations):
- `profiles` -- user profile data (name, email, phone, location, bio, avatar)
- `user_roles` -- role enum (admin, moderator, user) per security requirements
- `memberships` -- sector, subcategory, skill_level, intent, tier (free/supporter/premium), status
- `products` -- shop items (name, description, price, category, images, artist_id)
- `orders` / `order_items` -- shopping cart and checkout tracking
- `donations` -- amount, donor info, frequency (one-time/monthly), status
- `stories` -- blog/CMS (title, content, excerpt, image, category, author, published_at)
- `volunteers` -- volunteer applications
- `partnerships` -- partner inquiries
- `contact_messages` -- general contact form submissions
- `story_submissions` -- Homegrown TV story submissions

**RLS policies** on all tables. Auth via Supabase Auth (email/password).

---

## 3. Page Structure (All Pages)

### Shared Components
- `Navbar` -- logo, nav links, mobile hamburger, "Join" CTA button
- `Footer` -- newsletter form, social icons, quick links, contact
- `SectionHeading` -- reusable animated section title
- `CategoryCard` -- reusable card with hover effects for subcategories
- `MembershipTierCard` -- 3D tilt hover cards for Free/Supporter/Premium
- `StatsCounter` -- animated count-up numbers
- `YouTubeEmbed` -- responsive YouTube player

### Pages to Create

| Page | Route | Key Sections |
|------|-------|-------------|
| Homepage | `/` | Hero (image carousel + 3 CTAs), About snapshot, Membership gateway, TV teaser, Impact stats, Shop preview, Footer |
| About | `/about` | Story, Vision/Mission, Values, Founder profile, Timeline |
| Programs | `/programs` | 5 thematic area cards with icons and links |
| Sanaa Arts | `/sanaa-arts` | Hero, 13 subcategory cards, membership form, featured artists |
| Culture | `/culture` | Hero, 12 subcategory cards, membership form |
| Agriculture | `/agriculture` | Hero, 15 subcategory cards, membership form, resources |
| Homegrown TV | `/tv` | Featured video, category filters, video grid, subscribe CTA, submit form |
| Stories/Media | `/stories` | Featured story, filterable grid, pagination (from Supabase) |
| Get Involved | `/get-involved` | 3-column: Volunteer form, Partner form, Donate section |
| Shop | `/shop` | Product grid with filters, product detail modal, cart, checkout UI |
| Membership | `/membership` | Multi-step form (sector > subcategory > tier > profile > confirm) |
| Contact | `/contact` | Contact form, map placeholder, email/phone, social links |
| Member Dashboard | `/dashboard` | Profile, tier status, resources, events, orders |

All routes added to `App.tsx`.

---

## 4. Key Feature Details

**Membership Multi-Step Form:**
- Step 1: Sector selection (Agriculture/Arts/Culture) with visual cards
- Step 2: Subcategory dropdown (dynamic based on sector)
- Step 3: Tier selection with benefit comparison
- Step 4: Profile form (name, email, phone, location, bio, photo upload)
- Step 5: Confirmation (payment UI placeholder for paid tiers)
- Validated with Zod, saved to Supabase `memberships` + `profiles`

**Shop (UI + Supabase):**
- Product listing from Supabase `products` table
- Filter by category/price/artist
- Product detail with image gallery
- Cart state managed via React context
- Checkout form (payment UI only, no real processing)

**Donations (UI only):**
- Preset amounts (KES 500, 1000, 5000, 10000) + custom
- One-time / monthly toggle
- Impact descriptions
- Form saves to `donations` table with "pending" status

**Stories CMS:**
- CRUD from Supabase (admin can create/edit via dashboard)
- Public listing with category filter and pagination
- Individual story page with social sharing buttons

**All Forms** validated with Zod + react-hook-form:
- Contact, Volunteer, Partnership, Story Submission, Art Submission

---

## 5. Animations

- Scroll-triggered fade-up reveals using Intersection Observer hook
- Parallax on hero backgrounds
- Animated stat counters (count-up when visible)
- 3D tilt on membership cards (CSS perspective transform on hover)
- Image zoom + overlay on category cards
- Page transitions via CSS animations
- Mobile: touch carousels via embla-carousel-react

---

## 6. File Organization

```text
src/
  components/
    layout/        -- Navbar, Footer, Layout
    home/          -- HeroSection, AboutSnapshot, MembershipGateway, etc.
    membership/    -- MembershipForm, TierCard, SectorSelector
    shop/          -- ProductGrid, ProductCard, Cart, Checkout
    forms/         -- ContactForm, VolunteerForm, PartnerForm, etc.
    shared/        -- SectionHeading, StatsCounter, CategoryCard, YouTubeEmbed
  contexts/        -- CartContext, AuthContext
  hooks/           -- useScrollReveal, useCountUp, useAuth
  lib/             -- supabase client, constants, types
  pages/           -- All 13 page components
```

---

## 7. Implementation Order

Since building everything at once, files will be created in this sequence to minimize broken imports:

1. Tailwind theme + CSS variables + Supabase setup
2. Types, constants, contexts, hooks
3. Layout (Navbar + Footer)
4. Homepage with all sections
5. About, Programs, Contact pages
6. Sector pages (Agriculture, Arts, Culture) with subcategory grids
7. Membership multi-step form + dashboard
8. Stories/Media page (CMS)
9. Homegrown TV page
10. Get Involved page (Volunteer, Partner, Donate)
11. Shop (products, cart, checkout)
12. Final polish: animations, mobile testing, SEO meta tags

This will be split across multiple implementation messages due to the volume of code (~50+ files).

