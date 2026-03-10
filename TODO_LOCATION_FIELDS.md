# TODO: Hierarchical Location Fields for Member Registration

## Task Overview
Add hierarchical location fields (Country → County → Sub-County → Ward) to member registration and admin dashboard.

## Implementation Steps

### 1. Database Migration
- [x] Add location columns to memberships table (country, county, sub_county, ward)
- [x] Create counties reference table with seed data (47 counties, Meru first)
- [x] Create sub_counties reference table with seed data
- [x] Create wards reference table with seed data
- [x] Add RLS policies for location tables

### 2. Backend API
- [x] GET /api/location/counties - Returns counties (Meru first, alphabetical rest)
- [x] GET /api/location/sub-counties?county_id=X - Returns sub-counties for county
- [x] GET /api/location/wards?sub_county_id=X - Returns wards for sub-county

### 3. Frontend - Member Registration Form
- [x] Add location section between personal info and sector selection
- [x] Implement cascading dropdowns (Country → County → Sub-County → Ward)
- [x] Handle "Other" country option with free-form input
- [x] Add loading states and validation
- [x] Update submit handler to save location data

### 4. Frontend - Admin Dashboard
- [x] Add location columns to Members list table
- [x] Add location filters (County, Sub-County, Ward dropdowns)
- [x] Update export functionality to include location data
- [ ] Create member detail modal/view with full location display

### 5. Testing & Verification
- [ ] Register member with location: Kenya → Meru → Imenti South → Abogeta West
- [ ] Verify member visible in admin with location data
- [ ] Test filtering by county, sub-county, ward
- [ ] Test export includes location data

## Critical Requirements
- Meru County MUST be first in dropdown (then alphabetical) ✅
- Location fields required if Kenya selected ✅
- Cascading dropdowns must work correctly ✅
- Admin must see all member location data ✅

## Files Modified
1. `supabase/migrations/20260310000000_location_hierarchy.sql` - Database migration
2. `src/pages/Membership.tsx` - Added location section
3. `src/pages/admin/Members.tsx` - Added location columns and filters
4. `src/hooks/useLocation.ts` - New location hook

## Next Steps
- Run the migration on the database
- Test the member registration flow
- Verify admin dashboard shows location data

