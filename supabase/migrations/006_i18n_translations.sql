-- EN/RU translations for all CMS content
-- Run in Supabase SQL Editor after 005_i18n.sql

-- ─── Site settings ───────────────────────────────────────────────────────────
UPDATE site_settings SET
  tagline_i18n = '{"az":"Peşəkar audit, vergi və mühasibatlıq xidmətləri","en":"Professional audit, tax and accounting services","ru":"Профессиональные услуги в области аудита, налогообложения и бухгалтерского учёта"}'::jsonb,
  hero_badge_i18n = '{"az":"Azərbaycanın aparıcı auditor-konsaltinq şirkəti","en":"Azerbaijan''s leading audit and consulting company","ru":"Ведущая аудиторско-консалтинговая компания Азербайджана"}'::jsonb,
  hero_title_i18n = '{"az":"Maliyyənizə güvən və dəqiqlik gətiririk","en":"We bring trust and precision to your finances","ru":"Мы приносим доверие и точность в ваши финансы"}'::jsonb,
  hero_subtitle_i18n = '{"az":"Abacus Audit & Consulting LLC — audit, vergi, mühasibatlıq və konsaltinq sahələrində peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlər təqdim edir.","en":"Abacus Audit & Consulting LLC provides services built on professionalism, transparency and accuracy in audit, tax, accounting and consulting.","ru":"Abacus Audit & Consulting LLC предоставляет услуги, основанные на профессионализме, прозрачности и точности в сферах аудита, налогообложения, бухгалтерского учёта и консалтинга."}'::jsonb,
  about_title_i18n = '{"az":"Abacus Audit","en":"Abacus Audit","ru":"Abacus Audit"}'::jsonb,
  about_paragraphs_i18n = '{
    "az": [
      "Abacus Audit şirkəti – maliyyə, audit, hüquq, vergi, konsaltinq və mühasibatlıq sahələrində zəngin təcrübəyə malik peşəkarlar tərəfindən yaradılmışdır. Biz, peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlərimizlə tanınırıq.",
      "Abacus Audit və Konsaltinq şirkəti olaraq biz müştərilərimizə ən yüksək səviyyədə mühasibat, audit, vergi hesabatı və konsaltinq xidmətləri təqdim edirik. Bizim missiyamız sizi hüquq, vergi və idarəetmə sahələrindən məlumatlandırmaq və dəstəkləməkdir.",
      "Müştərilərimizə təklif etdiyimiz operativ və yüksək keyfiyyətli xidmətlər sayəsində, Abacus Audit Azərbaycanın ən böyük auditor-konsaltinq şirkətləri qrupuna daxildir. Əsas məqsədimiz müştərilərimizi rəqabətli biznesin qurulmasında dəstəkləməkdir."
    ],
    "en": [
      "Abacus Audit was founded by professionals with extensive experience in finance, audit, law, tax, consulting and accounting. We are known for services based on professionalism, transparency and accuracy.",
      "As Abacus Audit and Consulting, we provide our clients with the highest level of accounting, audit, tax reporting and consulting services. Our mission is to inform and support you in legal, tax and management matters.",
      "Thanks to the efficient and high-quality services we offer, Abacus Audit is part of the largest group of audit and consulting companies in Azerbaijan. Our main goal is to support our clients in building a competitive business."
    ],
    "ru": [
      "Компания Abacus Audit создана профессионалами с богатым опытом в сферах финансов, аудита, права, налогообложения, консалтинга и бухгалтерского учёта. Мы известны услугами, основанными на профессионализме, прозрачности и точности.",
      "Как Abacus Audit and Consulting мы предоставляем клиентам услуги бухгалтерского учёта, аудита, налоговой отчётности и консалтинга высочайшего уровня. Наша миссия — информировать и поддерживать вас в правовых, налоговых и управленческих вопросах.",
      "Благодаря оперативным и качественным услугам Abacus Audit входит в крупнейшую группу аудиторско-консалтинговых компаний Азербайджана. Наша главная цель — поддержать клиентов в построении конкурентоспособного бизнеса."
    ]
  }'::jsonb
