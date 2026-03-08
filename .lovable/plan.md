

# Plan: Member Dashboards, Admin Approval, Enhanced Volunteer Form, TV & Content Improvements

## Summary of Changes

This plan covers 7 areas: member authentication with email verification, member dashboards, admin member approval, TV episode improvements, content image uploads, enhanced volunteer form, and enhanced admin registrations view.

---

## 1. Database Changes

### Add `status` field for member approval
- Add `approved` column to `memberships` table (boolean, default `false`)
- This lets admin approve/reject members

### Add new volunteer fields
- Add `location`, `experience`, `why_join` columns to `volunteers` table

### Create storage bucket for content images
- Create `content-images` public bucket for blog post image uploads

### RLS policies
- Update memberships SELECT policy: members see their own data; admins see all
- Add admin UPDATE policy on memberships for approval

---

## 2. Membership Flow — Email Verification + Approval

**File**: `src/pages/Membership.tsx`

- On step 5 (confirm), call `supabase.auth.signUp()` with the member's email/password (add password field to step 4)
- Insert membership record with `approved: false`
- Show success message: "Check your email to verify your account. An admin will review your application."
- Members must verify email before they can sign in

**No auto-confirm** — users verify via email link.

---

## 3. Member Dashboard

**File**: `src/pages/Dashboard.tsx`

- Replace static placeholder with auth-aware dashboard
- If not logged in, show login/signup prompt
- If logged in but not approved: show "Your application is pending admin approval"
- If logged in and approved: show membership details, tier, sector, profile info
- Add profile editing capability
- Add route guard using `useAuth`

---

## 4. Admin — Member Approval

**File**: `src/pages/admin/Members.tsx`

- Add "Approved" column to the table
- Add approve/reject buttons per member
- Call `supabase.from("memberships").update({ approved: true }).eq("id", id)`
- Show pending members prominently (filter/sort by approval status)

---

## 5. TV Episodes — Auto-Thumbnail from Video URL

**File**: `src/pages/admin/TVEpisodes.tsx`

- Extract YouTube video ID from URL and auto-generate thumbnail: `https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg`
- Remove manual thumbnail URL field, auto-set on save
- Change category input to a dropdown with the existing TV categories: "Agriculture Stories", "Cultural Heritage", "Artist Profiles", "Community Innovations"
- Show thumbnail preview in the episodes table

---

## 6. Content — Image Upload with Compression

**File**: `src/pages/admin/Content.tsx`

- Create `content-images` storage bucket
- Add file input for image upload alongside URL input
- Compress image client-side using canvas API before uploading (resize to max 1200px width, JPEG at 0.8 quality)
- Upload to storage bucket, get public URL, set as `image_url`
- Keep URL input as alternative option

---

## 7. Volunteer Form — Additional Fields

**File**: `src/pages/GetInvolved.tsx` (VolunteerForm)

- Add `location` field (text input)
- Add `experience` field (textarea — "Tell us about your relevant experience")
- Add `why_join` field (textarea — "Why would you like to join?")
- These map to new columns on the `volunteers` table

---

## 8. Admin Registrations — Enhanced Volunteer View

**File**: `src/pages/admin/Registrations.tsx`

- Add columns to volunteers tab: Phone, Location, Areas of Interest, Hours/Week, Skills, Experience, Why Join
- Make table horizontally scrollable for the extra columns
- Include all fields in export

---

## 9. Fix Build Error — jspdf

**File**: `package.json`

- Add `jspdf` and `jspdf-autotable` as dependencies (they're imported dynamically in Members.tsx but not in package.json)

---

## File Summary

| File | Change |
|------|--------|
| Migration SQL | Add `approved` to memberships, add `location`/`experience`/`why_join` to volunteers, create storage bucket |
| `src/pages/Membership.tsx` | Add auth signup + password field, insert membership with `approved: false` |
| `src/pages/Dashboard.tsx` | Auth-aware member dashboard with approval status |
| `src/pages/admin/Members.tsx` | Add approve/reject, show approval status |
| `src/pages/admin/TVEpisodes.tsx` | Auto-thumbnail from YouTube URL, category dropdown |
| `src/pages/admin/Content.tsx` | Image upload with compression + storage |
| `src/pages/GetInvolved.tsx` | Add location, experience, why_join fields |
| `src/pages/admin/Registrations.tsx` | Show all volunteer fields including new ones |
| `package.json` | Add jspdf, jspdf-autotable |

