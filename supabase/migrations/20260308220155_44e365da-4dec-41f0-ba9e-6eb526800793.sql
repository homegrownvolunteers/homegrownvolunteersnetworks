
-- Add approved column to memberships
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;

-- Add new volunteer fields
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS experience text;
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS why_join text;

-- Create content-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('content-images', 'content-images', true) ON CONFLICT (id) DO NOTHING;

-- Storage RLS: anyone can read content-images
CREATE POLICY "Public read content-images" ON storage.objects FOR SELECT USING (bucket_id = 'content-images');

-- Storage RLS: admins can upload to content-images
CREATE POLICY "Admins upload content-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'content-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage RLS: admins can delete from content-images
CREATE POLICY "Admins delete content-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'content-images' AND public.has_role(auth.uid(), 'admin'));

-- Admin can update memberships (for approval)
CREATE POLICY "Admins can update memberships" ON public.memberships FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
