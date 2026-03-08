

# Plan: Content Updates + Map Embed (Minimal Structure Changes)

Keep all existing page structures, components, and layouts intact. Only update text content and replace the map placeholder.

## 1. Contact Page -- Real Map Embed

Replace the map placeholder div (lines 79-84 of `Contact.tsx`) with an OpenStreetMap iframe using coordinates `0.05909219859212323, 37.644788285433776`.

**File**: `src/pages/Contact.tsx`

## 2. About Page -- Update Text Content

Update only the text strings to match the concept document:
- **Vision** (line 54): "Recreating proud, resilient, thriving local communities across Africa."
- **Mission** (line 60): "To mobilize volunteers, creatives, and community leaders to promote homegrown solutions in agriculture, culture, and the arts."
- **Hero subtitle** (line 42): Reference "undocumented innovations" and the founding narrative.
- **Founder bio** (lines 103-108): Align with concept doc's description of Hon. Mwirigi's motivation.

**File**: `src/pages/About.tsx`

## 3. Homepage -- Update Subtitle Text

Update the hero paragraph (line 86) to: "Homegrown Volunteer Network mobilizes people, culture, and local knowledge to build community-driven solutions through agriculture, arts, and culture."

**File**: `src/pages/Index.tsx`

## 4. Get Involved -- Add "Homegrown Enabler" Mention

Add a brief mention of the "Homegrown Enabler" role in the "Why Volunteer" section text (line 124), referencing specific tracks: community storytelling, agriculture, cultural documentation, media.

**File**: `src/pages/GetInvolved.tsx`

## 5. Programs -- Update Descriptions

Update the `PROGRAMS` array in `src/lib/constants.ts` to use the concept doc's more specific descriptions for each program, including Homegrown TV tagline and Sanaa Culture Experience.

**File**: `src/lib/constants.ts`

---

**Total: 5 files, content-only edits. No structural or layout changes.**

