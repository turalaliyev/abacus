-- Abacus Audit seed data
-- Run AFTER 001_initial_schema.sql in Supabase SQL Editor

-- Clear existing data (safe re-run)
TRUNCATE media_assets, site_settings, nav_items, team_members, services,
         stats, partners, why_us_items, blog_posts, academy_courses CASCADE;

-- ─── Media assets (add your URLs in Supabase Table Editor or Storage) ───────
INSERT INTO media_assets (key, url, media_type, alt_text) VALUES
  ('logo',         '', 'image', 'Abacus Audit loqosu'),
  ('favicon',      '', 'image', 'Abacus Audit favicon'),
  ('hero_video',   '', 'video', 'Əsas səhifə hero videosu'),
  ('hero_poster',  '', 'image', 'Hero video poster şəkli'),
  ('about_image',  '', 'image', 'Haqqımızda bölmə şəkli'),
  ('blog_default', '', 'image', 'Bloq üçün standart şəkil');

-- ─── Site settings ───────────────────────────────────────────────────────────
INSERT INTO site_settings (
  id, name, tagline, phone, email, address,
  facebook_url, instagram_url, linkedin_url, whatsapp_url,
  hero_badge, hero_title, hero_subtitle, about_title, about_paragraphs
) VALUES (
  1,
  'Abacus Audit & Consulting LLC',
  'Peşəkar audit, vergi və mühasibatlıq xidmətləri',
  '+994 55 213 47 37',
  'info@abacusaudit.az',
  'Bakı şəhəri Nərimanov rayonu Məsud Əlizadə küçəsi 138',
  'https://facebook.com',
  'https://instagram.com',
  'https://linkedin.com',
  'https://wa.me/994552134737',
  'Azərbaycanın aparıcı auditor-konsaltinq şirkəti',
  'Maliyyənizə güvən və dəqiqlik gətiririk',
  'Abacus Audit & Consulting LLC — audit, vergi, mühasibatlıq və konsaltinq sahələrində peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlər təqdim edir.',
  'Abacus Audit',
  '[
    "Abacus Audit şirkəti – maliyyə, audit, hüquq, vergi, konsaltinq və mühasibatlıq sahələrində zəngin təcrübəyə malik peşəkarlar tərəfindən yaradılmışdır. Biz, peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlərimizlə tanınırıq.",
    "Abacus Audit və Konsaltinq şirkəti olaraq biz müştərilərimizə ən yüksək səviyyədə mühasibat, audit, vergi hesabatı və konsaltinq xidmətləri təqdim edirik. Bizim missiyamız sizi hüquq, vergi və idarəetmə sahələrindən məlumatlandırmaq və dəstəkləməkdir.",
    "Müştərilərimizə təklif etdiyimiz operativ və yüksək keyfiyyətli xidmətlər sayəsində, Abacus Audit Azərbaycanın ən böyük auditor-konsaltinq şirkətləri qrupuna daxildir. Əsas məqsədimiz müştərilərimizi rəqabətli biznesin qurulmasında dəstəkləməkdir."
  ]'::jsonb
);

