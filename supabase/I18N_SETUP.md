# Multilingual (AZ / EN / RU) — Supabase setup

## 1. Run the migrations

In **Supabase Dashboard → SQL Editor**, run in order:

1. `supabase/migrations/005_i18n.sql` (if not already run)
2. `supabase/migrations/006_i18n_translations.sql` — **pre-filled EN/RU translations for all content**

The `006` file updates site settings, navigation, services, team roles, stats, partners, why-us, blog, and academy courses.

### JSON format

Each `*_i18n` field stores:

```json
{
  "az": "Azərbaycan mətni",
  "en": "English text",
  "ru": "Русский текст"
}
```

Paragraphs (`about_paragraphs_i18n`) use arrays per language:

```json
{
  "az": ["Paraqraf 1", "Paraqraf 2"],
  "en": ["Paragraph 1", "Paragraph 2"],
  "ru": ["Абзац 1", "Абзац 2"]
}
```

Legacy columns (`title`, `name`, `label`, etc.) are kept for backward compatibility. The website reads `*_i18n` first, then falls back to the legacy column, then to `az`.

## 2. Fill translations in Admin Panel

After deploying the updated admin app, open each section and use the **AZ | EN | RU** tabs on translatable fields.

Recommended order:

1. **Sayt parametrləri** — company name, hero, about
2. **Naviqasiya** — menu labels
3. **Xidmətlər**, **Komanda**, **Bloq**, **Akademiya**
4. **Statistika**, **Niyə biz**, **Partnyorlar**

## 3. Manual SQL example (optional)

To set English for a service title:

```sql
UPDATE services
SET title_i18n = title_i18n || '{"en": "Audit service"}'::jsonb,
    title = COALESCE(title, 'Audit xidməti')
WHERE slug = 'audit';
```

## 4. Tables with i18n columns

| Table | i18n columns |
|-------|----------------|
| `site_settings` | `name_i18n`, `tagline_i18n`, `hero_*_i18n`, `about_*_i18n` |
| `nav_items` | `label_i18n` |
| `team_members` | `name_i18n`, `role_i18n` |
| `services` | `title_i18n`, `description_i18n` |
| `stats` | `label_i18n` |
| `partners` | `name_i18n` |
| `why_us_items` | `title_i18n`, `description_i18n` |
| `blog_posts` | `title_i18n`, `excerpt_i18n`, `content_i18n`, `category_i18n` |
| `academy_courses` | `name_i18n`, `duration_i18n` |

## 5. Website language switcher

Users pick **AZ / EN / RU** in the navbar. Choice is saved in `localStorage` (`abacus-locale`).

No extra Supabase config is required for language switching — all languages live in the same rows.

## 6. Redeploy

- **Netlify (website):** redeploy after pulling i18n code (env vars unchanged)
- **Admin:** restart `npm run dev` or redeploy admin app

## 7. Verify

1. Admin → edit a service → add EN and RU titles → Save
2. Website → switch to EN → service title should change
3. If EN/RU is empty, Azerbaijani is shown automatically
