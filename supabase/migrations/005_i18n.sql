-- Multilingual support (az, en, ru)
-- Run in Supabase SQL Editor after previous migrations

-- ─── site_settings ───────────────────────────────────────────────────────────
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS name_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tagline_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS hero_badge_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS hero_title_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS hero_subtitle_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS about_title_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS about_paragraphs_i18n jsonb NOT NULL DEFAULT '{}';

UPDATE site_settings SET
  name_i18n = jsonb_build_object('az', name),
  tagline_i18n = jsonb_build_object('az', tagline),
  hero_badge_i18n = jsonb_build_object('az', hero_badge),
  hero_title_i18n = jsonb_build_object('az', hero_title),
  hero_subtitle_i18n = jsonb_build_object('az', hero_subtitle),
  about_title_i18n = jsonb_build_object('az', about_title),
  about_paragraphs_i18n = jsonb_build_object('az', about_paragraphs)
WHERE id = 1;

-- ─── nav_items ─────────────────────────────────────────────────────────────
ALTER TABLE nav_items ADD COLUMN IF NOT EXISTS label_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE nav_items SET label_i18n = jsonb_build_object('az', label) WHERE label_i18n = '{}'::jsonb;

-- ─── team_members ────────────────────────────────────────────────────────────
ALTER TABLE team_members
  ADD COLUMN IF NOT EXISTS name_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS role_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE team_members SET
  name_i18n = jsonb_build_object('az', name),
  role_i18n = jsonb_build_object('az', role)
WHERE name_i18n = '{}'::jsonb;

-- ─── services ────────────────────────────────────────────────────────────────
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS title_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS description_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE services SET
  title_i18n = jsonb_build_object('az', title),
  description_i18n = jsonb_build_object('az', description)
WHERE title_i18n = '{}'::jsonb;

-- ─── stats ───────────────────────────────────────────────────────────────────
ALTER TABLE stats ADD COLUMN IF NOT EXISTS label_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE stats SET label_i18n = jsonb_build_object('az', label) WHERE label_i18n = '{}'::jsonb;

-- ─── partners ────────────────────────────────────────────────────────────────
ALTER TABLE partners ADD COLUMN IF NOT EXISTS name_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE partners SET name_i18n = jsonb_build_object('az', name) WHERE name_i18n = '{}'::jsonb;

-- ─── why_us_items ────────────────────────────────────────────────────────────
ALTER TABLE why_us_items
  ADD COLUMN IF NOT EXISTS title_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS description_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE why_us_items SET
  title_i18n = jsonb_build_object('az', title),
  description_i18n = jsonb_build_object('az', description)
WHERE title_i18n = '{}'::jsonb;

-- ─── blog_posts ──────────────────────────────────────────────────────────────
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS title_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS excerpt_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS content_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS category_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE blog_posts SET
  title_i18n = jsonb_build_object('az', title),
  excerpt_i18n = jsonb_build_object('az', excerpt),
  content_i18n = jsonb_build_object('az', content),
  category_i18n = jsonb_build_object('az', category)
WHERE title_i18n = '{}'::jsonb;

-- ─── academy_courses ─────────────────────────────────────────────────────────
ALTER TABLE academy_courses
  ADD COLUMN IF NOT EXISTS name_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS duration_i18n jsonb NOT NULL DEFAULT '{}';
UPDATE academy_courses SET
  name_i18n = jsonb_build_object('az', name),
  duration_i18n = jsonb_build_object('az', duration)
WHERE name_i18n = '{}'::jsonb;
