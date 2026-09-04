/**
 * Static content — used as the fallback when Supabase is not configured, and as
 * the source of truth for build-time SEO (sitemap, JSON-LD, prerendered <head>).
 *
 * Text here mirrors the live site at https://abacusaudit.az.
 */

export const siteConfig = {
  name: "Abacus Audit & Consulting LLC",
  legalName: "Abacus Audit And Consulting MMC",
  shortName: "Abacus Audit",
  url: "https://abacusaudit.az",
  tagline: "Peşəkar audit, vergi və mühasibatlıq xidmətləri",
  foundedYear: 2017,
  /** Auditorlar Palatasının üzvü — 21 iyul 2017, lisenziya AT/135 */
  license: {
    number: "AT/135",
    authority: "Azərbaycan Respublikası Auditorlar Palatası",
    since: "2017-07-21",
  },
  phone: "+994 12 480 13 41",
  whatsapp: "+994 55 213 49 39",
  email: "info@abacusaudit.az",
  address: {
    street: "Məsud Əlizadə küçəsi 138",
    district: "Nərimanov rayonu",
    city: "Bakı",
    country: "AZ",
    full: "Bakı şəhəri, Nərimanov rayonu, Məsud Əlizadə küçəsi 138",
  },
  hours: {
    days: "Bazar ertəsi – Cümə",
    time: "09:00 – 18:00",
    /** schema.org openingHours format */
    schema: "Mo-Fr 09:00-18:00",
  },
  social: {
    facebook: "https://www.facebook.com/AbacusAuditConsulting",
    instagram: "https://www.instagram.com/abacusaudit.az",
    linkedin: "https://az.linkedin.com/company/abacus-audit-and-consulting-llc",
    whatsapp: "https://wa.me/994552134939",
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

/**
 * All nine services. `slug` matches the URL segment under /xidmetler/.
 * `summary` is the short card text; `description` is the full HTML detail page.
 */
export const services = [
  {
    id: "audit",
    slug: "audit",
    title: "Audit xidməti",
    summary:
      "Mühasibat uçotunun dəqiq aparılmasının və maliyyə hesabatlarının müstəqil yoxlanılması — milli və beynəlxalq standartlara uyğun.",
    description: `<p>Audit – əmtəə istehsalı və satışı, xidmət göstərilməsi və iş görülməsi ilə məşğul olan təsərrüfat subyektlərində mühasibat uçotunun dəqiq və dürüst aparılmasının, mühasibat və maliyyə hesabatlarının müstəqil yoxlanılmasıdır.</p>
<h2>İllik maliyyə hesabatlarının auditi</h2>
<ul>
<li>Azərbaycan milli mühasibat uçotu standartlarına uyğun audit</li>
<li>Beynəlxalq maliyyə hesabatı standartlarına (BMHS) uyğun audit</li>
<li>Hesabatların tərtib edilməsi və nəzərdən keçirilməsi</li>
<li>Vergi qanunvericiliyinə uyğunluğun yoxlanılması</li>
</ul>
<h2>Xüsusi təyinatlı hesabatlar üzrə rəy</h2>
<ul>
<li>Nizamnamə kapitalının formalaşdırılması</li>
<li>Vergi bəyannamələri üzrə rəy</li>
<li>Dövlət satınalmaları müqavilələri</li>
<li>Daxili nəzarət sisteminin qiymətləndirilməsi</li>
<li>İnformasiya sistemlərinin təftişi</li>
</ul>
<h2>Mülkiyyət obyektlərinin qiymətləndirilməsi</h2>
<p>Maddi aktivlərin və intellektual mülkiyyət obyektlərinin qiymətləndirilməsi.</p>`,
    icon: "shield-check",
  },
  {
    id: "vergi",
    slug: "vergi",
    title: "Vergi uçotu və vergitutma",
    summary:
      "Vergi uçotunun aparılması, bəyannamələrin hazırlanması, vergi yoxlamalarında müşayiət və vergi planlaşdırması.",
    description: `<p>Vergi — dövlətin və bələdiyyələrin fəaliyyətinin maliyyə təminatı məqsədi ilə vergi ödəyicilərinin mülkiyyətində olan pul vəsaitlərinin mənimsənilməsi şəklində dövlət büdcəsinə və yerli büdcələrə köçürülən məcburi, fərdi və əvəzsiz ödənişdir.</p>
<h2>Vergi auditi və müşayiət</h2>
<ul>
<li>Təşkilatın vergi qanunvericiliyinə uyğunluğunun və hesabatların düzgünlüyünün yoxlanılması</li>
<li>Vergilərin hesablanması və ödənilməsi qaydaları üzrə konsultasiya</li>
<li>Vergi yoxlamalarının müşayiəti və etirazların hazırlanması</li>
<li>Vergi mübahisələrinin həlli — şikayət və məhkəmədə təmsilçilik</li>
<li>Vergi mübahisələri ilə bağlı cinayət işlərində müdafiə</li>
</ul>
<h2>Planlaşdırma və uçot</h2>
<ul>
<li>Əməliyyatların vergi nəticələrinin qiymətləndirilməsi</li>
<li>Vergi planlaşdırması sisteminin qurulması</li>
<li>Vergi uçotunun aparılması və bəyannamələrin hazırlanması</li>
<li>Vergi uçotunun qurulması və ya bərpası</li>
<li>Fiziki şəxslərin gəlir bəyannamələri üzrə dəstək</li>
<li>Uçot siyasətinin işlənilməsi</li>
<li>Vergi mövzusunda seminar və təlimlər</li>
</ul>`,
    icon: "receipt",
  },
  {
    id: "muhasibat",
    slug: "muhasibat",
    title: "Mühasibat uçotu",
    summary:
      "Müəssisənin daxili idarəetmə və maliyyə hesabatlarının hazırlanması, tam mühasibat müşayiəti və uçotun bərpası.",
    description: `<p>Mühasibat uçotu – vacib və mürəkkəb bir sistemdir. Bəzən müəssisənin gələcəyi bu sistemin düzgün və effektiv qurulmasından asılıdır. Təklif etdiyimiz xidmət müəssisənin daxili idarəetmə hesabatlarının və maliyyə hesabatlarının hazırlanması, həmçinin vergi uçotunun aparılmasıdır.</p>
<h2>Xidmətlərimiz</h2>
<ul>
<li>Mühasibat uçotunun aparılması, mühasibat (maliyyə) hesabatlarının formalaşdırılması</li>
<li>Fiziki və hüquqi şəxslərin fəaliyyətinin tam mühasibat müşayiəti</li>
<li>Rüblük və illik hesabatların müvafiq nəzarətedici orqanlara təqdim edilməsi</li>
<li>Sıfır hesabatlarının verilməsi</li>
<li>Mühasibat uçotunun qurulması və ya bərpa edilməsi</li>
<li>Müəssisənin əsas vəsaitlərinin inventarizasiyası</li>
<li>Debitor və kreditor borclarının analizi və inventarizasiyası</li>
<li>Vergiqoyma və vergi planlaşdırılması</li>
<li>Vergi yoxlamaları zamanı təşkilatın maraqlarının təmsil olunması</li>
<li>Uçot siyasətinin işlənilməsi və optimallaşdırılması</li>
<li>Müəssisənin kadrlar uçotunun aparılması</li>
</ul>`,
    icon: "calculator",
  },
  {
    id: "konsaltinq",
    slug: "konsaltinq",
    title: "Konsaltinq",
    summary:
      "Mühasibat, audit, hüquq və vergi sahələrində peşəkar məsləhət — sualınızın həlli üçün günlərlə vaxt itirməyin.",
    description: `<p>Abacus Audit And Consulting MMC mühasibat, audit, hüquq, vergi və s. sahələrində konsaltinq xidmətlərini təklif edir. Hər hansı bir sual və ya problemlə üzləşdikdə, onun həlli üçün günlərlə fikirləşərək vaxt itirmək əvəzinə bizimlə əlaqə saxlayın.</p>
<h2>Konsaltinq istiqamətlərimiz</h2>
<ul>
<li>Mühasibat uçotu və maliyyə hesabatlılığı üzrə məsləhət</li>
<li>Vergi qanunvericiliyinin tətbiqi üzrə izahlar</li>
<li>Hüquqi məsələlər üzrə konsultasiya</li>
<li>İdarəetmə və biznes proseslərinin qurulması</li>
<li>Maliyyə risklərinin qiymətləndirilməsi və azaldılması</li>
</ul>
<p>Müştərinin xüsusi ehtiyaclarını və konkret iqtisadi risklərini nəzərə alan çoxfaktorlu qiymət sistemi tətbiq edirik.</p>`,
    icon: "lightbulb",
  },
  {
    id: "qiymetlendirme",
    slug: "qiymetlendirme",
    title: "Qiymətləndirmə",
    summary:
      "Biznesin, daşınmaz əmlakın, avadanlığın və qeyri-maddi aktivlərin obyektiv bazar dəyərinin müəyyən edilməsi.",
    description: `<p>Abacus Audit &amp; Consulting MMC aşağıdakı qiymətləndirmə xidmətlərini təklif edir.</p>
<h2>Qiymətləndirmə növləri</h2>
<ul>
<li><strong>Şirkət qiymətləndirilməsi</strong> — biznesin dəyərinin obyektiv və peşəkar qiymətləndirilməsini həyata keçirir, bazar dəyərini müəyyən edirik.</li>
<li><strong>Daşınmaz əmlak</strong> — yaşayış binalarının, ofislərin və sənaye obyektlərinin bazar dəyərinin təyini.</li>
<li><strong>Maşın və avadanlıq</strong> — istehsal avadanlığı, nəqliyyat vasitələri və digər maşınların dəyərinin müəyyən edilməsi.</li>
<li><strong>Qeyri-maddi aktivlər</strong> — patentlər, müəllif hüquqları, ticarət nişanları və digər qeyri-maddi aktivlərin dəyərini təyin edirik.</li>
<li><strong>BMUS üçün qiymətləndirmə</strong> — Beynəlxalq Mühasibat Uçotu Standartlarına uyğun aktivlərin dəqiq qiymətləndirilməsi.</li>
<li><strong>Sığorta risk qiymətləndirilməsi</strong> — sığorta edilmiş obyektlərin risk dərəcəsinin və potensial risklərin müəyyən edilməsi.</li>
<li><strong>Əsas vəsaitlərin yenidən qiymətləndirilməsi</strong> — cari bazar dəyərinin müəyyən edilməsi.</li>
</ul>`,
    icon: "trending-up",
  },
  {
    id: "huquq",
    slug: "huquq",
    title: "Hüquqi xidmətlər",
    summary:
      "Vergi, əmək, valyuta, gömrük və inzibati qanunvericilik üzrə konsultasiya, məhkəmə və arbitrajda təmsilçilik.",
    description: `<p>Şirkətimiz hüquqi məsələlərin geniş spektri üzrə peşəkar dəstək göstərir.</p>
<h2>Əsas xidmətlər</h2>
<ul>
<li>Vergi, əmək, valyuta, gömrük, inzibati və cinayət qanunvericiliyi ilə əlaqədar sualların konsultasiyası</li>
<li>Məhkəmə işlərində yardım — mülki-hüquqi, vergi və inzibati məsələlər</li>
<li>Mübahisələrin məhkəməyəqədər həlli</li>
<li>Sənədlərin hazırlanması — ərizə, şikayət, xahiş</li>
<li>Arbitraj və ümumi məhkəmələrdə müştərinin müdafiəsi</li>
<li>İqtisadi sahə ilə əlaqəli cinayət işlərində vətəndaşlara yardım</li>
<li>Hüquqi şəxslərin qeydiyyatı, reorqanizasiyası və ləğvi</li>
<li>Nizamnamə sənədlərinin tərtibi</li>
<li>Layihələrin hüquqi müşayiəti</li>
</ul>
<h2>Vergi hüququ</h2>
<p>Vergi ödəyicilərinə məsləhət, vergi orqanlarında təmsilçilik və vergi hesabatlarının hazırlanması.</p>`,
    icon: "scale",
  },
  {
    id: "qeydiyyat",
    slug: "qeydiyyat",
    title: "Kommersiya hüquqi şəxslərin qeydiyyatı",
    summary:
      "Yerli və xarici investisiyalı hüquqi şəxslərin, filial və nümayəndəliklərin dövlət qeydiyyatı.",
    description: `<p>Abacus Audit And Consulting şirkətinin bu sahədə təqdim etdiyi xidmətlər aşağıdakılardan ibarətdir.</p>
<h2>Qeydiyyat növləri</h2>
<ul>
<li>Yerli investisiyalı hüquqi şəxsin fiziki şəxs tərəfindən təsisi</li>
<li>Yerli investisiyalı hüquqi şəxsin hüquqi şəxs tərəfindən təsisi</li>
<li>Xarici investisiyalı hüquqi şəxsin hüquqi şəxs tərəfindən təsisi</li>
<li>Xarici investisiyalı hüquqi şəxsin fiziki şəxs tərəfindən təsisi</li>
<li>Hüquqi şəxsin nümayəndəliyinin təsisi</li>
<li>Hüquqi şəxsin filialının təsisi</li>
</ul>
<p>Sənədlərin hazırlanmasından dövlət qeydiyyatına qədər bütün prosesi sizin adınıza aparırıq.</p>`,
    icon: "building",
  },
  {
    id: "kadr",
    slug: "kadr",
    title: "Kadr kargüzarlığı və HR audit",
    summary:
      "Kadr uçotunun qanunvericiliyə uyğun təşkili, HR sənəd şablonları, outsorsinq və kadr auditi.",
    description: `<p>Müəssisənizdə kadr sənədlərinin düzgün aparılmaması gələcəkdə ciddi hüquqi problemlərə və inzibati cərimələrə səbəb ola bilər. Kadr xidmətlərimiz məhz bu risklərin qarşısını almaq üçün nəzərdə tutulub.</p>
<h2>1. Kadr uçotunun təşkili</h2>
<ul>
<li>Kadr uçotunun AR qanunvericiliyinə uyğun təşkili</li>
<li>İcbari sığorta əməliyyatlarının icrası</li>
<li>Əməkdaşların şəxsi işlərinin yaradılması</li>
<li>Xəstəlik vərəqəsinin rəsmiləşdirilməsi</li>
<li>Əmək müqavilələrinin tərtibatı</li>
<li>Lokal normativ aktların hazırlanması</li>
<li>Ştat cədvəlinin tərtib edilməsi</li>
<li>İşçilərin EHP-də rəsmi qeydiyyata alınması</li>
</ul>
<h2>2. İnsan resursları şablonları</h2>
<p>Peşəkar mütəxəssislər tərəfindən insan resurslarının idarə edilməsi üzrə ehtiyac duyulan istənilən qaydanın və sənəd şablonlarının hazırlanması.</p>
<h2>3. Outsorsinq xidməti</h2>
<p>Peşəkar mütəxəssislərdən ibarət komandamızla outsorsinq xidməti formasında kadr kargüzarlığının həyata keçirilməsi — xərclərə qənaət edərək.</p>
<h2>4. Kadr auditi</h2>
<p>Biznesdə maliyyə və hüquqi risklərin müəyyən edilməsi, nöqsanların aşkarlanması və onların qarşısının alınması.</p>`,
    icon: "users",
  },
  {
    id: "miqrasiya",
    slug: "miqrasiya",
    title: "Miqrasiya xidmətləri",
    summary:
      "Əcnəbilər üçün iş icazəsi və yaşayış icazəsinin alınması — sənədlərin hazırlanmasından təhvilinə qədər.",
    description: `<p>Azərbaycan Respublikasında əcnəbi vətəndaşların və vətəndaşlığı olmayan şəxslərin əmək fəaliyyəti ilə məşğul olması üçün iş icazəsi və yaşayış icazəsinin alınması qanunvericiliyə əsasən məcburidir.</p>
<h2>Xidmətlərimiz</h2>
<ul>
<li>İş icazəsinin alınması və müddətinin uzadılması</li>
<li>Müvəqqəti yaşayış icazəsinin rəsmiləşdirilməsi</li>
<li>Sənədlərin toplanması və hazırlanması</li>
<li>Dövlət Miqrasiya Xidmətində müşayiət</li>
<li>Qeydiyyat və uçot məsələləri üzrə konsultasiya</li>
</ul>
<p>Prosesin hər mərhələsində sizi məlumatlandırır, müddətlərə nəzarət edirik.</p>`,
    icon: "globe",
  },
] as const

export const stats = [
  { value: 500, suffix: "+", label: "Layihə" },
  { value: 300, suffix: "+", label: "Müştəri" },
  { value: 9, suffix: "", label: "Xidmət sahəsi" },
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
    "2017-ci ilin fevral ayında əsası qoyulmuş “Abacus Audit And Consulting” MMC Azərbaycanın audit, mühasibat, vergi uçotu, maliyyə, hüquq və idarəetmə məsləhətləri sahəsində xidmət göstərən aparıcı şirkətlərindən biridir.",
    "Şirkətimizin uğuru yüksək peşəkar mütəxəssislərin bir komanda şəklində fəaliyyətindən qaynaqlanır. Auditorlar, maliyyə analitikləri, biznes məsləhətçiləri və hüquq üzrə ekspertlər vahid komanda kimi çalışır.",
    "Abacus Audit və Konsaltinq şirkəti olaraq biz müştərilərimizə ən yüksək səviyyədə mühasibat, audit, vergi hesabatı və konsaltinq xidmətləri təqdim edirik. Bizim missiyamız sizi hüquq, vergi və idarəetmə sahələrindən məlumatlandırmaq və dəstəkləməkdir.",
    "Müştərilərimizə təklif etdiyimiz operativ və yüksək keyfiyyətli xidmətlər sayəsində Abacus Audit Azərbaycanın ən böyük auditor-konsaltinq şirkətləri qrupuna daxildir. Əsas məqsədimiz müştərilərimizi rəqabətli biznesin qurulmasında dəstəkləməkdir.",
  ],
} as const

/** Live sitedəki “Niyə bizi seçməlisiniz?” bölməsi. */
export const whyUsItems = [
  {
    title: "İş təcrübəsi",
    description:
      "Müxtəlif sənaye şirkətləri, müxtəlif xidmət sahələrində fəaliyyət göstərən şirkətlər, xarici şirkətlərin ölkəmizdə fəaliyyət göstərən filial və nümayəndəlikləri ilə işləməkdə zəngin təcrübə toplamışıq.",
  },
  {
    title: "İxtisaslı heyət",
    description:
      "Mütəmadi seminarlar, daim yenilənən metodoloji baza və qanunvericiliyin monitorinqi kadrlarımızın davamlı peşəkar inkişafını təmin edir.",
  },
  {
    title: "Keyfiyyətə nəzarət",
    description:
      "Xidmətlərimizin hər mərhələsində çoxsəviyyəli keyfiyyətə nəzarət sistemi tətbiq etmişik.",
  },
  {
    title: "Kompleks yanaşma",
    description:
      "Hərtərəfli yanaşmadan irəli gələn və müəssisənin potensialına və profilinə uyğun olaraq qurulan xidmətlər təklif edirik.",
  },
  {
    title: "Qiymət siyasəti",
    description:
      "Müştərinin xüsusi ehtiyaclarını və konkret iqtisadi risklərini nəzərə alan çoxfaktorlu qiymət sistemi tətbiq edirik.",
  },
] as const

/** Homepage “necə işləyirik” addımları. */
export const processSteps = [
  {
    title: "Əlaqə və ilkin görüş",
    description:
      "Müraciətinizi qəbul edir, ehtiyacınızı və müəssisənizin profilini dəqiqləşdiririk.",
  },
  {
    title: "Təhlil və təklif",
    description:
      "Sənədləri və mövcud vəziyyəti qiymətləndirir, iş həcmini və qiyməti əks etdirən təklif hazırlayırıq.",
  },
  {
    title: "İcra",
    description:
      "Razılaşdırılmış qrafik üzrə işə başlayır, hər mərhələdə sizi məlumatlandırırıq.",
  },
  {
    title: "Hesabat və dəstək",
    description:
      "Yekun hesabatı təqdim edir, sonrakı dövrdə suallarınıza dəstək göstəririk.",
  },
] as const

/** FAQ — həm istifadəçi üçün, həm də FAQPage strukturlaşdırılmış datası üçün. */
export const faqItems = [
  {
    question: "Abacus Audit hansı lisenziya əsasında fəaliyyət göstərir?",
    answer:
      "Şirkət Azərbaycan Respublikası Auditorlar Palatasının üzvüdür — 21 iyul 2017-ci il tarixindən, AT/135 nömrəli lisenziya ilə.",
  },
  {
    question: "Audit xidmətinin qiyməti necə müəyyən olunur?",
    answer:
      "Qiymət müəssisənin dövriyyəsi, əməliyyatların həcmi, sahəsi və iş həcmi nəzərə alınmaqla çoxfaktorlu sistem üzrə hesablanır. İlkin görüşdən sonra sizə konkret təklif təqdim edirik.",
  },
  {
    question: "Mühasibat uçotunu tam outsorsinq şəklində sizə həvalə edə bilərəmmi?",
    answer:
      "Bəli. Fiziki və hüquqi şəxslərin fəaliyyətinin tam mühasibat müşayiətini, rüblük və illik hesabatların nəzarətedici orqanlara təqdim edilməsini öz üzərimizə götürürük.",
  },
  {
    question: "Əvvəlki dövrlərin uçotu qarışıqdırsa, bərpa edə bilərsinizmi?",
    answer:
      "Bəli. Mühasibat və vergi uçotunun qurulması və ya bərpa edilməsi ayrıca xidmət kimi göstərilir. Əvvəlcə mövcud vəziyyəti təhlil edir, sonra bərpa planını təqdim edirik.",
  },
  {
    question: "Vergi yoxlaması zamanı bizi təmsil edirsinizmi?",
    answer:
      "Bəli. Vergi yoxlamalarının müşayiəti, etirazların hazırlanması, şikayət və məhkəmə mərhələsində təmsilçilik xidmətlərimizə daxildir.",
  },
  {
    question: "Əcnəbi işçilər üçün iş icazəsini nə qədər müddətə alırsınız?",
    answer:
      "Müddət sənədlərin tamlığından və Dövlət Miqrasiya Xidmətinin baxış müddətindən asılıdır. Sənədlərin hazırlanmasından təhvilinə qədər bütün prosesi aparır və müddətlərə nəzarət edirik.",
  },
  {
    question: "Hansı şəhərlərdə xidmət göstərirsiniz?",
    answer:
      "Ofisimiz Bakı şəhəri, Nərimanov rayonu, Məsud Əlizadə küçəsi 138 ünvanındadır. Azərbaycanın bütün bölgələrindən olan müştərilərlə onlayn və yerində işləyirik.",
  },
  {
    question: "İlkin konsultasiya ödənişlidirmi?",
    answer:
      "İlkin konsultasiya pulsuzdur. Bizimlə əlaqə saxlayın, ehtiyacınızı dinləyib uyğun həlli və təxmini iş həcmini izah edək.",
  },
] as const