WHERE id = 1;

-- ─── Navigation ──────────────────────────────────────────────────────────────
UPDATE nav_items SET label_i18n = '{"az":"Əsas","en":"Home","ru":"Главная"}'::jsonb WHERE href = '/';
UPDATE nav_items SET label_i18n = '{"az":"Biz kimik","en":"Who we are","ru":"Компания"}'::jsonb WHERE id = 'a0000001-0000-4000-8000-000000000002';
UPDATE nav_items SET label_i18n = '{"az":"Haqqımızda","en":"About us","ru":"О нас"}'::jsonb WHERE href = '/haqqimizda' AND parent_id IS NOT NULL;
UPDATE nav_items SET label_i18n = '{"az":"Niyə biz","en":"Why us","ru":"Почему мы"}'::jsonb WHERE href = '/niye-biz';
UPDATE nav_items SET label_i18n = '{"az":"Partnyorlarımız","en":"Our partners","ru":"Наши партнёры"}'::jsonb WHERE href = '/partnyorlar';
UPDATE nav_items SET label_i18n = '{"az":"Xidmətlər","en":"Services","ru":"Услуги"}'::jsonb WHERE href = '/xidmetler' AND parent_id IS NULL;
UPDATE nav_items SET label_i18n = '{"az":"Audit","en":"Audit","ru":"Аудит"}'::jsonb WHERE href = '/xidmetler/audit';
UPDATE nav_items SET label_i18n = '{"az":"Vergi uçotu və vergitutma","en":"Tax accounting and taxation","ru":"Налоговый учёт и налогообложение"}'::jsonb WHERE href = '/xidmetler/vergi';
UPDATE nav_items SET label_i18n = '{"az":"Konsaltinq","en":"Consulting","ru":"Консалтинг"}'::jsonb WHERE href = '/xidmetler/konsaltinq';
UPDATE nav_items SET label_i18n = '{"az":"Qiymətləndirmə","en":"Valuation","ru":"Оценка"}'::jsonb WHERE href = '/xidmetler/qiymetlendirme';
UPDATE nav_items SET label_i18n = '{"az":"Hüquqi xidmətlər","en":"Legal services","ru":"Юридические услуги"}'::jsonb WHERE href = '/xidmetler/huquq';
UPDATE nav_items SET label_i18n = '{"az":"Mühasibat uçotu","en":"Accounting","ru":"Бухгалтерский учёт"}'::jsonb WHERE href = '/xidmetler/muhasibat';
UPDATE nav_items SET label_i18n = '{"az":"Kommersiya hüquqi şəxslərin qeydiyyatı","en":"Registration of commercial legal entities","ru":"Регистрация коммерческих юридических лиц"}'::jsonb WHERE href = '/xidmetler/qeydiyyat';
UPDATE nav_items SET label_i18n = '{"az":"Kadr kargüzarlığı","en":"HR administration","ru":"Кадровое делопроизводство"}'::jsonb WHERE href = '/xidmetler/kadr';
UPDATE nav_items SET label_i18n = '{"az":"Miqrasiya xidmətləri","en":"Migration services","ru":"Миграционные услуги"}'::jsonb WHERE href = '/xidmetler/miqrasiya';
UPDATE nav_items SET label_i18n = '{"az":"Bloq","en":"Blog","ru":"Блог"}'::jsonb WHERE href = '/bloq' AND parent_id IS NULL;
UPDATE nav_items SET label_i18n = '{"az":"Xəbərlər","en":"News","ru":"Новости"}'::jsonb WHERE href = '/bloq/xeberler';
UPDATE nav_items SET label_i18n = '{"az":"Qanunvericilik","en":"Legislation","ru":"Законодательство"}'::jsonb WHERE href = '/bloq/qanunvericilik';
UPDATE nav_items SET label_i18n = '{"az":"Akademiya","en":"Academy","ru":"Академия"}'::jsonb WHERE href = '/akademiya' AND parent_id IS NULL;
UPDATE nav_items SET label_i18n = '{"az":"Maliyyə və Mühasibatlıq","en":"Finance and Accounting","ru":"Финансы и бухгалтерский учёт"}'::jsonb WHERE href = '/akademiya/maliyye';
UPDATE nav_items SET label_i18n = '{"az":"İnsan Resursları","en":"Human Resources","ru":"Человеческие ресурсы"}'::jsonb WHERE href = '/akademiya/insan-resurslari';
UPDATE nav_items SET label_i18n = '{"az":"Dövlət satınalmaları","en":"Public procurement","ru":"Государственные закупки"}'::jsonb WHERE href = '/akademiya/satin-alma';
UPDATE nav_items SET label_i18n = '{"az":"Kalkulyator","en":"Calculator","ru":"Калькулятор"}'::jsonb WHERE href = '/kalkulyator';
UPDATE nav_items SET label_i18n = '{"az":"Əlaqə","en":"Contact","ru":"Контакты"}'::jsonb WHERE href = '/elaqe';

