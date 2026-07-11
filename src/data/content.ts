export const siteConfig = {
  name: "Abacus Audit & Consulting LLC",
  tagline: "Peşəkar audit, vergi və mühasibatlıq xidmətləri",
  phone: "+994 55 213 47 37",
  email: "info@abacusaudit.az",
  address: "Bakı şəhəri Nərimanov rayonu Məsud Əlizadə küçəsi 138",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/994125550000",
  },
} as const

export const navItems = [
  { label: "Əsas", href: "/" },
  {
    label: "Biz kimik",
    href: "/haqqimizda",
    children: [
      { label: "Haqqımızda", href: "/haqqimizda" },
      { label: "Niyə biz", href: "/niye-biz" },
      { label: "Partnyorlarımız", href: "/partnyorlar" },
      { label: "Müraciət", href: "/muraciet" },
    ],
  },
  {
    label: "Xidmətlər",
    href: "/xidmetler",
    children: [
      { label: "Audit", href: "/xidmetler/audit" },
      { label: "Vergi uçotu və vergitutma", href: "/xidmetler/vergi" },
      { label: "Konsaltinq", href: "/xidmetler/konsaltinq" },
      { label: "Qiymətləndirmə", href: "/xidmetler/qiymetlendirme" },
      { label: "Hüquqi xidmətlər", href: "/xidmetler/huquq" },
      { label: "Mühasibat uçotu", href: "/xidmetler/muhasibat" },
      { label: "Kommersiya hüquqi şəxslərin qeydiyyatı", href: "/xidmetler/qeydiyyat" },
      { label: "Kadr kargüzarlığı", href: "/xidmetler/kadr" },
      { label: "Miqrasiya xidmətləri", href: "/xidmetler/miqrasiya" },
    ],
  },
  {
    label: "Bloq",
    href: "/bloq",
    children: [
      { label: "Xəbərlər", href: "/bloq/xeberler" },
      { label: "Qanunvericilik", href: "/bloq/qanunvericilik" },
    ],
  },
  {
    label: "Akademiya",
    href: "/akademiya",
    children: [
      { label: "Maliyyə və Mühasibatlıq", href: "/akademiya/maliyye" },
      { label: "İnsan Resursları", href: "/akademiya/insan-resurslari" },
      { label: "Dövlət satınalmaları", href: "/akademiya/satin-alma" },
    ],
  },
  { label: "Kalkulyator", href: "/kalkulyator" },
  { label: "Əlaqə", href: "/elaqe" },
] as const

