/**
 * Seeds EN/RU translations into Supabase *_i18n columns.
 * Run: node scripts/seed-i18n-translations.mjs
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')
let SUPABASE_URL = process.env.VITE_SUPABASE_URL
let SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY

try {
  const env = readFileSync(envPath, 'utf8')
  for (const line of env.split('\n')) {
    const [k, ...v] = line.split('=')
    if (k === 'VITE_SUPABASE_URL') SUPABASE_URL = v.join('=').trim()
    if (k === 'VITE_SUPABASE_ANON_KEY') SUPABASE_KEY = v.join('=').trim()
  }
} catch {
  /* use env vars */
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
}

async function patch(table, filter, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`${table} PATCH failed (${res.status}): ${text}`)
  }
  const rows = text ? JSON.parse(text) : []
  if (Array.isArray(rows) && rows.length === 0) {
    throw new Error(
      `${table} PATCH returned 0 rows — RLS blocks anonymous writes. Run supabase/migrations/006_i18n_translations.sql in the SQL Editor instead.`,
    )
  }
}

const siteSettings = {
  tagline_i18n: {
    az: 'Peşəkar audit, vergi və mühasibatlıq xidmətləri',
    en: 'Professional audit, tax and accounting services',
    ru: 'Профессиональные услуги в области аудита, налогообложения и бухгалтерского учёта',
  },
  hero_badge_i18n: {
    az: 'Azərbaycanın aparıcı auditor-konsaltinq şirkəti',
    en: "Azerbaijan's leading audit and consulting company",
    ru: 'Ведущая аудиторско-консалтинговая компания Азербайджана',
  },
  hero_title_i18n: {
    az: 'Maliyyənizə güvən və dəqiqlik gətiririk',
    en: 'We bring trust and precision to your finances',
    ru: 'Мы приносим доверие и точность в ваши финансы',
  },
  hero_subtitle_i18n: {
    az: 'Abacus Audit & Consulting LLC — audit, vergi, mühasibatlıq və konsaltinq sahələrində peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlər təqdim edir.',
    en: 'Abacus Audit & Consulting LLC provides services built on professionalism, transparency and accuracy in audit, tax, accounting and consulting.',
    ru: 'Abacus Audit & Consulting LLC предоставляет услуги, основанные на профессионализме, прозрачности и точности в сферах аудита, налогообложения, бухгалтерского учёта и консалтинга.',
  },
  about_title_i18n: {
    az: 'Abacus Audit',
    en: 'Abacus Audit',
    ru: 'Abacus Audit',
  },
  about_paragraphs_i18n: {
    az: [
      'Abacus Audit şirkəti – maliyyə, audit, hüquq, vergi, konsaltinq və mühasibatlıq sahələrində zəngin təcrübəyə malik peşəkarlar tərəfindən yaradılmışdır. Biz, peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlərimizlə tanınırıq.',
      'Abacus Audit və Konsaltinq şirkəti olaraq biz müştərilərimizə ən yüksək səviyyədə mühasibat, audit, vergi hesabatı və konsaltinq xidmətləri təqdim edirik. Bizim missiyamız sizi hüquq, vergi və idarəetmə sahələrindən məlumatlandırmaq və dəstəkləməkdir.',
      'Müştərilərimizə təklif etdiyimiz operativ və yüksək keyfiyyətli xidmətlər sayəsində, Abacus Audit Azərbaycanın ən böyük auditor-konsaltinq şirkətləri qrupuna daxildir. Əsas məqsədimiz müştərilərimizi rəqabətli biznesin qurulmasında dəstəkləməkdir.',
    ],
    en: [
      'Abacus Audit was founded by professionals with extensive experience in finance, audit, law, tax, consulting and accounting. We are known for services based on professionalism, transparency and accuracy.',
      'As Abacus Audit and Consulting, we provide our clients with the highest level of accounting, audit, tax reporting and consulting services. Our mission is to inform and support you in legal, tax and management matters.',
      'Thanks to the efficient and high-quality services we offer, Abacus Audit is part of the largest group of audit and consulting companies in Azerbaijan. Our main goal is to support our clients in building a competitive business.',
    ],
    ru: [
      'Компания Abacus Audit создана профессионалами с богатым опытом в сферах финансов, аудита, права, налогообложения, консалтинга и бухгалтерского учёта. Мы известны услугами, основанными на профессионализме, прозрачности и точности.',
      'Как Abacus Audit and Consulting мы предоставляем клиентам услуги бухгалтерского учёта, аудита, налоговой отчётности и консалтинга высочайшего уровня. Наша миссия — информировать и поддерживать вас в правовых, налоговых и управленческих вопросах.',
      'Благодаря оперативным и качественным услугам Abacus Audit входит в крупнейшую группу аудиторско-консалтинговых компаний Азербайджана. Наша главная цель — поддержать клиентов в построении конкурентоспособного бизнеса.',
    ],
  },
}

