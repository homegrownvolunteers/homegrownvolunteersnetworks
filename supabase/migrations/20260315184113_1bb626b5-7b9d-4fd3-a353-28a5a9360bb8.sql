
-- Security definer function to update profile during signup (before email confirmation)
CREATE OR REPLACE FUNCTION public.update_profile_on_signup(
  p_user_id UUID,
  p_phone TEXT DEFAULT NULL,
  p_location TEXT DEFAULT NULL,
  p_bio TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RAISE EXCEPTION 'Invalid user ID';
  END IF;

  UPDATE public.profiles
  SET phone = COALESCE(p_phone, phone),
      location = COALESCE(p_location, location),
      bio = COALESCE(p_bio, bio),
      updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;