-- ─── Services ────────────────────────────────────────────────────────────────
UPDATE services SET
  title_i18n = '{"az":"Audit xidməti","en":"Audit service","ru":"Аудиторские услуги"}'::jsonb,
  description_i18n = '{"az":"Audit – əmtəə istehsalı və satışı, xidmət göstərilməsi və iş görülməsi ilə məşğul olan təsərrüfat subyektlərində mühasibat uçotunun dəqiq və dürüst aparılmasının, mühasibat və maliyyə hesabatlarının müstəqil yoxlanılmasıdır.","en":"Audit is the independent examination of accounting records and financial statements to verify that accounting is kept accurately and honestly at business entities engaged in production, sale of goods, provision of services and performance of work.","ru":"Аудит — независимая проверка бухгалтерского учёта и финансовой отчётности для подтверждения точного и добросовестного ведения учёта в хозяйствующих субъектах."}'::jsonb
WHERE slug = 'audit';

UPDATE services SET
  title_i18n = '{"az":"Vergi uçotu və vergitutma","en":"Tax accounting and taxation","ru":"Налоговый учёт и налогообложение"}'::jsonb,
  description_i18n = '{"az":"Vergi — dövlətin və bələdiyyələrin fəaliyyətinin maliyyə təminatı məqsədi ilə vergi ödəyicilərinin mülkiyyətində olan pul vəsaitlərinin mənimsəməsi şəklində dövlət büdcəsinə və yerli büdcələrə köçürülən məcburi, fərdi, əvəzsiz ödənişdir.","en":"Tax is a mandatory, individual, non-refundable payment transferred to the state and local budgets in the form of appropriation of funds owned by taxpayers.","ru":"Налог — обязательный, индивидуальный, безвозмездный платёж в государственный и местные бюджеты в форме изъятия денежных средств налогоплательщиков."}'::jsonb
WHERE slug = 'vergi';

UPDATE services SET
  title_i18n = '{"az":"Mühasibat uçotu","en":"Accounting","ru":"Бухгалтерский учёт"}'::jsonb,
  description_i18n = '{"az":"Mühasibat uçotu – vacib və mürəkkəb bir sistemdir. Bəzən müəssisənin gələcəyi, bu sistemin düzgün və effektiv qurulmasından asılıdır. Təklif etdiyimiz xidmətin işi müəssisənin daxili idarəetmə hesabatlarının və maliyyə hesabatlarının hazırlanmasıdır.","en":"Accounting is an important and complex system. Our service includes preparation of internal management reports and financial statements.","ru":"Бухгалтерский учёт — важная и сложная система. Наша услуга включает подготовку внутренних управленческих отчётов и финансовой отчётности."}'::jsonb
WHERE slug = 'muhasibat';

