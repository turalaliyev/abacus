-- Optional: create public storage bucket for site media (run after schema)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read site-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

-- Admin write policies will be added with the admin panel (authenticated users only)
