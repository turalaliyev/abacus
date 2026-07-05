/**
 * Generates supabase/migrations/009_academy_quiz_seed.sql
 * Run: node scripts/seed-academy-quiz.mjs
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {{ topic: string; correct: number; q: Record<string,string>; o: Record<string,string[]> }[]} */
const QUESTIONS = [
  {
    topic: 'audit',
    correct: 1,
    q: {
      az: 'Müstəqil auditin əsas məqsədi nədir?',
      en: 'What is the primary purpose of an independent audit?',
      ru: 'Какова основная цель независимого аудита?',
    },
    o: {
      az: ['Vergi hesablaması', 'Maliyyə hesabatının etibarlılığının təsdiqi', 'Kadr siyasətinin hazırlanması', 'Satınalma planının təsdiqi'],
      en: ['Tax calculation', 'Assurance of financial statement reliability', 'HR policy drafting', 'Procurement plan approval'],
      ru: ['Расчёт налогов', 'Подтверждение достоверности финансовой отчётности', 'Разработка кадровой политики', 'Утверждение плана закупок'],
    },
  },
  {
    topic: 'audit',
    correct: 2,
    q: {
      az: 'Audit riskinin komponentlərinə hansı daxil deyil?',
      en: 'Which is NOT a component of audit risk?',
      ru: 'Что НЕ является компонентом аудиторского риска?',
    },
    o: {
      az: ['İnherent risk', 'Nəzarət riski', 'Aşkarlama riski', 'İnflyasiya riski'],
      en: ['Inherent risk', 'Control risk', 'Detection risk', 'Inflation risk'],
      ru: ['Существенный риск', 'Риск средств контроля', 'Риск необнаружения', 'Инфляционный риск'],
    },
  },
  {
    topic: 'audit',
    correct: 0,
    q: {
      az: 'Material səhv nə deməkdir?',
      en: 'What does material misstatement mean?',
      ru: 'Что озnaczaет существенное искажение?',
    },
    o: {
      az: ['İstifadəçilərin qərarlarını təsir edə bilən səhv', 'Kiçik rəqəmsal fərq', 'Daxili sənəd səhvi', 'Köhnə mühasibat siyasəti'],
      en: ["An error that could affect users' decisions", 'A small numeric difference', 'An internal document typo', 'Outdated accounting policy'],
      ru: ['Ошибка, способная повлиять на решения пользователей', 'Небольшая числовая разница', 'Опечатка во внутреннем документе', 'Устаревшая учётная политика'],
    },
  },
  {
    topic: 'audit',
    correct: 3,
    q: {
      az: 'Audit sübutlarında ən etibarlı tip hansıdır?',
      en: 'Which type of audit evidence is generally most reliable?',
      ru: 'Какой вид аудиторских доказательств обычно наиболее надёжен?',
    },
    o: {
      az: ['Şifahi ifadə', 'Daxili hesabat', 'Mühasibat qeydləri', 'Xarici mənbədən birbaşa təsdiq'],
      en: ['Oral statement', 'Internal report', 'Accounting records alone', 'External confirmation'],
      ru: ['Устное заявление', 'Внутренний отчёт', 'Только учётные записи', 'Внешнее подтверждение'],
    },
  },
  {
    topic: 'audit',
    correct: 1,
    q: {
      az: 'Daxili nəzarət sistemi əsasən nəyə xidmət edir?',
      en: 'Internal control primarily serves to:',
      ru: 'Система внутреннего контроля в первую очередь служит для:',
    },
    o: {
      az: ['Vergi optimallaşdırması', 'Aktivlərin qorunması və hesabatların düzgünlüyü', 'Marketinq strategiyası', 'İşçi motivasiyası'],
      en: ['Tax optimization', 'Safeguarding assets and report accuracy', 'Marketing strategy', 'Employee motivation'],
      ru: ['Налоговой оптимизации', 'Защиты активов и достоверности отчётности', 'Маркетинговой стратегии', 'Мотивации персонала'],
    },
  },
  {
    topic: 'tax',
    correct: 2,
    q: {
      az: 'Azərbaycanda mənfəət vergisinin ümumi dərəcəsi neçə faizdir?',
      en: 'What is the standard corporate profit tax rate in Azerbaijan?',
      ru: 'Какова стандартная ставка налога на прибыль в Азербайджане?',
    },
    o: {
      az: ['10%', '15%', '20%', '25%'],
      en: ['10%', '15%', '20%', '25%'],
      ru: ['10%', '15%', '20%', '25%'],
    },
  },
  {
    topic: 'tax',
    correct: 0,
    q: {
      az: 'ƏDV (VAT) əsasən hansı mərhələdə yaranır?',
      en: 'When does VAT typically arise?',
      ru: 'Когда обычно возникает НДС?',
    },
    o: {
      az: ['Əmtəə və xidmətlərin təhvilində', 'Əməkhaqqı ödənildikdə', 'Bank krediti alınanda', 'Dividend bölüşdürüləndə'],
      en: ['On delivery of goods and services', 'When paying salaries', 'When taking a bank loan', 'When distributing dividends'],
      ru: ['При поставке товаров и услуг', 'При выплате зарплаты', 'При получении банковского кредита', 'При распределении дивидендов'],
    },
  },
  {
    topic: 'tax',
    correct: 1,
    q: {
      az: 'Gəlir vergisində güzəşt nədir?',
      en: 'What is a tax benefit (exemption/deduction)?',
      ru: 'Что такое налоговая льгота?',
    },
    o: {
      az: ['Cərimə', 'Vergi bazasının azaldılması və ya güzəşt', 'Əlavə vergi', 'Audit rüsumu'],
      en: ['A penalty', 'Reduction or exemption of tax base', 'Additional tax', 'Audit fee'],
      ru: ['Штраф', 'Уменьшение или освобождение налоговой базы', 'Дополнительный налог', 'Аудиторское вознаграждение'],
    },
  },
  {
    topic: 'tax',
    correct: 3,
    q: {
      az: 'Transfer qiymətləndirməsi nəyə aiddir?',
      en: 'Transfer pricing relates to:',
      ru: 'Трансфертное ценообразование относится к:',
    },
    o: {
      az: ['Əməkhaqqı hesablaması', 'DSMF ödənişləri', 'ƏDV qaytarılması', 'Əlaqəli tərəflər arasında əməliyyat qiymətləri'],
      en: ['Payroll calculation', 'Social insurance payments', 'VAT refunds', 'Prices in related-party transactions'],
      ru: ['Расчёту зарплаты', 'Соцстраховым взносам', 'Возврату НДС', 'Ценам в сделках между связанными сторонами'],
    },
  },
  {
    topic: 'tax',
    correct: 2,
    q: {
      az: 'Vergi uçotu ilə maliyyə uçotu arasında fərq əsasən harada yaranır?',
      en: 'Where do tax and financial accounting mainly differ?',
      ru: 'Где в основном различаются налоговый и бухгалтерский учёт?',
    },
    o: {
      az: ['Bank hesablarında', 'İşçi sayında', 'Mühasibat siyasəti və qaydalarında', 'Ofis kirayəsində'],
      en: ['In bank accounts', 'In headcount', 'In accounting policies and rules', 'In office rent'],
      ru: ['В банковских счетах', 'В численности персонала', 'В учётной политике и правилах', 'В аренде офиса'],
    },
  },
  {
    topic: 'accounting',
    correct: 0,
    q: {
      az: 'Aktiv = Öhdəlik + ... düsturu nəyi ifadə edir?',
      en: 'Assets = Liabilities + ... expresses:',
      ru: 'Активы = Обязательства + ... выражает:',
    },
    o: {
      az: ['Kapital', 'Gəlir', 'Xərc', 'Dövriyyə'],
      en: ['Equity', 'Revenue', 'Expense', 'Turnover'],
      ru: ['Капитал', 'Доход', 'Расход', 'Оборот'],
    },
  },
  {
    topic: 'accounting',
    correct: 1,
    q: {
      az: 'Amortizasiya nəyə aiddir?',
      en: 'Depreciation applies to:',
      ru: 'Амортизация относится к:',
    },
    o: {
      az: ['Nağd pul', 'Uzunmüddətli aktivlər', 'Qısamüddətli borclar', 'Dividendlər'],
      en: ['Cash', 'Long-term assets', 'Short-term liabilities', 'Dividends'],
      ru: ['Денежным средствам', 'Долгосрочным активам', 'Краткосрочным обязательствам', 'Дивидендам'],
    },
  },
  {
    topic: 'accounting',
    correct: 2,
    q: {
      az: 'Debitor borcları hansı hesab qrupuna aiddir?',
      en: 'Accounts receivable belongs to:',
      ru: 'Дебиторская задолженность относится к:',
    },
    o: {
      az: ['Öhdəliklər', 'Kapital', 'Qısamüddətli aktivlər', 'Gəlirlər'],
      en: ['Liabilities', 'Equity', 'Current assets', 'Revenue'],
      ru: ['Обязательствам', 'Капиталу', 'Оборотным активам', 'Доходам'],
    },
  },
  {
    topic: 'accounting',
    correct: 3,
    q: {
      az: 'Maliyyə hesabatlarının əsas komponentləri hansılardır?',
      en: 'What are the main financial statements?',
      ru: 'Каковы основные формы финансовой отчётности?',
    },
    o: {
      az: ['Yalnız vergi bəyannaməsi', 'Yalnız kassa kitabı', 'Yalnız inventar siyahısı', 'Balans, mənfəət-zərər, pul axını'],
      en: ['Tax return only', 'Cash book only', 'Inventory list only', 'Balance sheet, P&L, cash flow'],
      ru: ['Только налоговая декларация', 'Только кассовая книга', 'Только опись', 'Баланс, ОПУ, отчёт о движении денег'],
    },
  },
  {
    topic: 'accounting',
    correct: 0,
    q: {
      az: 'Uçotun ikiqat qeydiyyat prinsipinə görə hər əməliyyat:',
      en: 'Under double-entry bookkeeping, every transaction:',
      ru: 'По принципу двойной записи каждая операция:',
    },
    o: {
      az: ['Ən azı iki hesabı təsir edir', 'Yalnız bir hesabı təsir edir', 'Yalnız nağd pulu təsir edir', 'Vergidən azaddır'],
      en: ['Affects at least two accounts', 'Affects only one account', 'Affects only cash', 'Is tax-exempt'],
      ru: ['Затрагивает минимум два счёта', 'Затрагивает только один счёт', 'Затрагивает только кассу', 'Освобождена от налога'],
    },
  },
  {
    topic: 'hr',
    correct: 1,
    q: {
      az: 'Əmək müqaviləsi əsasən nəyi tənzimləyir?',
      en: 'An employment contract mainly governs:',
      ru: 'Трудовой договор в основном регулирует:',
    },
    o: {
      az: ['Şirkətin vergi öhdəliyi', 'İşçi və işəgötürən arasında əmək münasibətləri', 'Satınalma proseduru', 'Audit planı'],
      en: ['Company tax liability', 'Employment relationship between worker and employer', 'Procurement procedure', 'Audit plan'],
      ru: ['Налоговые обязательства компании', 'Трудовые отношения работника и работодателя', 'Процедуру закупок', 'План аудита'],
    },
  },
  {
    topic: 'hr',
    correct: 2,
    q: {
      az: 'DSMF ayırmaları kim tərəfindən ödənilir?',
      en: 'Social insurance contributions are paid by:',
      ru: 'Страховые взносы уплачиваются:',
    },
    o: {
      az: ['Yalnız işçi', 'Yalnız dövlət', 'İşçi və işəgötürən', 'Yalnız bank'],
      en: ['Employee only', 'State only', 'Employee and employer', 'Bank only'],
      ru: ['Только работником', 'Только государством', 'Работником и работодателем', 'Только банком'],
    },
  },
  {
    topic: 'hr',
    correct: 0,
    q: {
      az: 'Kadr uçotunda əsas sənəd hansıdır?',
      en: 'What is the primary HR record document?',
      ru: 'Какой основной кадровый документ?',
    },
    o: {
      az: ['Əmək kitabçası / kadr faylı', 'Vergi bəyannaməsi', 'Bank çıxarışı', 'Satınalma müqaviləsi'],
      en: ['Employment record / personnel file', 'Tax return', 'Bank statement', 'Procurement contract'],
      ru: ['Трудовая книжка / личное дело', 'Налоговая декларация', 'Банковская выписка', 'Договор закупки'],
    },
  },
  {
    topic: 'hr',
    correct: 3,
    q: {
      az: 'Məzuniyyət müddəti əsasən nəyə əsaslanır?',
      en: 'Annual leave duration is mainly based on:',
      ru: 'Продолжительность отпуска в основном основана на:',
    },
    o: {
      az: ['Şirkətin mənfəəti', 'Audit nəticəsi', 'ƏDV dərəcəsi', 'Əmək qanunvericiliyi və staj'],
      en: ['Company profit', 'Audit result', 'VAT rate', 'Labor law and tenure'],
      ru: ['Прибыли компании', 'Результате аудита', 'Ставке НДС', 'Трудовом законодательстве и стаже'],
    },
  },
  {
    topic: 'consulting',
    correct: 1,
    q: {
      az: 'Maliyyə konsaltinqinin əsas məqsədi nədir?',
      en: 'What is the main goal of financial consulting?',
      ru: 'Какова основная цель финансового консалтинга?',
    },
    o: {
      az: ['Yalnız hesabat çapı', 'Qərar qəbuluna dəstək və effektivlik', 'Yalnız kadr işə qəbulu', 'Yalnız audit imzası'],
      en: ['Printing reports only', 'Decision support and efficiency', 'Hiring staff only', 'Signing audit reports only'],
      ru: ['Только печать отчётов', 'Поддержка решений и эффективность', 'Только найм персонала', 'Только подпись аудита'],
    },
  },
  {
    topic: 'consulting',
    correct: 2,
    q: {
      az: 'Biznes planında əsas bölmələrdən biri hansıdır?',
      en: 'Which is a key section of a business plan?',
      ru: 'Какой раздел является ключевым в бизнес-плане?',
    },
    o: {
      az: ['Ofis rəngi', 'İşçilərin doğum tarixi', 'Maliyyə proqnozu', 'Kompüter markası'],
      en: ['Office color', "Employees' birth dates", 'Financial forecast', 'Computer brand'],
      ru: ['Цвет офиса', 'Даты рождения сотрудников', 'Финансовый прогноз', 'Марка компьютера'],
    },
  },
  {
    topic: 'consulting',
    correct: 0,
    q: {
      az: 'SWOT analizi nəyi qiymətləndirir?',
      en: 'SWOT analysis evaluates:',
      ru: 'SWOT-анализ оценивает:',
    },
    o: {
      az: ['Güclü/zəif tərəflər və imkanlar/təhlükələr', 'Yalnız vergi dərəcələri', 'Yalnız inventar', 'Yalnız əməkhaqqı'],
      en: ['Strengths, weaknesses, opportunities, threats', 'Tax rates only', 'Inventory only', 'Payroll only'],
      ru: ['Сильные/слабые стороны и возможности/угрозы', 'Только налоговые ставки', 'Только запасы', 'Только зарплату'],
    },
  },
  {
    topic: 'legal',
    correct: 3,
    q: {
      az: 'Hüquqi audit və ya due diligence əsasən nəyə yönəlir?',
      en: 'Legal audit or due diligence mainly focuses on:',
      ru: 'Юридический аудит или due diligence в основном направлен на:',
    },
    o: {
      az: ['Mətbəə xərcləri', 'Ofis təmizliyi', 'İşçi geyimi', 'Hüquqi risklər və müqavilə uyğunluğu'],
      en: ['Printing costs', 'Office cleaning', 'Employee uniforms', 'Legal risks and contract compliance'],
      ru: ['Расходы на печать', 'Уборку офиса', 'Форму сотрудников', 'Правовые риски и соответствие договоров'],
    },
  },
  {
    topic: 'legal',
    correct: 1,
    q: {
      az: 'Müqavilə qüvvəyə minməsi üçün əsas şərt hansıdır?',
      en: 'A basic requirement for a valid contract is:',
      ru: 'Базовое условие действительности договора:',
    },
    o: {
      az: ['Rəngli kağız', 'Qanuni məqsəd və razılaşma', 'Audit hesabatı', 'ƏDV qeydiyyatı'],
      en: ['Colored paper', 'Lawful purpose and agreement', 'Audit report', 'VAT registration'],
      ru: ['Цветная бумага', 'Законная цель и согласие сторон', 'Аудиторский отчёт', 'Регистрация по НДС'],
    },
  },
  {
    topic: 'legal',
    correct: 2,
    q: {
      az: 'Korporativ idarəetmə (governance) nəyə aid edilir?',
      en: 'Corporate governance relates to:',
      ru: 'Корпоративное управление относится к:',
    },
    o: {
      az: ['Yalnız marketinq', 'Yalnız dizayn', 'Şirkətin idarəetmə qaydaları və məsuliyyət', 'Yalnız anbar'],
      en: ['Marketing only', 'Design only', 'Management rules and accountability', 'Warehouse only'],
      ru: ['Только к маркетингу', 'Только к дизайну', 'Правилам управления и подотчётности', 'Только к складу'],
    },
  },
  {
    topic: 'procurement',
    correct: 0,
    q: {
      az: 'Dövlət satınalmasında tenderin məqsədi nədir?',
      en: 'What is the purpose of a public procurement tender?',
      ru: 'Какова цель тендера в государственных закупках?',
    },
    o: {
      az: ['Şəffaf və rəqabətli seçim', 'Gizli razılaşma', 'Vergi azaldılması', 'Kadr dəyişikliyi'],
      en: ['Transparent competitive selection', 'Secret deal', 'Tax reduction', 'Staff change'],
      ru: ['Прозрачный конкурентный отбор', 'Тайная сделка', 'Снижение налога', 'Смену персонала'],
    },
  },
  {
    topic: 'procurement',
    correct: 1,
    q: {
      az: 'Satınalma sənədlərində texniki şərt (TOR) nəyi müəyyən edir?',
      en: 'Technical specifications (TOR) in procurement define:',
      ru: 'Техническое задание (TOR) в закупках определяет:',
    },
    o: {
      az: ['İşçi məzuniyyəti', 'Mal/xidmətin tələbləri və standartları', 'Audit rüsumu', 'Bank faizi'],
      en: ['Employee leave', 'Requirements and standards for goods/services', 'Audit fee', 'Bank interest'],
      ru: ['Отпуск сотрудника', 'Требования и стандарты товаров/услуг', 'Аудиторское вознаграждение', 'Банковский процент'],
    },
  },
  {
    topic: 'procurement',
    correct: 2,
    q: {
      az: 'Satınalma müqaviləsində əsasən nə qeyd olunmalıdır?',
      en: 'A procurement contract should mainly include:',
      ru: 'Договор закупки в основном должен включать:',
    },
    o: {
      az: ['Yalnız loqo', 'Yalnız ofis ünvanı', 'Qiymət, həcm, müddət və öhdəliklər', 'Yalnız telefon nömrəsi'],
      en: ['Logo only', 'Office address only', 'Price, scope, term, and obligations', 'Phone number only'],
      ru: ['Только логотип', 'Только адрес офиса', 'Цену, объём, срок и обязательства', 'Только телефон'],
    },
  },
  {
    topic: 'audit',
    correct: 2,
    q: {
      az: 'Audit planı hazırlanarkən əsasən nə nəzərə alınır?',
      en: 'When preparing an audit plan, what is mainly considered?',
      ru: 'При составлении плана аудита в основном учитывается:',
    },
    o: {
      az: ['Ofis interyeri', 'İşçilərin hobbisi', 'Risk, materiality və resurslar', 'Sosial media'],
      en: ['Office interior', 'Employee hobbies', 'Risk, materiality, and resources', 'Social media'],
      ru: ['Интерьер офиса', 'Хобби сотрудников', 'Риск, существенность и ресурсы', 'Социальные сети'],
    },
  },
  {
    topic: 'tax',
    correct: 0,
    q: {
      az: 'Vergi yoxlamasında əsasən nə yoxlanılır?',
      en: 'What is mainly examined in a tax inspection?',
      ru: 'Что в основном проверяется при налоговой проверке?',
    },
    o: {
      az: ['Bəyannamələr və uçotun düzgünlüyü', 'İşçilərin geyimi', 'Ofis mebeli', 'Vebsayt dizaynı'],
      en: ['Returns and correctness of records', 'Employee clothing', 'Office furniture', 'Website design'],
      ru: ['Декларации и правильность учёта', 'Одежду сотрудников', 'Офисную мебель', 'Дизайн сайта'],
    },
  },
  {
    topic: 'accounting',
    correct: 1,
    q: {
      az: 'Inventarizasiya nə üçün aparılır?',
      en: 'Why is inventory count (stocktake) performed?',
      ru: 'Зачем проводится инвентаризация?',
    },
    o: {
      az: ['Vergi dərəcəsini artırmaq', 'Faktiki qalıqların uçot məlumatları ilə uyğunluğu', 'Kadr azaltmaq', 'Loqo dəyişmək'],
      en: ['To raise tax rates', 'To match physical balances with records', 'To reduce staff', 'To change logo'],
      ru: ['Чтобы повысить ставки налога', 'Сверить фактические остатки с учётом', 'Сократить персонал', 'Сменить логотип'],
    },
  },
  {
    topic: 'hr',
    correct: 1,
    q: {
      az: 'İşə qəbul zamanı mütləq qeydiyyata alınan sənəd hansıdır?',
      en: 'Which document must be registered when hiring?',
      ru: 'Какой документ обязательно оформляется при приёме на работу?',
    },
    o: {
      az: ['Satınalma aktı', 'Əmək müqaviləsi', 'Audit hesabatı', 'ƏDV fakturası'],
      en: ['Procurement act', 'Employment contract', 'Audit report', 'VAT invoice'],
      ru: ['Акт закупки', 'Трудовой договор', 'Аудиторский отчёт', 'Счёт-фактура НДС'],
    },
  },
  {
    topic: 'consulting',
    correct: 3,
    q: {
      az: 'Konsaltinq layihəsində məsləhətin əsas dəyəri nədir?',
      en: 'What is the main value of consulting in a project?',
      ru: 'В чём основная ценность консалтинга в проекте?',
    },
    o: {
      az: ['Ofis işıqları', 'Printer sürəti', 'Kompüter rəngi', 'Mütəxəssis baxışı və praktik həllər'],
      en: ['Office lights', 'Printer speed', 'Computer color', 'Expert view and practical solutions'],
      ru: ['Освещение офиса', 'Скорость принтера', 'Цвет компьютера', 'Экспертный взгляд и практические решения'],
    },
  },
  {
    topic: 'legal',
    correct: 0,
    q: {
      az: 'Şirkətin hüquqi forması əsasən nəyi müəyyən edir?',
      en: "A company's legal form mainly determines:",
      ru: 'Правовая форма компании в основном определяет:',
    },
    o: {
      az: ['Məsuliyyət və qeydiyyat qaydaları', 'Ofisın ölçüsü', 'Printer markası', 'İş günü sayı'],
      en: ['Liability and registration rules', 'Office size', 'Printer brand', 'Number of workdays'],
      ru: ['Ответственность и правила регистрации', 'Размер офиса', 'Марку принтера', 'Количество рабочих дней'],
    },
  },
  {
    topic: 'procurement',
    correct: 3,
    q: {
      az: 'Satınalma qanunvericiliyinin pozulması nəticəsində nə baş verə bilər?',
      en: 'What can result from violating procurement law?',
      ru: 'Что может последовать за нарушением законодательства о закупках?',
    },
    o: {
      az: ['Yalnız loqo dəyişikliyi', 'Yalnız məzuniyyət artımı', 'Yalnız audit imzası', 'Müqavilənin ləğvi və maliyyə məsuliyyəti'],
      en: ['Logo change only', 'Leave increase only', 'Audit signature only', 'Contract cancellation and financial liability'],
      ru: ['Только смена логотипа', 'Только увеличение отпуска', 'Только подпись аудита', 'Аннулирование договора и финансовая ответственность'],
    },
  },
]

function sqlEscape(str) {
  return str.replace(/'/g, "''")
}

function toJson(obj) {
  return JSON.stringify(obj).replace(/'/g, "''")
}

const lines = [
  '-- Auto-generated by scripts/seed-academy-quiz.mjs',
  '-- Run after 008_academy_quiz.sql',
  '',
  'DELETE FROM academy_quiz_questions;',
  '',
]

QUESTIONS.forEach((item, index) => {
  const questionJson = toJson(item.q)
  const optionsJson = toJson(item.o)
  lines.push(
    `INSERT INTO academy_quiz_questions (topic, question, question_i18n, options_i18n, correct_index, sort_order) VALUES (` +
      `'${item.topic}', '${sqlEscape(item.q.az)}', '${questionJson}'::jsonb, '${optionsJson}'::jsonb, ${item.correct}, ${index + 1}` +
      `);`,
  )
})

lines.push('')
lines.push(`-- ${QUESTIONS.length} questions seeded`)

const outPath = join(__dirname, '..', 'supabase', 'migrations', '009_academy_quiz_seed.sql')
writeFileSync(outPath, lines.join('\n'), 'utf8')
console.log(`Wrote ${QUESTIONS.length} questions to ${outPath}`)