UPDATE services SET
  title_i18n = '{"az":"Konsaltinq","en":"Consulting","ru":"Консалтинг"}'::jsonb,
  description_i18n = '{"az":"Abacus Audit And Consulting MMC mühasibat, audit, hüquq, vergi və s. sahələrində konsaltinq xidmətlərini təklif edir. Hər hansı bir sual və ya problemlə üzləşdikdə, onun həlli üçün günlərlə fikirləşərək vaxt itirmək əvəzinə bizimlə əlaqə saxlayın.","en":"Abacus Audit and Consulting LLC offers consulting in accounting, audit, law, tax and related fields. Contact us instead of spending days searching for a solution.","ru":"Abacus Audit and Consulting LLC предлагает консалтинг в области бухгалтерского учёта, аудита, права, налогообложения и др. Обращайтесь к нам при возникновении вопросов."}'::jsonb
WHERE slug = 'konsaltinq';

UPDATE services SET
  title_i18n = '{"az":"Miqrasiya xidməti","en":"Migration service","ru":"Миграционные услуги"}'::jsonb,
  description_i18n = '{"az":"Azərbaycan Respublikasında əcnəbi vətəndaşların və vətəndaşlığı olmayan şəxslərin əmək fəaliyyəti ilə məşğul olması üçün iş icazəsi və yaşama icazəsinin alınması qanunvericiliyə əsasən məcburidir.","en":"Foreign citizens and stateless persons must obtain work and residence permits to engage in employment in Azerbaijan.","ru":"Иностранным гражданам и лицам без гражданства для трудовой деятельности в Азербайджане необходимо получить разрешение на работу и вид на жительство."}'::jsonb
WHERE slug = 'miqrasiya';

UPDATE services SET
  title_i18n = '{"az":"HR Audit","en":"HR Audit","ru":"HR-аудит"}'::jsonb,
  description_i18n = '{"az":"Müəssisənizdə kadr sənədlərinin düzgün aparılmaması gələcəkdə ciddi hüquqi problemlərə, inzibati cərimələrə səbəb ola bilər. Kadr sənədlərinin auditi xidməti məhz bu risklərin qarşısını almaq üçün həyata keçirilir.","en":"Improper HR documentation can lead to serious legal problems and fines. HR document audit helps prevent these risks.","ru":"Неправильное ведение кадровых документов может привести к серьёзным правовым проблемам и штрафам. HR-аудит помогает предотвратить эти риски."}'::jsonb
WHERE slug = 'hr-audit';

-- ─── Team (names unchanged; roles translated) ────────────────────────────────
UPDATE team_members SET role_i18n = '{"az":"İdarəedici partnyor, Auditor","en":"Managing Partner, Auditor","ru":"Управляющий партнёр, аудитор"}'::jsonb WHERE name = 'Rüfət Zeynalov';
UPDATE team_members SET role_i18n = '{"az":"Vergi və mühasibat uçotu üzrə partnyor","en":"Partner, Tax and Accounting","ru":"Партнёр по налоговому и бухгалтерскому учёту"}'::jsonb WHERE name = 'Asif Əliyev';
UPDATE team_members SET role_i18n = '{"az":"Mühasibatlıq bölməsinin rəhbəri","en":"Head of Accounting Department","ru":"Руководитель отдела бухгалтерии"}'::jsonb WHERE name = 'Ülviyyə Abbaslı';
UPDATE team_members SET role_i18n = '{"az":"Kadr uçotu və miqrasiya xidmətləri üzrə menecer","en":"Manager, HR Accounting and Migration Services","ru":"Менеджер по кадровому учёту и миграционным услугам"}'::jsonb WHERE name = 'Zemfira Zeynalova';
UPDATE team_members SET role_i18n = '{"az":"Aparıcı Mühasib","en":"Senior Accountant","ru":"Ведущий бухгалтер"}'::jsonb WHERE name = 'Niyaməddin Həsənov';
UPDATE team_members SET role_i18n = '{"az":"Audit Köməkçisi","en":"Audit Assistant","ru":"Помощник аудитора"}'::jsonb WHERE name IN ('Urfan Niftəliyev', 'Nuranə İbadova', 'Fidan Qarazadə', 'Mikayıl Məmmədov');
UPDATE team_members SET role_i18n = '{"az":"Maliyyə Meneceri","en":"Finance Manager","ru":"Финансовый менеджер"}'::jsonb WHERE name = 'Ülkər Məmmədli';
UPDATE team_members SET name_i18n = jsonb_build_object('az', name, 'en', name, 'ru', name) WHERE name_i18n = '{}'::jsonb OR name_i18n IS NULL;

