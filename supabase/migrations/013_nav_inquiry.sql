-- Add "Müraciət" (inquiry form) under "Biz kimik" in the header navigation

INSERT INTO nav_items (id, label, href, parent_id, sort_order, label_i18n, is_visible)
VALUES (
  'a0000001-0000-4000-8000-000000000024',
  'Müraciət',
  '/muraciet',
  'a0000001-0000-4000-8000-000000000002',
  4,
  '{"az":"Müraciət","en":"Inquiry","ru":"Заявка"}'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  href = EXCLUDED.href,
  parent_id = EXCLUDED.parent_id,
  sort_order = EXCLUDED.sort_order,
  label_i18n = EXCLUDED.label_i18n,
  is_visible = EXCLUDED.is_visible;
