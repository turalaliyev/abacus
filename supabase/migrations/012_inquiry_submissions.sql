-- Customer inquiry / lead capture form submissions
-- Run in Supabase SQL Editor after previous migrations

CREATE TABLE IF NOT EXISTS inquiry_submissions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    text NOT NULL,
  company_name text NOT NULL DEFAULT '',
  phone        text NOT NULL,
  email        text NOT NULL,
  services     text[] NOT NULL DEFAULT '{}',
  goal         text NOT NULL,
  timeline     text NOT NULL,
  budget       text NOT NULL,
  notes        text NOT NULL DEFAULT '',
  status       text NOT NULL DEFAULT 'new'
                 CHECK (status IN ('new', 'contacted', 'closed')),
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiry_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous website visitors) can submit
CREATE POLICY "Public insert inquiry_submissions"
  ON inquiry_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins can read and update
CREATE POLICY "Admin read inquiry_submissions"
  ON inquiry_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update inquiry_submissions"
  ON inquiry_submissions FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admin delete inquiry_submissions"
  ON inquiry_submissions FOR DELETE
  TO authenticated
  USING (true);

-- Index for admin inbox sorted by newest
CREATE INDEX IF NOT EXISTS idx_inquiry_submissions_created
  ON inquiry_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_inquiry_submissions_status
  ON inquiry_submissions (status, created_at DESC);