-- ─── Stats ───────────────────────────────────────────────────────────────────
UPDATE stats SET label_i18n = '{"az":"Layihə","en":"Projects","ru":"Проекты"}'::jsonb WHERE label = 'Layihə';
UPDATE stats SET label_i18n = '{"az":"Müştəri","en":"Clients","ru":"Клиенты"}'::jsonb WHERE label = 'Müştəri';
UPDATE stats SET label_i18n = '{"az":"Ofis","en":"Offices","ru":"Офисы"}'::jsonb WHERE label = 'Ofis';
UPDATE stats SET label_i18n = '{"az":"İllik təcrübə","en":"Years of experience","ru":"Лет опыта"}'::jsonb WHERE label = 'İllik təcrübə';

-- ─── Partners ────────────────────────────────────────────────────────────────
UPDATE partners SET name_i18n = '{"az":"Sosial Dəstək Mərkəzi PHŞ","en":"Social Support Center LLC","ru":"Центр социальной поддержки ООО"}'::jsonb WHERE name = 'Sosial Dəstək Mərkəzi PHŞ';
UPDATE partners SET name_i18n = '{"az":"Əməyin Mühafizəsi Mərkəzi PHŞ","en":"Labor Protection Center LLC","ru":"Центр охраны труда ООО"}'::jsonb WHERE name = 'Əməyin Mühafizəsi Mərkəzi PHŞ';
UPDATE partners SET name_i18n = '{"az":"Dördüncü Sənaye İnqilabının Təhlili və Koordinasiya Mərkəzi PHŞ","en":"Fourth Industrial Revolution Analysis and Coordination Center LLC","ru":"Центр анализа и координации Четвёртой промышленной революции ООО"}'::jsonb WHERE name LIKE 'Dördüncü Sənaye%';
UPDATE partners SET name_i18n = '{"az":"Bakı Beynəlxalq Dəniz Ticarət Limanı QSC","en":"Baku International Sea Trade Port CJSC","ru":"Бакинский международный морской торговый порт ОАО"}'::jsonb WHERE name = 'Bakı Beynəlxalq Dəniz Ticarət Limanı QSC';
UPDATE partners SET name_i18n = '{"az":"Aqrar Sığorta Fondu","en":"Agricultural Insurance Fund","ru":"Аграрный страховой фонд"}'::jsonb WHERE name = 'Aqrar Sığorta Fondu';
UPDATE partners SET name_i18n = '{"az":"Dövlət İmtahan Mərkəzi (DİM)","en":"State Examination Center (SEC)","ru":"Государственный экзаменационный центр (ГЭЦ)"}'::jsonb WHERE name = 'Dövlət İmtahan Mərkəzi (DİM)';
UPDATE partners SET name_i18n = '{"az":"Azəristiliktəchizat ASC","en":"Azerlightning Supply JSC","ru":"Азэристиликтечизат ОАО"}'::jsonb WHERE name = 'Azəristiliktəchizat ASC';
UPDATE partners SET name_i18n = '{"az":"Bakı Konqres Mərkəzi","en":"Baku Congress Center","ru":"Бакинский конгресс-центр"}'::jsonb WHERE name = 'Bakı Konqres Mərkəzi';
UPDATE partners SET name_i18n = '{"az":"Maliyyə Monitorinq Xidməti","en":"Financial Monitoring Service","ru":"Служба финансового мониторинга"}'::jsonb WHERE name = 'Maliyyə Monitorinq Xidməti';
UPDATE partners SET name_i18n = '{"az":"Aqroservis ASC","en":"Agroservice JSC","ru":"Агросервис ОАО"}'::jsonb WHERE name = 'Aqroservis ASC';
UPDATE partners SET name_i18n = '{"az":"Medianın İnkişafı Agentliyi PHŞ","en":"Media Development Agency LLC","ru":"Агентство развития медиа ООО"}'::jsonb WHERE name = 'Medianın İnkişafı Agentliyi PHŞ';
UPDATE partners SET name_i18n = jsonb_build_object('az', name, 'en', name, 'ru', name) WHERE name_i18n = '{}'::jsonb OR (name_i18n->>'en') IS NULL OR (name_i18n->>'en') = '';