const navByHref = {
  '/': { en: 'Home', ru: 'Главная' },
  '/haqqimizda': { en: 'About us', ru: 'О нас' },
  '/niye-biz': { en: 'Why us', ru: 'Почему мы' },
  '/partnyorlar': { en: 'Our partners', ru: 'Наши партнёры' },
  '/xidmetler': { en: 'Services', ru: 'Услуги' },
  '/xidmetler/audit': { en: 'Audit', ru: 'Аудит' },
  '/xidmetler/vergi': { en: 'Tax accounting and taxation', ru: 'Налоговый учёт и налогообложение' },
  '/xidmetler/konsaltinq': { en: 'Consulting', ru: 'Консалтинг' },
  '/xidmetler/qiymetlendirme': { en: 'Valuation', ru: 'Оценка' },
  '/xidmetler/huquq': { en: 'Legal services', ru: 'Юридические услуги' },
  '/xidmetler/muhasibat': { en: 'Accounting', ru: 'Бухгалтерский учёт' },
  '/xidmetler/qeydiyyat': { en: 'Registration of commercial legal entities', ru: 'Регистрация коммерческих юридических лиц' },
  '/xidmetler/kadr': { en: 'HR administration', ru: 'Кадровое делопроизводство' },
  '/xidmetler/miqrasiya': { en: 'Migration services', ru: 'Миграционные услуги' },
  '/bloq': { en: 'Blog', ru: 'Блог' },
  '/bloq/xeberler': { en: 'News', ru: 'Новости' },
  '/bloq/qanunvericilik': { en: 'Legislation', ru: 'Законодательство' },
  '/akademiya': { en: 'Academy', ru: 'Академия' },
  '/akademiya/maliyye': { en: 'Finance and Accounting', ru: 'Финансы и бухгалтерский учёт' },
  '/akademiya/insan-resurslari': { en: 'Human Resources', ru: 'Человеческие ресурсы' },
  '/akademiya/satin-alma': { en: 'Public procurement', ru: 'Государственные закупки' },
  '/kalkulyator': { en: 'Calculator', ru: 'Калькулятор' },
  '/elaqe': { en: 'Contact', ru: 'Контакты' },
}

// "Biz kimik" shares href with about - use id
const navById = {
  'a0000001-0000-4000-8000-000000000002': {
    az: 'Biz kimik',
    en: 'Who we are',
    ru: 'Компания',
  },
}

const servicesBySlug = {
  audit: {
    title: {
      en: 'Audit service',
      ru: 'Аудиторские услуги',
    },
    description: {
      en: 'Audit is the independent examination of accounting records and financial statements to verify that accounting is kept accurately and honestly at business entities engaged in production, sale of goods, provision of services and performance of work.',
      ru: 'Аудит — независимая проверка бухгалтерского учёта и финансовой отчётности для подтверждения точного и добросовестного ведения учёта в хозяйствующих субъектах, занимающихся производством, продажей товаров, оказанием услуг и выполнением работ.',
    },
  },
  vergi: {
    title: {
      en: 'Tax accounting and taxation',
      ru: 'Налоговый учёт и налогообложение',
    },
    description: {
      en: 'Tax is a mandatory, individual, non-refundable payment transferred to the state and local budgets in the form of appropriation of funds owned by taxpayers, aimed at financing the activities of the state and municipalities.',
      ru: 'Налог — обязательный, индивидуальный, безвозмездный платёж в государственный и местные бюджеты в форме изъятия денежных средств, принадлежащих налогоплательщикам, с целью финансирования деятельности государства и муниципалитетов.',
    },
  },
  muhasibat: {
    title: {
      en: 'Accounting',
      ru: 'Бухгалтерский учёт',
    },
    description: {
      en: 'Accounting is an important and complex system. Sometimes the future of a business depends on how correctly and efficiently this system is built. Our service includes preparation of internal management reports and financial statements.',
      ru: 'Бухгалтерский учёт — важная и сложная система. Будущее предприятия иногда зависит от правильного и эффективного построения этой системы. Наша услуга включает подготовку внутренних управленческих отчётов и финансовой отчётности.',
    },
  },
  konsaltinq: {
    title: {
      en: 'Consulting',
      ru: 'Консалтинг',
    },
    description: {
      en: 'Abacus Audit and Consulting LLC offers consulting services in accounting, audit, law, tax and related fields. When you face any question or problem, contact us instead of spending days thinking about the solution.',
      ru: 'Abacus Audit and Consulting LLC предлагает консалтинговые услуги в области бухгалтерского учёта, аудита, права, налогообложения и др. При возникновении вопросов или проблем обращайтесь к нам, не теряя время на самостоятельный поиск решения.',
    },
  },
  miqrasiya: {
    title: {
      en: 'Migration service',
      ru: 'Миграционные услуги',
    },
    description: {
      en: 'In the Republic of Azerbaijan, foreign citizens and stateless persons are required by law to obtain work permits and residence permits to engage in employment.',
      ru: 'В Азербайджанской Республике иностранным гражданам и лицам без гражданства для трудовой деятельности по закону необходимо получить разрешение на работу и вид на жительство.',
    },
  },
  'hr-audit': {
    title: {
      en: 'HR Audit',
      ru: 'HR-аудит',
    },
    description: {
      en: 'Improper maintenance of HR documents in your company can lead to serious legal problems and administrative fines in the future. HR document audit is carried out precisely to prevent these risks.',
      ru: 'Неправильное ведение кадровых документов в компании может привести к серьёзным правовым проблемам и административным штрафам. Аудит кадровых документов проводится именно для предотвращения этих рисков.',
    },
  },
}