-- ─── Navigation (fixed UUIDs for parent links) ─────────────────────────────────
INSERT INTO nav_items (id, label, href, parent_id, sort_order) VALUES
  ('a0000001-0000-4000-8000-000000000001', 'Əsas', '/', NULL, 1),
  ('a0000001-0000-4000-8000-000000000002', 'Biz kimik', '/haqqimizda', NULL, 2),
  ('a0000001-0000-4000-8000-000000000021', 'Haqqımızda', '/haqqimizda', 'a0000001-0000-4000-8000-000000000002', 1),
  ('a0000001-0000-4000-8000-000000000022', 'Niyə biz', '/niye-biz', 'a0000001-0000-4000-8000-000000000002', 2),
  ('a0000001-0000-4000-8000-000000000023', 'Partnyorlarımız', '/partnyorlar', 'a0000001-0000-4000-8000-000000000002', 3),
  ('a0000001-0000-4000-8000-000000000003', 'Xidmətlər', '/xidmetler', NULL, 3),
  ('a0000001-0000-4000-8000-000000000031', 'Audit', '/xidmetler/audit', 'a0000001-0000-4000-8000-000000000003', 1),
  ('a0000001-0000-4000-8000-000000000032', 'Vergi uçotu və vergitutma', '/xidmetler/vergi', 'a0000001-0000-4000-8000-000000000003', 2),
  ('a0000001-0000-4000-8000-000000000033', 'Konsaltinq', '/xidmetler/konsaltinq', 'a0000001-0000-4000-8000-000000000003', 3),
  ('a0000001-0000-4000-8000-000000000034', 'Qiymətləndirmə', '/xidmetler/qiymetlendirme', 'a0000001-0000-4000-8000-000000000003', 4),
  ('a0000001-0000-4000-8000-000000000035', 'Hüquqi xidmətlər', '/xidmetler/huquq', 'a0000001-0000-4000-8000-000000000003', 5),
  ('a0000001-0000-4000-8000-000000000036', 'Mühasibat uçotu', '/xidmetler/muhasibat', 'a0000001-0000-4000-8000-000000000003', 6),
  ('a0000001-0000-4000-8000-000000000037', 'Kommersiya hüquqi şəxslərin qeydiyyatı', '/xidmetler/qeydiyyat', 'a0000001-0000-4000-8000-000000000003', 7),
  ('a0000001-0000-4000-8000-000000000038', 'Kadr kargüzarlığı', '/xidmetler/kadr', 'a0000001-0000-4000-8000-000000000003', 8),
  ('a0000001-0000-4000-8000-000000000039', 'Miqrasiya xidmətləri', '/xidmetler/miqrasiya', 'a0000001-0000-4000-8000-000000000003', 9),
  ('a0000001-0000-4000-8000-000000000004', 'Bloq', '/bloq', NULL, 4),
  ('a0000001-0000-4000-8000-000000000041', 'Xəbərlər', '/bloq/xeberler', 'a0000001-0000-4000-8000-000000000004', 1),
  ('a0000001-0000-4000-8000-000000000042', 'Qanunvericilik', '/bloq/qanunvericilik', 'a0000001-0000-4000-8000-000000000004', 2),
  ('a0000001-0000-4000-8000-000000000005', 'Akademiya', '/akademiya', NULL, 5),
  ('a0000001-0000-4000-8000-000000000051', 'Maliyyə və Mühasibatlıq', '/akademiya/maliyye', 'a0000001-0000-4000-8000-000000000005', 1),
  ('a0000001-0000-4000-8000-000000000052', 'İnsan Resursları', '/akademiya/insan-resurslari', 'a0000001-0000-4000-8000-000000000005', 2),
  ('a0000001-0000-4000-8000-000000000053', 'Dövlət satınalmaları', '/akademiya/satin-alma', 'a0000001-0000-4000-8000-000000000005', 3),
  ('a0000001-0000-4000-8000-000000000006', 'Kalkulyator', '/kalkulyator', NULL, 6),
  ('a0000001-0000-4000-8000-000000000007', 'Əlaqə', '/elaqe', NULL, 7);

-- ─── Team members (image_url: add your Supabase Storage URLs later) ──────────
INSERT INTO team_members (name, role, image_url, sort_order) VALUES
  ('Rüfət Zeynalov', 'İdarəedici partnyor, Auditor', '', 1),
  ('Asif Əliyev', 'Vergi və mühasibat uçotu üzrə partnyor', '', 2),
  ('Ülviyyə Abbaslı', 'Mühasibatlıq bölməsinin rəhbəri', '', 3),
  ('Zemfira Zeynalova', 'Kadr uçotu və miqrasiya xidmətləri üzrə menecer', '', 4),
  ('Niyaməddin Həsənov', 'Aparıcı Mühasib', '', 5),
  ('Urfan Niftəliyev', 'Audit Köməkçisi', '', 6),
  ('Nuranə İbadova', 'Audit Köməkçisi', '', 7),
  ('Fidan Qarazadə', 'Audit Köməkçisi', '', 8),
  ('Ülkər Məmmədli', 'Maliyyə Meneceri', '', 9),
  ('Mikayıl Məmmədov', 'Audit Köməkçisi', '', 10);