-- ─── Why us ──────────────────────────────────────────────────────────────────
UPDATE why_us_items SET
  title_i18n = '{"az":"Peşəkar komanda","en":"Professional team","ru":"Профессиональная команда"}'::jsonb,
  description_i18n = '{"az":"Sertifikatlı auditorlar və mütəxəssislərdən ibarət təcrübəli komanda.","en":"An experienced team of certified auditors and specialists.","ru":"Опытная команда сертифицированных аудиторов и специалистов."}'::jsonb
WHERE title = 'Peşəkar komanda';

UPDATE why_us_items SET
  title_i18n = '{"az":"Şəffaflıq","en":"Transparency","ru":"Прозрачность"}'::jsonb,
  description_i18n = '{"az":"Bütün proseslərdə açıq və dəqiq məlumatlandırma.","en":"Open and accurate communication throughout all processes.","ru":"Открытая и точная информация на всех этапах процесса."}'::jsonb
WHERE title = 'Şəffaflıq';

UPDATE why_us_items SET
  title_i18n = '{"az":"Operativlik","en":"Responsiveness","ru":"Оперативность"}'::jsonb,
  description_i18n = '{"az":"Vaxtında və keyfiyyətli xidmət göstərmə öhdəliyimiz.","en":"Our commitment to timely and high-quality service.","ru":"Наше обязательство предоставлять своевременные и качественные услуги."}'::jsonb
WHERE title = 'Operativlik';

UPDATE why_us_items SET
  title_i18n = '{"az":"Geniş xidmət spektri","en":"Wide range of services","ru":"Широкий спектр услуг"}'::jsonb,
  description_i18n = '{"az":"Audit-dən miqrasiyaya qədər tam həllər.","en":"Complete solutions from audit to migration.","ru":"Комплексные решения от аудита до миграции."}'::jsonb
WHERE title = 'Geniş xidmət spektri';

-- ─── Blog ────────────────────────────────────────────────────────────────────
UPDATE blog_posts SET
  title_i18n = '{"az":"2026-cı il üçün vergi qanunvericiliyində dəyişikliklər","en":"Changes in tax legislation for 2026","ru":"Изменения в налоговом законодательстве на 2026 год"}'::jsonb,
  excerpt_i18n = '{"az":"Yeni il ilə birlikdə qüvvəyə minən vergi dəyişikliklərinin müəssisələrə təsiri barədə ətraflı icmal.","en":"A detailed overview of how tax changes coming into force in the new year will affect businesses.","ru":"Подробный обзор влияния налоговых изменений, вступающих в силу с нового года, на предприятия."}'::jsonb,
  category_i18n = '{"az":"Qanunvericilik","en":"Legislation","ru":"Законодательство"}'::jsonb
WHERE slug = 'vergi-deyisiklikleri-2026';

UPDATE blog_posts SET
  title_i18n = '{"az":"Maliyyə hesabatlarının auditə hazırlanması","en":"Preparing financial statements for audit","ru":"Подготовка финансовой отчётности к аудиту"}'::jsonb,
  excerpt_i18n = '{"az":"İllik audit prosesinə müəssisənizi necə düzgün hazırlamaq və ümumi səhvlərdən qaçmaq olar.","en":"How to properly prepare your company for the annual audit process and avoid common mistakes.","ru":"Как правильно подготовить компанию к ежегодному аудиту и избежать типичных ошибок."}'::jsonb,
  category_i18n = '{"az":"Audit","en":"Audit","ru":"Аудит"}'::jsonb
WHERE slug = 'audit-hesabat-hazirligi';