const teamByName = {
  'Rüfət Zeynalov': {
    role: { en: 'Managing Partner, Auditor', ru: 'Управляющий партнёр, аудитор' },
  },
  'Asif Əliyev': {
    role: { en: 'Partner, Tax and Accounting', ru: 'Партнёр по налоговому и бухгалтерскому учёту' },
  },
  'Ülviyyə Abbaslı': {
    role: { en: 'Head of Accounting Department', ru: 'Руководитель отдела бухгалтерии' },
  },
  'Zemfira Zeynalova': {
    role: {
      en: 'Manager, HR Accounting and Migration Services',
      ru: 'Менеджер по кадровому учёту и миграционным услугам',
    },
  },
  'Niyaməddin Həsənov': {
    role: { en: 'Senior Accountant', ru: 'Ведущий бухгалтер' },
  },
  'Urfan Niftəliyev': {
    role: { en: 'Audit Assistant', ru: 'Помощник аудитора' },
  },
  'Nuranə İbadova': {
    role: { en: 'Audit Assistant', ru: 'Помощник аудитора' },
  },
  'Fidan Qarazadə': {
    role: { en: 'Audit Assistant', ru: 'Помощник аудитора' },
  },
  'Ülkər Məmmədli': {
    role: { en: 'Finance Manager', ru: 'Финансовый менеджер' },
  },
  'Mikayıl Məmmədov': {
    role: { en: 'Audit Assistant', ru: 'Помощник аудитора' },
  },
}

const statsByLabel = {
  Layihə: { en: 'Projects', ru: 'Проекты' },
  Müştəri: { en: 'Clients', ru: 'Клиенты' },
  Ofis: { en: 'Offices', ru: 'Офисы' },
  'İllik təcrübə': { en: 'Years of experience', ru: 'Лет опыта' },
}

const partnersByName = {
  'Sosial Dəstək Mərkəzi PHŞ': {
    en: 'Social Support Center LLC',
    ru: 'Центр социальной поддержки ООО',
  },
  'Əməyin Mühafizəsi Mərkəzi PHŞ': {
    en: 'Labor Protection Center LLC',
    ru: 'Центр охраны труда ООО',
  },
  'Dördüncü Sənaye İnqilabının Təhlili və Koordinasiya Mərkəzi PHŞ': {
    en: 'Fourth Industrial Revolution Analysis and Coordination Center LLC',
    ru: 'Центр анализа и координации Четвёртой промышленной революции ООО',
  },
  'Bakı Beynəlxalq Dəniz Ticarət Limanı QSC': {
    en: 'Baku International Sea Trade Port CJSC',
    ru: 'Бакинский международный морской торговый порт ОАО',
  },
  'Aqrar Sığorta Fondu': {
    en: 'Agricultural Insurance Fund',
    ru: 'Аграрный страховой фонд',
  },
  'Dövlət İmtahan Mərkəzi (DİM)': {
    en: 'State Examination Center (SEC)',
    ru: 'Государственный экзаменационный центр (ГЭЦ)',
  },
  'Azəristiliktəchizat ASC': {
    en: 'Azerlightning Supply JSC',
    ru: 'Азэристиликтечизат ОАО',
  },
  'Bakı Konqres Mərkəzi': {
    en: 'Baku Congress Center',
    ru: 'Бакинский конгресс-центр',
  },
  'Maliyyə Monitorinq Xidməti': {
    en: 'Financial Monitoring Service',
    ru: 'Служба финансового мониторинга',
  },
  'Aqroservis ASC': { en: 'Agroservice JSC', ru: 'Агросервис ОАО' },
  'Medianın İnkişafı Agentliyi PHŞ': {
    en: 'Media Development Agency LLC',
    ru: 'Агентство развития медиа ООО',
  },
}