export const teamMembers = [
  {
    name: "Rüfət Zeynalov",
    role: "İdarəedici partnyor, Auditor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Asif Əliyev",
    role: "Vergi və mühasibat uçotu üzrə partnyor",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ülviyyə Abbaslı",
    role: "Mühasibatlıq bölməsinin rəhbəri",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Zemfira Zeynalova",
    role: "Kadr uçotu və miqrasiya xidmətləri üzrə menecer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Niyaməddin Həsənov",
    role: "Aparıcı Mühasib",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Urfan Niftəliyev",
    role: "Audit Köməkçisi",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Nuranə İbadova",
    role: "Audit Köməkçisi",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Fidan Qarazadə",
    role: "Audit Köməkçisi",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "Ülkər Məmmədli",
    role: "Maliyyə Meneceri",
    image: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    name: "Mikayıl Məmmədov",
    role: "Audit Köməkçisi",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
] as const

export const services = [
  {
    id: "audit",
    title: "Audit xidməti",
    description:
      "Audit – əmtəə istehsalı və satışı, xidmət göstərilməsi və iş görülməsi ilə məşğul olan təsərrüfat subyektlərində mühasibat uçotunun dəqiq və dürüst aparılmasının, mühasibat və maliyyə hesabatlarının müstəqil yoxlanılmasıdır.",
    icon: "shield-check",
  },
  {
    id: "vergi",
    title: "Vergi uçotu və vergitutma",
    description:
      "Vergi — dövlətin və bələdiyyələrin fəaliyyətinin maliyyə təminatı məqsədi ilə vergi ödəyicilərinin mülkiyyətində olan pul vəsaitlərinin mənimsəməsi şəklində dövlət büdcəsinə və yerli büdcələrə köçürülən məcburi, fərdi, əvəzsiz ödənişdir.",
    icon: "receipt",
  },
  {
    id: "muhasibat",
    title: "Mühasibat uçotu",
    description:
      "Mühasibat uçotu – vacib və mürəkkəb bir sistemdir. Bəzən müəssisənin gələcəyi, bu sistemin düzgün və effektiv qurulmasından asılıdır. Təklif etdiyimiz xidmətin işi müəssisənin daxili idarəetmə hesabatlarının və maliyyə hesabatlarının hazırlanmasıdır.",
    icon: "calculator",
  },
  {
    id: "konsaltinq",
    title: "Konsaltinq",
    description:
      "Abacus Audit And Consulting MMC mühasibat, audit, hüquq, vergi və s. sahələrində konsaltinq xidmətlərini təklif edir. Hər hansı bir sual və ya problemlə üzləşdikdə, onun həlli üçün günlərlə fikirləşərək vaxt itirmək əvəzinə bizimlə əlaqə saxlayın.",
    icon: "lightbulb",
  },
  {
    id: "miqrasiya",
    title: "Miqrasiya xidməti",
    description:
      "Azərbaycan Respublikasında əcnəbi vətəndaşların və vətəndaşlığı olmayan şəxslərin əmək fəaliyyəti ilə məşğul olması üçün iş icazəsi və yaşama icazəsinin alınması qanunvericiliyə əsasən məcburidir.",
    icon: "globe",
  },
  {
    id: "hr-audit",
    title: "HR Audit",
    description:
      "Müəssisənizdə kadr sənədlərinin düzgün aparılmaması gələcəkdə ciddi hüquqi problemlərə, inzibati cərimələrə səbəb ola bilər. Kadr sənədlərinin auditi xidməti məhz bu risklərin qarşısını almaq üçün həyata keçirilir.",
    icon: "users",
  },
] as const

export const stats = [
  { value: 500, suffix: "+", label: "Layihə" },
  { value: 300, suffix: "+", label: "Müştəri" },
  { value: 3, suffix: "", label: "Ofis" },
  { value: 15, suffix: "+", label: "İllik təcrübə" },
] as const

export const partners = [
  "Sosial Dəstək Mərkəzi PHŞ",
  "Əməyin Mühafizəsi Mərkəzi PHŞ",
  "Dördüncü Sənaye İnqilabının Təhlili və Koordinasiya Mərkəzi PHŞ",
  "Bakı Beynəlxalq Dəniz Ticarət Limanı QSC",
  "Aqrar Sığorta Fondu",
  "Dövlət İmtahan Mərkəzi (DİM)",
  "Azəristiliktəchizat ASC",
  "Bakı Konqres Mərkəzi",
  "Maliyyə Monitorinq Xidməti",
  "Aqroservis ASC",
  "Medianın İnkişafı Agentliyi PHŞ",
  "Betta MMC",
  "Can Pa MMC",
  "Garden Harvest MMC",
  "Hightechnic Systems MMC",
  "SF Azerbaijan BOKT",
  "Sophie Couture MMC",
  "Emiloğlu MMC",
  "Kral MTK",
  "Nobel Elektrik MMC",
  "Best Energy Group MMC",
  "Azəri Firması",
  "AFN Transport MMC",
] as const

export const aboutContent = {
  title: "Abacus Audit",
  paragraphs: [
    "Abacus Audit şirkəti – maliyyə, audit, hüquq, vergi, konsaltinq və mühasibatlıq sahələrində zəngin təcrübəyə malik peşəkarlar tərəfindən yaradılmışdır. Biz, peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlərimizlə tanınırıq.",
    "Abacus Audit və Konsaltinq şirkəti olaraq biz müştərilərimizə ən yüksək səviyyədə mühasibat, audit, vergi hesabatı və konsaltinq xidmətləri təqdim edirik. Bizim missiyamız sizi hüquq, vergi və idarəetmə sahələrindən məlumatlandırmaq və dəstəkləməkdir.",
    "Müştərilərimizə təklif etdiyimiz operativ və yüksək keyfiyyətli xidmətlər sayəsində, Abacus Audit Azərbaycanın ən böyük auditor-konsaltinq şirkətləri qrupuna daxildir. Əsas məqsədimiz müştərilərimizi rəqabətli biznesin qurulmasında dəstəkləməkdir.",
  ],
} as const

export const whyUsItems = [
  {
    title: "Peşəkar komanda",
    description: "Sertifikatlı auditorlar və mütəxəssislərdən ibarət təcrübəli komanda.",
  },
  {
    title: "Şəffaflıq",
    description: "Bütün proseslərdə açıq və dəqiq məlumatlandırma.",
  },
  {
    title: "Operativlik",
    description: "Vaxtında və keyfiyyətli xidmət göstərmə öhdəliyimiz.",
  },
  {
    title: "Geniş xidmət spektri",
    description: "Audit-dən miqrasiyaya qədər tam həllər.",
  },
] as const
