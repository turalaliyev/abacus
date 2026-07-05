-- Academy single-page content + knowledge quiz
-- Run in Supabase SQL Editor after 005–007 migrations

-- ─── Academy content on site_settings ───────────────────────────────────────
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS academy_title text NOT NULL DEFAULT 'Abacus Akademiya',
  ADD COLUMN IF NOT EXISTS academy_title_i18n jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS academy_paragraphs jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS academy_paragraphs_i18n jsonb NOT NULL DEFAULT '{}';

UPDATE site_settings SET
  academy_title = 'Abacus Akademiya',
  academy_title_i18n = '{
    "az": "Abacus Akademiya",
    "en": "Abacus Academy",
    "ru": "Академия Abacus"
  }'::jsonb,
  academy_paragraphs = '[
    "Abacus Akademiya audit, vergi, mühasibatlıq, insan resursları və dövlət satınalmaları sahələrində praktiki biliklər qazandıran peşəkar təlim proqramları təqdim edir.",
    "Təlimlər təcrübəli mütəxəssislər tərəfindən aparılır və real biznes vəziyyətlərinə əsaslanır. Məqsədimiz iştirakçıların peşəkar bacarıqlarını artırmaqdır.",
    "Aşağıdakı bilik testi ilə sahə üzrə hazırlıq səviyyənizi yoxlayın və nəticəyə əsasən Akademiya proqramları haqqında ətraflı məlumat üçün bizimlə əlaqə saxlayın."
  ]'::jsonb,
  academy_paragraphs_i18n = '{
    "az": [
      "Abacus Akademiya audit, vergi, mühasibatlıq, insan resursları və dövlət satınalmaları sahələrində praktiki biliklər qazandıran peşəkar təlim proqramları təqdim edir.",
      "Təlimlər təcrübəli mütəxəssislər tərəfindən aparılır və real biznes vəziyyətlərinə əsaslanır. Məqsədimiz iştirakçıların peşəkar bacarıqlarını artırmaqdır.",
      "Aşağıdakı bilik testi ilə sahə üzrə hazırlıq səviyyənizi yoxlayın və nəticəyə əsasən Akademiya proqramları haqqında ətraflı məlumat üçün bizimlə əlaqə saxlayın."
    ],
    "en": [
      "Abacus Academy offers professional training programs in audit, tax, accounting, human resources, and public procurement.",
      "Courses are led by experienced specialists and based on real business scenarios. Our goal is to strengthen participants'' professional skills.",
      "Take the knowledge test below to assess your readiness, then contact us for detailed information about Academy programs."
    ],
    "ru": [
      "Академия Abacus предлагает профессиональные программы обучения в области аудита, налогообложения, бухучёта, HR и государственных закупок.",
      "Занятия ведут опытные специалисты на основе реальных бизнес-ситуаций. Наша цель — повысить профессиональные навыки участников.",
      "Пройдите тест ниже, чтобы оценить уровень подготовки, и свяжитесь с нами для подробной информации о программах Академии."
    ]
  }'::jsonb
WHERE id = 1;

-- ─── Simplify navigation: single Academy link ───────────────────────────────
DELETE FROM nav_items
WHERE parent_id IN (SELECT id FROM nav_items WHERE href = '/akademiya' AND parent_id IS NULL);

-- ─── Quiz questions table ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS academy_quiz_questions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic         text NOT NULL CHECK (topic IN ('audit', 'tax', 'accounting', 'hr', 'consulting', 'legal', 'procurement')),
  question      text NOT NULL DEFAULT '',
  question_i18n jsonb NOT NULL DEFAULT '{}',
  options_i18n  jsonb NOT NULL DEFAULT '{}',
  correct_index int NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  is_active     boolean NOT NULL DEFAULT true,
  sort_order    int NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_academy_quiz_questions_active ON academy_quiz_questions (is_active, topic);

ALTER TABLE academy_quiz_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active academy quiz" ON academy_quiz_questions;
CREATE POLICY "Public read active academy quiz"
  ON academy_quiz_questions FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Admin all academy_quiz_questions" ON academy_quiz_questions;
CREATE POLICY "Admin all academy_quiz_questions"
  ON academy_quiz_questions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seed questions: run scripts/seed-academy-quiz.mjs to generate 009_academy_quiz_seed.sql
-- or execute 009_academy_quiz_seed.sql after this migration.