const whyUsByTitle = {
  'Peşəkar komanda': {
    title: { en: 'Professional team', ru: 'Профессиональная команда' },
    description: {
      en: 'An experienced team of certified auditors and specialists.',
      ru: 'Опытная команда сертифицированных аудиторов и специалистов.',
    },
  },
  Şəffaflıq: {
    title: { en: 'Transparency', ru: 'Прозрачность' },
    description: {
      en: 'Open and accurate communication throughout all processes.',
      ru: 'Открытая и точная информация на всех этапах процесса.',
    },
  },
  Operativlik: {
    title: { en: 'Responsiveness', ru: 'Оперативность' },
    description: {
      en: 'Our commitment to timely and high-quality service.',
      ru: 'Наше обязательство предоставлять своевременные и качественные услуги.',
    },
  },
  'Geniş xidmət spektri': {
    title: { en: 'Wide range of services', ru: 'Широкий спектр услуг' },
    description: {
      en: 'Complete solutions from audit to migration.',
      ru: 'Комплексные решения от аудита до миграции.',
    },
  },
}

const blogBySlug = {
  'vergi-deyisiklikleri-2026': {
    title: {
      en: 'Changes in tax legislation for 2026',
      ru: 'Изменения в налоговом законодательстве на 2026 год',
    },
    excerpt: {
      en: 'A detailed overview of how tax changes coming into force in the new year will affect businesses.',
      ru: 'Подробный обзор влияния налоговых изменений, вступающих в силу с нового года, на предприятия.',
    },
    category: { en: 'Legislation', ru: 'Законодательство' },
  },
  'audit-hesabat-hazirligi': {
    title: {
      en: 'Preparing financial statements for audit',
      ru: 'Подготовка финансовой отчётности к аудиту',
    },
    excerpt: {
      en: 'How to properly prepare your company for the annual audit process and avoid common mistakes.',
      ru: 'Как правильно подготовить компанию к ежегодному аудиту и избежать типичных ошибок.',
    },
    category: { en: 'Audit', ru: 'Аудит' },
  },
  'kadr-senedleri': {
    title: {
      en: 'Rules for managing HR documents',
      ru: 'Правила ведения кадровых документов',
    },
    excerpt: {
      en: 'How to maintain employee records correctly and protect against administrative liability.',
      ru: 'Как правильно вести кадровые документы и защититься от административной ответственности.',
    },
    category: { en: 'HR', ru: 'Кадры' },
  },
}

const academyByKey = {
  'maliyye|Mühasibat uçotunun əsasları': {
    name: { en: 'Fundamentals of accounting', ru: 'Основы бухгалтерского учёта' },
    duration: { en: '8 weeks', ru: '8 недель' },
  },
  'maliyye|Vergi uçotu və hesabatlılıq': {
    name: { en: 'Tax accounting and reporting', ru: 'Налоговый учёт и отчётность' },
    duration: { en: '6 weeks', ru: '6 недель' },
  },
  'maliyye|Maliyyə təhlili': {
    name: { en: 'Financial analysis', ru: 'Финансовый анализ' },
    duration: { en: '5 weeks', ru: '5 недель' },
  },
  'insan-resurslari|Kadr kargüzarlığı': {
    name: { en: 'HR administration', ru: 'Кадровое делопроизводство' },
    duration: { en: '6 weeks', ru: '6 недель' },
  },
  'insan-resurslari|Əmək qanunvericiliyi': {
    name: { en: 'Labor legislation', ru: 'Трудовое законодательство' },
    duration: { en: '4 weeks', ru: '4 недели' },
  },
  'insan-resurslari|HR idarəetmə sistemləri': {
    name: { en: 'HR management systems', ru: 'Системы управления персоналом' },
    duration: { en: '5 weeks', ru: '5 недель' },
  },
  'satin-alma|Satınalma qanunvericiliyinin əsasları': {
    name: { en: 'Fundamentals of procurement legislation', ru: 'Основы законодательства о закупках' },
    duration: { en: '5 weeks', ru: '5 недель' },
  },
  'satin-alma|Tender prosedurları': {
    name: { en: 'Tender procedures', ru: 'Тендерные процедуры' },
    duration: { en: '4 weeks', ru: '4 недели' },
  },
  'satin-alma|Müqavilələrin idarə edilməsi': {
    name: { en: 'Contract management', ru: 'Управление договорами' },
    duration: { en: '4 weeks', ru: '4 недели' },
  },
}

