
-- Fix blog_posts policies: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Admins can do everything with posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Published posts viewable by everyone" ON public.blog_posts;
CREATE POLICY "Admins can do everything with posts" ON public.blog_posts FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Published posts viewable by everyone" ON public.blog_posts FOR SELECT USING (published = true);

-- Fix tv_episodes policies
DROP POLICY IF EXISTS "Admins can do everything with episodes" ON public.tv_episodes;
DROP POLICY IF EXISTS "Published episodes viewable by everyone" ON public.tv_episodes;
CREATE POLICY "Admins can do everything with episodes" ON public.tv_episodes FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Published episodes viewable by everyone" ON public.tv_episodes FOR SELECT USING (published = true);

-- Fix memberships policies
DROP POLICY IF EXISTS "Memberships viewable by everyone" ON public.memberships;
DROP POLICY IF EXISTS "Users can insert own membership" ON public.memberships;
DROP POLICY IF EXISTS "Users can update own membership" ON public.memberships;
CREATE POLICY "Memberships viewable by everyone" ON public.memberships FOR SELECT USING (true);
CREATE POLICY "Users can insert own membership" ON public.memberships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own membership" ON public.memberships FOR UPDATE USING (auth.uid() = user_id);

-- Fix volunteers policies
DROP POLICY IF EXISTS "Admins can view volunteers" ON public.volunteers;
DROP POLICY IF EXISTS "Anyone can apply to volunteer" ON public.volunteers;
CREATE POLICY "Admins can view volunteers" ON public.volunteers FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can apply to volunteer" ON public.volunteers FOR INSERT WITH CHECK (true);

-- Fix partnerships policies
DROP POLICY IF EXISTS "Admins can view partnerships" ON public.partnerships;
DROP POLICY IF EXISTS "Anyone can submit partnership" ON public.partnerships;
CREATE POLICY "Admins can view partnerships" ON public.partnerships FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit partnership" ON public.partnerships FOR INSERT WITH CHECK (true);

-- Fix story_submissions policies
DROP POLICY IF EXISTS "Admins can view submissions" ON public.story_submissions;
DROP POLICY IF EXISTS "Anyone can submit stories" ON public.story_submissions;
CREATE POLICY "Admins can view submissions" ON public.story_submissions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit stories" ON public.story_submissions FOR INSERT WITH CHECK (true);

-- Fix contact_messages policies
DROP POLICY IF EXISTS "Admins can view contacts" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_messages;
CREATE POLICY "Admins can view contacts" ON public.contact_messages FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit contact" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Fix newsletter_subscribers policies
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Fix donations policies
DROP POLICY IF EXISTS "Anyone can create donations" ON public.donations;
DROP POLICY IF EXISTS "Users can view own donations" ON public.donations;
CREATE POLICY "Anyone can create donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own donations" ON public.donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all donations" ON public.donations FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix stories policies
DROP POLICY IF EXISTS "Admins can delete stories" ON public.stories;
DROP POLICY IF EXISTS "Admins can insert stories" ON public.stories;
DROP POLICY IF EXISTS "Admins can update stories" ON public.stories;
DROP POLICY IF EXISTS "Published stories viewable by everyone" ON public.stories;
CREATE POLICY "Admins can delete stories" ON public.stories FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert stories" ON public.stories FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update stories" ON public.stories FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Published stories viewable by everyone" ON public.stories FOR SELECT USING (published = true);

-- Fix user_roles policies
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Fix profiles policies
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Fix products policies
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Products viewable by everyone" ON public.products;
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Products viewable by everyone" ON public.products FOR SELECT USING (true);

-- Fix orders policies
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- Fix order_items policies
DROP POLICY IF EXISTS "Users can insert order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
CREATE POLICY "Users can insert order items" ON public.order_items FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
