-- Abacus Audit CMS schema
-- Run in Supabase SQL Editor, then run supabase/seed.sql

-- ─── Media registry (logo, hero video, blog covers, etc.) ───────────────────
CREATE TABLE IF NOT EXISTS media_assets (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key        text UNIQUE NOT NULL,
  url        text NOT NULL DEFAULT '',
  media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
  alt_text   text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ─── Site settings (single row) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id              int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name            text NOT NULL,
  tagline         text NOT NULL,
  phone           text NOT NULL,
  email           text NOT NULL,
  address         text NOT NULL,
  facebook_url    text NOT NULL DEFAULT '',
  instagram_url   text NOT NULL DEFAULT '',
  linkedin_url    text NOT NULL DEFAULT '',
  whatsapp_url    text NOT NULL DEFAULT '',
  hero_badge      text NOT NULL DEFAULT '',
  hero_title      text NOT NULL DEFAULT '',
  hero_subtitle   text NOT NULL DEFAULT '',
  about_title     text NOT NULL DEFAULT '',
  about_paragraphs jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── Navigation ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nav_items (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label      text NOT NULL,
  href       text NOT NULL,
  parent_id  uuid REFERENCES nav_items(id) ON DELETE CASCADE,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true
);

-- ─── Team ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  role         text NOT NULL,
  image_url    text NOT NULL DEFAULT '',
  sort_order   int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true
);

-- ─── Services ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE NOT NULL,
  title        text NOT NULL,
  description  text NOT NULL,
  icon         text NOT NULL DEFAULT 'file',
  image_url    text NOT NULL DEFAULT '',
  sort_order   int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true
);

-- ─── Stats ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value      int NOT NULL,
  suffix     text NOT NULL DEFAULT '',
  label      text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- ─── Partners ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  logo_url   text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true
);

-- ─── Why us ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS why_us_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text NOT NULL,
  sort_order  int NOT NULL DEFAULT 0
);

-- ─── Blog ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  excerpt         text NOT NULL,
  content         text NOT NULL DEFAULT '',
  category        text NOT NULL DEFAULT '',
  post_type       text NOT NULL CHECK (post_type IN ('xeberler', 'qanunvericilik')),
  cover_image_url text NOT NULL DEFAULT '',
  published_at    timestamptz NOT NULL DEFAULT now(),
  is_published    boolean NOT NULL DEFAULT true
);

-- ─── Academy ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS academy_courses (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track        text NOT NULL CHECK (track IN ('maliyye', 'insan-resurslari', 'satin-alma')),
  name         text NOT NULL,
  duration     text NOT NULL,
  image_url    text NOT NULL DEFAULT '',
  sort_order   int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_nav_items_parent ON nav_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_type ON blog_posts(post_type, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_academy_courses_track ON academy_courses(track, sort_order);

-- ─── updated_at trigger ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER media_assets_updated_at
  BEFORE UPDATE ON media_assets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Row Level Security (public read, admin write later) ────────────────────
ALTER TABLE media_assets    ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members    ENABLE ROW LEVEL SECURITY;
ALTER TABLE services        ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats           ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners        ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_us_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read media_assets"    ON media_assets    FOR SELECT USING (true);
CREATE POLICY "Public read site_settings"   ON site_settings   FOR SELECT USING (true);
CREATE POLICY "Public read nav_items"       ON nav_items       FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read team_members"    ON team_members    FOR SELECT USING (is_published = true);
CREATE POLICY "Public read services"        ON services        FOR SELECT USING (is_published = true);
CREATE POLICY "Public read stats"           ON stats           FOR SELECT USING (true);
CREATE POLICY "Public read partners"        ON partners        FOR SELECT USING (is_published = true);
CREATE POLICY "Public read why_us_items"    ON why_us_items    FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts"      ON blog_posts      FOR SELECT USING (is_published = true);
CREATE POLICY "Public read academy_courses" ON academy_courses FOR SELECT USING (is_published = true);
