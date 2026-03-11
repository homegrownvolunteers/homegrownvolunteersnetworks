
-- Create a security definer function to insert memberships
-- This allows membership creation right after signup before email confirmation
CREATE OR REPLACE FUNCTION public.create_membership(
  p_user_id UUID,
  p_sector membership_sector,
  p_subcategory TEXT,
  p_tier membership_tier DEFAULT 'free',
  p_skill_level TEXT DEFAULT NULL,
  p_intent TEXT[] DEFAULT NULL,
  p_status membership_status DEFAULT 'pending',
  p_approved BOOLEAN DEFAULT false
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Verify the user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RAISE EXCEPTION 'Invalid user ID';
  END IF;

  INSERT INTO public.memberships (user_id, sector, subcategory, tier, skill_level, intent, status, approved)
  VALUES (p_user_id, p_sector, p_subcategory, p_tier, p_skill_level, p_intent, p_status, p_approved)
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;
