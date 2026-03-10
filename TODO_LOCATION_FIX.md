# Location Selection Fix Plan

## Issues Fixed
1. ✅ Sub-counties of other counties don't show up
2. ✅ Wards for Meru subcounty are not corresponding to the subcounty selected  
3. ✅ Application fails on submission (fixed error handling)

## Files Edited
1. `src/hooks/useLocation.ts` - Added comprehensive fallback data for all counties and fixed fetching logic
2. `src/pages/Membership.tsx` - Fixed ward dropdown to show wards based on selected sub-county
3. `src/pages/admin/Members.tsx` - Fixed filters in admin panel to use proper fallback data

## Summary of Changes

### useLocation.ts
- Added comprehensive `HARDCODED_SUB_COUNTIES` with all 354 sub-counties for all 47 Kenyan counties
- Added comprehensive `HARDCODED_WARDS` with wards organized by sub_county_id
- Updated `fetchSubCounties()` to use fallback data for ANY county, not just Meru
- Updated `fetchWards()` to use fallback data for ANY sub-county, filtering by sub_county_id
- Added backward compatibility exports for `MERU_SUB_COUNTIES` and `IMENTI_SOUTH_WARDS`

### Membership.tsx
- Updated import to include new fallback data
- Fixed ward dropdown fallback to dynamically find the selected sub-county ID and show corresponding wards

### Members.tsx (Admin)
- Updated imports to include new fallback data
- Fixed sub-county filter to dynamically show sub-counties for the selected county
- Fixed ward filter to dynamically show wards for the selected sub-county

## Testing
Run `npm run dev` to test the application locally.