async function fetchAll(table, select = '*') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  return res.json()
}

async function main() {
  console.log('Updating site_settings...')
  await patch('site_settings', 'id=eq.1', siteSettings)

  console.log('Updating nav_items...')
  const nav = await fetchAll('nav_items', 'id,label,href')
  for (const item of nav) {
    const byId = navById[item.id]
    const byHref = navByHref[item.href]
    const az = item.label
    const en = byId?.en ?? byHref?.en ?? az
    const ru = byId?.ru ?? byHref?.ru ?? az
    await patch('nav_items', `id=eq.${item.id}`, { label_i18n: { az, en, ru } })
  }

  console.log('Updating services...')
  const services = await fetchAll('services', 'id,slug,title,description')
  for (const s of services) {
    const t = servicesBySlug[s.slug]
    if (!t) continue
    await patch('services', `id=eq.${s.id}`, {
      title_i18n: { az: s.title, en: t.title.en, ru: t.title.ru },
      description_i18n: { az: s.description, en: t.description.en, ru: t.description.ru },
    })
  }

  console.log('Updating team_members...')
  const team = await fetchAll('team_members', 'id,name,role')
  for (const m of team) {
    const t = teamByName[m.name]
    await patch('team_members', `id=eq.${m.id}`, {
      name_i18n: { az: m.name, en: m.name, ru: m.name },
      role_i18n: {
        az: m.role,
        en: t?.role.en ?? m.role,
        ru: t?.role.ru ?? m.role,
      },
    })
  }

  console.log('Updating stats...')
  const stats = await fetchAll('stats', 'id,label')
  for (const s of stats) {
    const t = statsByLabel[s.label]
    await patch('stats', `id=eq.${s.id}`, {
      label_i18n: { az: s.label, en: t?.en ?? s.label, ru: t?.ru ?? s.label },
    })
  }

  console.log('Updating partners...')
  const partners = await fetchAll('partners', 'id,name')
  for (const p of partners) {
    const t = partnersByName[p.name]
    await patch('partners', `id=eq.${p.id}`, {
      name_i18n: { az: p.name, en: t?.en ?? p.name, ru: t?.ru ?? p.name },
    })
  }

  console.log('Updating why_us_items...')
  const why = await fetchAll('why_us_items', 'id,title,description')
  for (const w of why) {
    const t = whyUsByTitle[w.title]
    if (!t) continue
    await patch('why_us_items', `id=eq.${w.id}`, {
      title_i18n: { az: w.title, en: t.title.en, ru: t.title.ru },
      description_i18n: { az: w.description, en: t.description.en, ru: t.description.ru },
    })
  }

  console.log('Updating blog_posts...')
  const blog = await fetchAll('blog_posts', 'id,slug,title,excerpt,content,category')
  for (const b of blog) {
    const t = blogBySlug[b.slug]
    if (!t) continue
    await patch('blog_posts', `id=eq.${b.id}`, {
      title_i18n: { az: b.title, en: t.title.en, ru: t.title.ru },
      excerpt_i18n: { az: b.excerpt, en: t.excerpt.en, ru: t.excerpt.ru },
      content_i18n: { az: b.content ?? '', en: b.content ?? '', ru: b.content ?? '' },
      category_i18n: { az: b.category, en: t.category.en, ru: t.category.ru },
    })
  }

  console.log('Updating academy_courses...')
  const academy = await fetchAll('academy_courses', 'id,track,name,duration')
  for (const c of academy) {
    const t = academyByKey[`${c.track}|${c.name}`]
    if (!t) continue
    await patch('academy_courses', `id=eq.${c.id}`, {
      name_i18n: { az: c.name, en: t.name.en, ru: t.name.ru },
      duration_i18n: { az: c.duration, en: t.duration.en, ru: t.duration.ru },
    })
  }

  console.log('Done! All EN/RU translations have been applied.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
