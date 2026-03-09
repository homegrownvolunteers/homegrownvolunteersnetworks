-- Migration 3: Fix RLS Policies
-- File: 20260308212515_fa0aeac1-3572-4a66-93b9-d1feb0dd0bd1.sql
-- Fixes and refines Row-Level Security policies

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
CREATE POLICY "Users can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Fix newsletter_subscribers policies
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