UPDATE blog_posts SET
  title_i18n = '{"az":"Kadr sənədlərinin idarə edilməsi qaydaları","en":"Rules for managing HR documents","ru":"Правила ведения кадровых документов"}'::jsonb,
  excerpt_i18n = '{"az":"İşçi sənədlərinin düzgün aparılması və inzibati məsuliyyətdən qorunma yolları.","en":"How to maintain employee records correctly and protect against administrative liability.","ru":"Как правильно вести кадровые документы и защититься от административной ответственности."}'::jsonb,
  category_i18n = '{"az":"Kadr","en":"HR","ru":"Кадры"}'::jsonb
WHERE slug = 'kadr-senedleri';

-- ─── Academy ─────────────────────────────────────────────────────────────────
UPDATE academy_courses SET name_i18n = '{"az":"Mühasibat uçotunun əsasları","en":"Fundamentals of accounting","ru":"Основы бухгалтерского учёта"}'::jsonb, duration_i18n = '{"az":"8 həftə","en":"8 weeks","ru":"8 недель"}'::jsonb WHERE track = 'maliyye' AND name = 'Mühasibat uçotunun əsasları';
UPDATE academy_courses SET name_i18n = '{"az":"Vergi uçotu və hesabatlılıq","en":"Tax accounting and reporting","ru":"Налоговый учёт и отчётность"}'::jsonb, duration_i18n = '{"az":"6 həftə","en":"6 weeks","ru":"6 недель"}'::jsonb WHERE track = 'maliyye' AND name = 'Vergi uçotu və hesabatlılıq';
UPDATE academy_courses SET name_i18n = '{"az":"Maliyyə təhlili","en":"Financial analysis","ru":"Финансовый анализ"}'::jsonb, duration_i18n = '{"az":"5 həftə","en":"5 weeks","ru":"5 недель"}'::jsonb WHERE track = 'maliyye' AND name = 'Maliyyə təhlili';
UPDATE academy_courses SET name_i18n = '{"az":"Kadr kargüzarlığı","en":"HR administration","ru":"Кадровое делопроизводство"}'::jsonb, duration_i18n = '{"az":"6 həftə","en":"6 weeks","ru":"6 недель"}'::jsonb WHERE track = 'insan-resurslari' AND name = 'Kadr kargüzarlığı';
UPDATE academy_courses SET name_i18n = '{"az":"Əmək qanunvericiliyi","en":"Labor legislation","ru":"Трудовое законодательство"}'::jsonb, duration_i18n = '{"az":"4 həftə","en":"4 weeks","ru":"4 недели"}'::jsonb WHERE track = 'insan-resurslari' AND name = 'Əmək qanunvericiliyi';
UPDATE academy_courses SET name_i18n = '{"az":"HR idarəetmə sistemləri","en":"HR management systems","ru":"Системы управления персоналом"}'::jsonb, duration_i18n = '{"az":"5 həftə","en":"5 weeks","ru":"5 недель"}'::jsonb WHERE track = 'insan-resurslari' AND name = 'HR idarəetmə sistemləri';
UPDATE academy_courses SET name_i18n = '{"az":"Satınalma qanunvericiliyinin əsasları","en":"Fundamentals of procurement legislation","ru":"Основы законодательства о закупках"}'::jsonb, duration_i18n = '{"az":"5 həftə","en":"5 weeks","ru":"5 недель"}'::jsonb WHERE track = 'satin-alma' AND name = 'Satınalma qanunvericiliyinin əsasları';
UPDATE academy_courses SET name_i18n = '{"az":"Tender prosedurları","en":"Tender procedures","ru":"Тендерные процедуры"}'::jsonb, duration_i18n = '{"az":"4 həftə","en":"4 weeks","ru":"4 недели"}'::jsonb WHERE track = 'satin-alma' AND name = 'Tender prosedurları';
UPDATE academy_courses SET name_i18n = '{"az":"Müqavilələrin idarə edilməsi","en":"Contract management","ru":"Управление договорами"}'::jsonb, duration_i18n = '{"az":"4 həftə","en":"4 weeks","ru":"4 недели"}'::jsonb WHERE track = 'satin-alma' AND name = 'Müqavilələrin idarə edilməsi';