-- ─── Services ────────────────────────────────────────────────────────────────
INSERT INTO services (slug, title, description, icon, sort_order) VALUES
  ('audit', 'Audit xidməti',
   'Audit – əmtəə istehsalı və satışı, xidmət göstərilməsi və iş görülməsi ilə məşğul olan təsərrüfat subyektlərində mühasibat uçotunun dəqiq və dürüst aparılmasının, mühasibat və maliyyə hesabatlarının müstəqil yoxlanılmasıdır.',
   'shield-check', 1),
  ('vergi', 'Vergi uçotu və vergitutma',
   'Vergi — dövlətin və bələdiyyələrin fəaliyyətinin maliyyə təminatı məqsədi ilə vergi ödəyicilərinin mülkiyyətində olan pul vəsaitlərinin mənimsəməsi şəklində dövlət büdcəsinə və yerli büdcələrə köçürülən məcburi, fərdi, əvəzsiz ödənişdir.',
   'receipt', 2),
  ('muhasibat', 'Mühasibat uçotu',
   'Mühasibat uçotu – vacib və mürəkkəb bir sistemdir. Bəzən müəssisənin gələcəyi, bu sistemin düzgün və effektiv qurulmasından asılıdır. Təklif etdiyimiz xidmətin işi müəssisənin daxili idarəetmə hesabatlarının və maliyyə hesabatlarının hazırlanmasıdır.',
   'calculator', 3),
  ('konsaltinq', 'Konsaltinq',
   'Abacus Audit And Consulting MMC mühasibat, audit, hüquq, vergi və s. sahələrində konsaltinq xidmətlərini təklif edir. Hər hansı bir sual və ya problemlə üzləşdikdə, onun həlli üçün günlərlə fikirləşərək vaxt itirmək əvəzinə bizimlə əlaqə saxlayın.',
   'lightbulb', 4),
  ('miqrasiya', 'Miqrasiya xidməti',
   'Azərbaycan Respublikasında əcnəbi vətəndaşların və vətəndaşlığı olmayan şəxslərin əmək fəaliyyəti ilə məşğul olması üçün iş icazəsi və yaşama icazəsinin alınması qanunvericiliyə əsasən məcburidir.',
   'globe', 5),
  ('hr-audit', 'HR Audit',
   'Müəssisənizdə kadr sənədlərinin düzgün aparılmaması gələcəkdə ciddi hüquqi problemlərə, inzibati cərimələrə səbəb ola bilər. Kadr sənədlərinin auditi xidməti məhz bu risklərin qarşısını almaq üçün həyata keçirilir.',
   'users', 6);

-- ─── Stats ───────────────────────────────────────────────────────────────────
INSERT INTO stats (value, suffix, label, sort_order) VALUES
  (500, '+', 'Layihə', 1),
  (300, '+', 'Müştəri', 2),
  (3, '', 'Ofis', 3),
  (15, '+', 'İllik təcrübə', 4);

