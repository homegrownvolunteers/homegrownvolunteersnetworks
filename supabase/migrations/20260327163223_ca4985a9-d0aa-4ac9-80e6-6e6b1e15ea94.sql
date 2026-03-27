
-- Media categories table
CREATE TABLE public.media_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.media_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media categories viewable by everyone" ON public.media_categories FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage media categories" ON public.media_categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Media items table
CREATE TABLE public.media_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category_id UUID REFERENCES public.media_categories(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published media viewable by everyone" ON public.media_items FOR SELECT TO public USING (published = true);
CREATE POLICY "Admins can manage media" ON public.media_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed some default categories
INSERT INTO public.media_categories (name, description) VALUES
  ('Events', 'Photos from community events and gatherings'),
  ('Agriculture', 'Farm visits, training sessions, and agricultural activities'),
  ('Arts & Culture', 'Art exhibitions, cultural performances, and creative works'),
  ('Community', 'Community engagement and volunteer activities'),
  ('Homegrown TV', 'Behind the scenes and TV production photos');
