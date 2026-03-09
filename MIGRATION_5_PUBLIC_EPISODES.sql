-- Migration 5: Public Episode Submissions
-- File: 20260309000000_allow_public_tv_episode_inserts.sql
-- Allows public users to submit TV episodes (moderated by admins)

CREATE POLICY "Anyone can submit episodes" ON public.tv_episodes FOR INSERT WITH CHECK (true);
