-- Migration 6: Admin Access Management
-- File: 20260309000001_admin_access_management.sql
-- Creates admin access control system

-- Create admin_users table to track admin access
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  is_admin boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(email)
);

-- Create admin_requests table for admin access requests
CREATE TABLE IF NOT EXISTS public.admin_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at timestamp with time zone DEFAULT now(),
  UNIQUE(email)
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can view admin users" ON public.admin_users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only admins can modify admin users" ON public.admin_users FOR ALL TO authenticated USING (EXISTS (
  SELECT 1 FROM public.admin_users WHERE id = auth.uid()
)) WITH CHECK (EXISTS (
  SELECT 1 FROM public.admin_users WHERE id = auth.uid()
));

-- Enable RLS on admin_requests
ALTER TABLE public.admin_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can view requests" ON public.admin_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only admins can modify requests" ON public.admin_requests FOR ALL TO authenticated USING (EXISTS (
  SELECT 1 FROM public.admin_users WHERE id = auth.uid()
)) WITH CHECK (EXISTS (
  SELECT 1 FROM public.admin_users WHERE id = auth.uid()
));
CREATE POLICY "Anyone can insert their own request" ON public.admin_requests FOR INSERT WITH CHECK (true);

-- Create function to grant admin role
CREATE OR REPLACE FUNCTION grant_admin_role(_user_id uuid)
RETURNS void AS $$
BEGIN
  INSERT INTO public.admin_users (id, email, is_admin)
  SELECT id, email, true FROM auth.users WHERE id = _user_id
  ON CONFLICT (email) DO UPDATE SET is_admin = true;
END;
$$ LANGUAGE plpgsql;

-- Create function to revoke admin role
CREATE OR REPLACE FUNCTION revoke_admin_role(_user_id uuid)
RETURNS void AS $$
BEGIN
  DELETE FROM public.admin_users WHERE id = _user_id;
END;
$$ LANGUAGE plpgsql;
