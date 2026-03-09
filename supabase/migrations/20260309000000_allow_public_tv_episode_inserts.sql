-- Allow public users to submit TV episodes
-- This policy allows anyone to insert into tv_episodes table
CREATE POLICY "Anyone can submit episodes" ON public.tv_episodes FOR INSERT WITH CHECK (true);
