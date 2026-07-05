-- Complete services table: 9 services matching navigation labels and order
-- Run in Supabase SQL Editor after 005_i18n.sql / 006_i18n_translations.sql
--
-- Nav order (href → DB slug):
--   1 /xidmetler/audit            → audit
--   2 /xidmetler/vergi            → vergi
--   3 /xidmetler/konsaltinq       → konsaltinq
--   4 /xidmetler/qiymetlendirme   → qiymetlendirme
--   5 /xidmetler/huquq            → huquq
--   6 /xidmetler/muhasibat        → muhasibat
--   7 /xidmetler/qeydiyyat        → qeydiyyat
--   8 /xidmetler/kadr             → hr-audit
--   9 /xidmetler/miqrasiya        → miqrasiya

-- ─── Insert missing services ────────────────────────────────────────────────
INSERT INTO services (slug, title, description, icon, sort_order, is_published, title_i18n, description_i18n)
VALUES
  (
    'qiymetlendirme',
    'Qiymətləndirmə',
    'Qiymətləndirmə – aktivlərin, biznesin və maliyyə alətlərinin bazar dəyərinin müstəqil müəyyən edilməsidir. Alqı-satqı, investisiya, kredit və maliyyə hesabatı məqsədləri üçün etibarlı dəyər müəyyən etmə xidmətləri təqdim edirik.',
    'scale',
    4,
    true,
    '{"az":"Qiymətləndirmə","en":"Valuation","ru":"Оценка"}'::jsonb,
    '{"az":"Qiymətləndirmə – aktivlərin, biznesin və maliyyə alətlərinin bazar dəyərinin müstəqil müəyyən edilməsidir. Alqı-satqı, investisiya, kredit və maliyyə hesabatı məqsədləri üçün etibarlı dəyər müəyyən etmə xidmətləri təqdim edirik.","en":"Valuation is the independent determination of the market value of assets, businesses and financial instruments. We provide reliable valuation for transactions, investment, lending and financial reporting.","ru":"Оценка — независимое определение рыночной стоимости активов, бизнеса и финансовых инструментов. Мы предоставляем достоверную оценку для сделок, инвестиций, кредитования и финансовой отчётности."}'::jsonb
  ),
  (
    'huquq',
    'Hüquqi xidmətlər',
    'Hüquqi xidmətlər – müəssisələrin fəaliyyətində yarana bilən müqavilə, əmək, korporativ və kommersiya hüququ məsələlərinin peşəkar həlli. Hüquqi risklərin qiymətləndirilməsi, müqavilələrin hazırlanması və hüquqi məsləhət xidmətləri daxildir.',
    'file',
    5,
    true,
    '{"az":"Hüquqi xidmətlər","en":"Legal services","ru":"Юридические услуги"}'::jsonb,
    '{"az":"Hüquqi xidmətlər – müəssisələrin fəaliyyətində yarana bilən müqavilə, əmək, korporativ və kommersiya hüququ məsələlərinin peşəkar həlli. Hüquqi risklərin qiymətləndirilməsi, müqavilələrin hazırlanması və hüquqi məsləhət xidmətləri daxildir.","en":"Legal services cover professional resolution of contract, employment, corporate and commercial law matters, including legal risk assessment, contract drafting and legal advisory.","ru":"Юридические услуги — профессиональное решение вопросов договорного, трудового, корпоративного и коммерческого права, включая оценку правовых рисков, подготовку договоров и правовое консультирование."}'::jsonb
  ),
  (
    'qeydiyyat',
    'Kommersiya hüquqi şəxslərin qeydiyyatı',
    'Kommersiya hüquqi şəxslərin qeydiyyatı – LLC, ASC və digər kommersiya hüquqi formalarının təsis edilməsi, dəyişikliklərin qeydə alınması və ləğv edilməsi üçün dövlət orqanlarında sənədlərin hazırlanması və təqdim edilməsi xidmətidir.',
    'building',
    7,
    true,
    '{"az":"Kommersiya hüquqi şəxslərin qeydiyyatı","en":"Registration of commercial legal entities","ru":"Регистрация коммерческих юридических лиц"}'::jsonb,
    '{"az":"Kommersiya hüquqi şəxslərin qeydiyyatı – LLC, ASC və digər kommersiya hüquqi formalarının təsis edilməsi, dəyişikliklərin qeydə alınması və ləğv edilməsi üçün dövlət orqanlarında sənədlərin hazırlanması və təqdim edilməsi xidmətidir.","en":"Registration of commercial legal entities includes preparation and submission of documents to establish LLCs, JSCs and other commercial legal forms, record amendments and liquidation.","ru":"Регистрация коммерческих юридических лиц — подготовка и подача документов для создания ООО, АО и других коммерческих форм, внесения изменений и ликвидации."}'::jsonb
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published,
  title_i18n = EXCLUDED.title_i18n,
  description_i18n = EXCLUDED.description_i18n;

-- ─── Align existing services with navigation names and order ────────────────
UPDATE services SET
  title = 'Audit',
  sort_order = 1,
  title_i18n = '{"az":"Audit","en":"Audit","ru":"Аудит"}'::jsonb,
  description_i18n = '{"az":"Audit – əmtəə istehsalı və satışı, xidmət göstərilməsi və iş görülməsi ilə məşğul olan təsərrüfat subyektlərində mühasibat uçotunun dəqiq və dürüst aparılmasının, mühasibat və maliyyə hesabatlarının müstəqil yoxlanılmasıdır.","en":"Audit is the independent examination of accounting records and financial statements to verify that accounting is kept accurately and honestly at business entities engaged in production, sale of goods, provision of services and performance of work.","ru":"Аудит — независимая проверка бухгалтерского учёта и финансовой отчётности для подтверждения точного и добросовестного ведения учёта в хозяйствующих субъектах."}'::jsonb
WHERE slug = 'audit';

UPDATE services SET
  title = 'Vergi uçotu və vergitutma',
  sort_order = 2,
  title_i18n = '{"az":"Vergi uçotu və vergitutma","en":"Tax accounting and taxation","ru":"Налоговый учёт и налогообложение"}'::jsonb,
  description_i18n = '{"az":"Vergi — dövlətin və bələdiyyələrin fəaliyyətinin maliyyə təminatı məqsədi ilə vergi ödəyicilərinin mülkiyyətində olan pul vəsaitlərinin mənimsəməsi şəklində dövlət büdcəsinə və yerli büdcələrə köçürülən məcburi, fərdi, əvəzsiz ödənişdir.","en":"Tax is a mandatory, individual, non-refundable payment transferred to the state and local budgets in the form of appropriation of funds owned by taxpayers.","ru":"Налог — обязательный, индивидуальный, безвозмездный платёж в государственный и местные бюджеты в форме изъятия денежных средств налогоплательщиков."}'::jsonb
WHERE slug = 'vergi';

UPDATE services SET
  title = 'Konsaltinq',
  sort_order = 3,
  title_i18n = '{"az":"Konsaltinq","en":"Consulting","ru":"Консалтинг"}'::jsonb,
  description_i18n = '{"az":"Abacus Audit And Consulting MMC mühasibat, audit, hüquq, vergi və s. sahələrində konsaltinq xidmətlərini təklif edir. Hər hansı bir sual və ya problemlə üzləşdikdə, onun həlli üçün günlərlə fikirləşərək vaxt itirmək əvəzinə bizimlə əlaqə saxlayın.","en":"Abacus Audit and Consulting LLC offers consulting in accounting, audit, law, tax and related fields. Contact us instead of spending days searching for a solution.","ru":"Abacus Audit and Consulting LLC предлагает консалтинг в области бухгалтерского учёта, аудита, права, налогообложения и др. Обращайтесь к нам при возникновении вопросов."}'::jsonb
WHERE slug = 'konsaltinq';

UPDATE services SET
  title = 'Mühasibat uçotu',
  sort_order = 6,
  title_i18n = '{"az":"Mühasibat uçotu","en":"Accounting","ru":"Бухгалтерский учёт"}'::jsonb,
  description_i18n = '{"az":"Mühasibat uçotu – vacib və mürəkkəb bir sistemdir. Bəzən müəssisənin gələcəyi, bu sistemin düzgün və effektiv qurulmasından asılıdır. Təklif etdiyimiz xidmətin işi müəssisənin daxili idarəetmə hesabatlarının və maliyyə hesabatlarının hazırlanmasıdır.","en":"Accounting is an important and complex system. Our service includes preparation of internal management reports and financial statements.","ru":"Бухгалтерский учёт — важная и сложная система. Наша услуга включает подготовку внутренних управленческих отчётов и финансовой отчётности."}'::jsonb
WHERE slug = 'muhasibat';

UPDATE services SET
  title = 'Kadr kargüzarlığı',
  sort_order = 8,
  title_i18n = '{"az":"Kadr kargüzarlığı","en":"HR administration","ru":"Кадровое делопроизводство"}'::jsonb,
  description_i18n = '{"az":"Müəssisənizdə kadr sənədlərinin düzgün aparılmaması gələcəkdə ciddi hüquqi problemlərə, inzibati cərimələrə səbəb ola bilər. Kadr kargüzarlığı və kadr sənədlərinin auditi xidməti məhz bu risklərin qarşısını almaq üçün həyata keçirilir.","en":"Improper HR documentation can lead to serious legal problems and fines. HR administration and HR document audit help prevent these risks.","ru":"Неправильное ведение кадровых документов может привести к серьёзным правовым проблемам и штрафам. Кадровое делопроизводство и аудит кадровых документов помогают предотвратить эти риски."}'::jsonb
WHERE slug = 'hr-audit';

UPDATE services SET
  title = 'Miqrasiya xidmətləri',
  sort_order = 9,
  title_i18n = '{"az":"Miqrasiya xidmətləri","en":"Migration services","ru":"Миграционные услуги"}'::jsonb,
  description_i18n = '{"az":"Azərbaycan Respublikasında əcnəbi vətəndaşların və vətəndaşlığı olmayan şəxslərin əmək fəaliyyəti ilə məşğul olması üçün iş icazəsi və yaşama icazəsinin alınması qanunvericiliyə əsasən məcburidir.","en":"Foreign citizens and stateless persons must obtain work and residence permits to engage in employment in Azerbaijan.","ru":"Иностранным гражданам и лицам без гражданства для трудовой деятельности в Азербайджане необходимо получить разрешение на работу и вид на жительство."}'::jsonb
WHERE slug = 'miqrasiya';

-- ─── Ensure nav labels stay in sync (safe to re-run) ────────────────────────
UPDATE nav_items SET label_i18n = '{"az":"Audit","en":"Audit","ru":"Аудит"}'::jsonb WHERE href = '/xidmetler/audit';
UPDATE nav_items SET label_i18n = '{"az":"Vergi uçotu və vergitutma","en":"Tax accounting and taxation","ru":"Налоговый учёт и налогообложение"}'::jsonb WHERE href = '/xidmetler/vergi';
UPDATE nav_items SET label_i18n = '{"az":"Konsaltinq","en":"Consulting","ru":"Консалтинг"}'::jsonb WHERE href = '/xidmetler/konsaltinq';
UPDATE nav_items SET label_i18n = '{"az":"Qiymətləndirmə","en":"Valuation","ru":"Оценка"}'::jsonb WHERE href = '/xidmetler/qiymetlendirme';
UPDATE nav_items SET label_i18n = '{"az":"Hüquqi xidmətlər","en":"Legal services","ru":"Юридические услуги"}'::jsonb WHERE href = '/xidmetler/huquq';
UPDATE nav_items SET label_i18n = '{"az":"Mühasibat uçotu","en":"Accounting","ru":"Бухгалтерский учёт"}'::jsonb WHERE href = '/xidmetler/muhasibat';
UPDATE nav_items SET label_i18n = '{"az":"Kommersiya hüquqi şəxslərin qeydiyyatı","en":"Registration of commercial legal entities","ru":"Регистрация коммерческих юридических лиц"}'::jsonb WHERE href = '/xidmetler/qeydiyyat';
UPDATE nav_items SET label_i18n = '{"az":"Kadr kargüzarlığı","en":"HR administration","ru":"Кадровое делопроизводство"}'::jsonb WHERE href = '/xidmetler/kadr';
UPDATE nav_items SET label_i18n = '{"az":"Miqrasiya xidmətləri","en":"Migration services","ru":"Миграционные услуги"}'::jsonb WHERE href = '/xidmetler/miqrasiya';

-- Verify: should return 9 rows
-- SELECT slug, title, sort_order FROM services WHERE is_published = true ORDER BY sort_order;
