-- Academy description: rich HTML (TipTap) instead of plain-text paragraphs
-- Run in Supabase SQL Editor after 008_academy_quiz.sql

ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS academy_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS academy_description_i18n jsonb NOT NULL DEFAULT '{}';

CREATE OR REPLACE FUNCTION paragraphs_json_to_html(arr jsonb)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(string_agg('<p>' || elem || '</p>', ''), '')
  FROM jsonb_array_elements_text(COALESCE(arr, '[]'::jsonb)) AS elem;
$$;

UPDATE site_settings SET
  academy_description = CASE
    WHEN academy_description <> '' THEN academy_description
    ELSE paragraphs_json_to_html(academy_paragraphs)
  END,
  academy_description_i18n = CASE
    WHEN academy_description_i18n <> '{}'::jsonb AND academy_description_i18n ? 'az'
    THEN academy_description_i18n
    ELSE jsonb_build_object(
      'az', paragraphs_json_to_html(COALESCE(academy_paragraphs_i18n->'az', academy_paragraphs)),
      'en', paragraphs_json_to_html(academy_paragraphs_i18n->'en'),
      'ru', paragraphs_json_to_html(academy_paragraphs_i18n->'ru')
    )
  END
WHERE id = 1;

DROP FUNCTION IF EXISTS paragraphs_json_to_html(jsonb);
