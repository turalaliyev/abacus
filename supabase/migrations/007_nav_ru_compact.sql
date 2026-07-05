-- Shorter Russian nav label (prevents header wrap). Run if you already applied 006_i18n_translations.sql
UPDATE nav_items
SET label_i18n = label_i18n || '{"ru":"Компания"}'::jsonb
WHERE id = 'a0000001-0000-4000-8000-000000000002';