-- ─── Partners ────────────────────────────────────────────────────────────────
INSERT INTO partners (name, logo_url, sort_order) VALUES
  ('Sosial Dəstək Mərkəzi PHŞ', '', 1),
  ('Əməyin Mühafizəsi Mərkəzi PHŞ', '', 2),
  ('Dördüncü Sənaye İnqilabının Təhlili və Koordinasiya Mərkəzi PHŞ', '', 3),
  ('Bakı Beynəlxalq Dəniz Ticarət Limanı QSC', '', 4),
  ('Aqrar Sığorta Fondu', '', 5),
  ('Dövlət İmtahan Mərkəzi (DİM)', '', 6),
  ('Azəristiliktəchizat ASC', '', 7),
  ('Bakı Konqres Mərkəzi', '', 8),
  ('Maliyyə Monitorinq Xidməti', '', 9),
  ('Aqroservis ASC', '', 10),
  ('Medianın İnkişafı Agentliyi PHŞ', '', 11),
  ('Betta MMC', '', 12),
  ('Can Pa MMC', '', 13),
  ('Garden Harvest MMC', '', 14),
  ('Hightechnic Systems MMC', '', 15),
  ('SF Azerbaijan BOKT', '', 16),
  ('Sophie Couture MMC', '', 17),
  ('Emiloğlu MMC', '', 18),
  ('Kral MTK', '', 19),
  ('Nobel Elektrik MMC', '', 20),
  ('Best Energy Group MMC', '', 21),
  ('Azəri Firması', '', 22),
  ('AFN Transport MMC', '', 23);

-- ─── Why us ──────────────────────────────────────────────────────────────────
INSERT INTO why_us_items (title, description, sort_order) VALUES
  ('Peşəkar komanda', 'Sertifikatlı auditorlar və mütəxəssislərdən ibarət təcrübəli komanda.', 1),
  ('Şəffaflıq', 'Bütün proseslərdə açıq və dəqiq məlumatlandırma.', 2),
  ('Operativlik', 'Vaxtında və keyfiyyətli xidmət göstərmə öhdəliyimiz.', 3),
  ('Geniş xidmət spektri', 'Audit-dən miqrasiyaya qədər tam həllər.', 4);

-- ─── Blog posts (cover_image_url: add later) ─────────────────────────────────
INSERT INTO blog_posts (slug, title, excerpt, category, post_type, cover_image_url, published_at) VALUES
  ('vergi-deyisiklikleri-2026', '2026-cı il üçün vergi qanunvericiliyində dəyişikliklər',
   'Yeni il ilə birlikdə qüvvəyə minən vergi dəyişikliklərinin müəssisələrə təsiri barədə ətraflı icmal.',
   'Qanunvericilik', 'qanunvericilik', '', '2026-01-12'),
  ('audit-hesabat-hazirligi', 'Maliyyə hesabatlarının auditə hazırlanması',
   'İllik audit prosesinə müəssisənizi necə düzgün hazırlamaq və ümumi səhvlərdən qaçmaq olar.',
   'Audit', 'xeberler', '', '2025-12-28'),
  ('kadr-senedleri', 'Kadr sənədlərinin idarə edilməsi qaydaları',
   'İşçi sənədlərinin düzgün aparılması və inzibati məsuliyyətdən qorunma yolları.',
   'Kadr', 'xeberler', '', '2025-12-15');

-- ─── Academy courses ─────────────────────────────────────────────────────────
INSERT INTO academy_courses (track, name, duration, sort_order) VALUES
  ('maliyye', 'Mühasibat uçotunun əsasları', '8 həftə', 1),
  ('maliyye', 'Vergi uçotu və hesabatlılıq', '6 həftə', 2),
  ('maliyye', 'Maliyyə təhlili', '5 həftə', 3),
  ('insan-resurslari', 'Kadr kargüzarlığı', '6 həftə', 1),
  ('insan-resurslari', 'Əmək qanunvericiliyi', '4 həftə', 2),
  ('insan-resurslari', 'HR idarəetmə sistemləri', '5 həftə', 3),
  ('satin-alma', 'Satınalma qanunvericiliyinin əsasları', '5 həftə', 1),
  ('satin-alma', 'Tender prosedurları', '4 həftə', 2),
  ('satin-alma', 'Müqavilələrin idarə edilməsi', '4 həftə', 3);
