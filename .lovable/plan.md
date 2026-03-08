

# Plan: Team Section, Navbar Dropdown, and Enhanced Animations

## 1. Navbar -- Sectors Dropdown

**Current**: Sanaa Arts, Culture, Agriculture are separate nav links taking up space.

**Change**: Replace those 3 links with a single "Our Sectors" dropdown button. On desktop, hovering/clicking opens a popover with the 3 sector links. On mobile, clicking expands a collapsible section within the hamburger menu.

- Use Radix `NavigationMenu` or a simple state-based dropdown
- Remove the 3 individual sector links from `NAV_LINKS` in constants
- Add a `SECTOR_LINKS` constant for the grouped items

**Files**: `src/lib/constants.ts`, `src/components/layout/Navbar.tsx`

---

## 2. Team Section on About Page

Add a "Meet Our Team" section to `src/pages/About.tsx` between the Founder and Timeline sections. Grid of team member cards (photo placeholder, name, role, short bio). Static data for now -- 6-8 team members.

Each card: avatar placeholder, name, title, and a subtle hover effect (scale + shadow).

**Files**: `src/pages/About.tsx`

---

## 3. Enhanced Animations & Scroll Effects

**New keyframes** in `tailwind.config.ts`:
- `slide-up` -- elements sliding up from below
- `slide-in-left` -- horizontal entrance from left
- `blur-in` -- fade in with blur removal
- `float` -- gentle floating loop for decorative elements
- `parallax-slow` -- CSS-based parallax offset

**New hook** -- `useStaggerReveal`: accepts multiple refs, staggers their reveal with delays (for grids of cards).

**Apply across pages**:
- Homepage: stagger the 3 pillar cards, sector cards, and product cards
- About: stagger values cards and timeline items
- Sector pages: stagger subcategory grids
- All section headings get scroll-triggered fade-up

**Parallax**: Add a subtle parallax effect to hero section backgrounds using a `useParallax` hook (translates background on scroll via `requestAnimationFrame`).

**Smooth scroll CSS**: Add `scroll-behavior: smooth` and `scroll-margin-top` for anchored sections.

**Files**: `tailwind.config.ts`, `src/index.css`, `src/hooks/useStaggerReveal.ts`, `src/hooks/useParallax.ts`, `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/pages/Agriculture.tsx`, `src/pages/SanaaArts.tsx`, `src/pages/Culture.tsx`, `src/components/shared/SectionHeading.tsx`, `src/components/shared/CategoryCard.tsx`

---

## Summary of Changes

| Area | What |
|------|------|
| Navbar | Group 3 sector links into a single "Our Sectors" dropdown |
| About page | Add team section with 6-8 member cards |
| Tailwind config | Add 5+ new keyframes and animations |
| New hooks | `useStaggerReveal`, `useParallax` |
| All pages | Apply staggered scroll reveals to card grids, parallax to heroes |
| CSS | Smooth scrolling, blur-in effects |

