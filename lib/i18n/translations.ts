export type Locale = "en" | "fr" | "ar";

export const locales: Locale[] = ["en", "fr", "ar"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export const rtlLocales: Locale[] = ["ar"];

const en = {
  nav: {
    work: "Work",
    studio: "Studio",
    process: "Process",
    contact: "Contact",
    startProject: "Start a project",
  },
  hero: {
    eyebrow: "Web Design & Digital Agency",
    line1: "We craft digital",
    line2: "experiences that",
    line3: "transform brands.",
    description:
      "Webdono creates high-performance websites, e-commerce platforms, and digital experiences for ambitious businesses worldwide.",
    ctaGallery: "Explore the gallery",
    scroll: "Scroll",
  },
  filter: {
    all: "All",
  },
  categories: {
    Tourism: "Tourism",
    "Hotels & Riads": "Hotels & Riads",
    "E-commerce": "E-commerce",
    "Corporate Websites": "Corporate Websites",
    Transportation: "Transportation",
    "Luxury Services": "Luxury Services",
    Agriculture: "Agriculture",
    Experiences: "Experiences",
    Automotive: "Automotive",
  } as Record<string, string>,
  projects: {
    eyebrow: "Selected Work",
    headingPrefix: "A gallery of",
    headingSuffix: "digital experiences,",
    headingTail: "crafted end to end.",
    empty: "No projects in this category yet.",
  },
  studio: {
    eyebrow: "The Studio",
    heading1: "We don't build websites.",
    heading2: "We build first impressions.",
    description:
      "Webdono is a digital agency for brands who refuse to look ordinary. From boutique riads to industrial technology firms, we design and engineer web experiences that feel considered down to the pixel — fast, cinematic, and built to convert.",
    statShipped: "Digital experiences shipped",
    statIndustries: "Industries served",
    statYears: "Years crafting the web",
    statCountries: "Countries served",
  },
  process: {
    eyebrow: "How We Work",
    heading: "A process built for premium outcomes.",
    steps: [
      {
        title: "Discover",
        text: "We study your brand, audience, and competitors to define a sharp creative direction before a single pixel is placed.",
      },
      {
        title: "Design",
        text: "Interfaces are crafted in high fidelity with motion and interaction in mind — never a static mockup handed over blind.",
      },
      {
        title: "Build",
        text: "Clean, performant front-end engineering brings the design to life — fast, responsive, and built to scale with your business.",
      },
      {
        title: "Launch",
        text: "We ship, measure, and refine — ensuring the experience performs as well in the real world as it did in the design file.",
      },
    ],
  },
  footer: {
    eyebrow: "Let's work together",
    heading1: "Ready to build something",
    heading2: "extraordinary?",
    description:
      "Tell us about your brand and where you want to take it. We'll reply within one business day.",
    cta: "Contact us now",
    copyright: "All rights reserved.",
  },
  modal: {
    openLive: "Open live",
    clientIndustry: "Client Industry",
    objectives: "Objectives",
    designApproach: "Design Approach",
    technologies: "Technologies",
    servicesProvided: "Services Provided",
    visitWebsite: "Visit Website",
    contactWebdono: "Contact Webdono",
    frameBlocked: "This site restricts embedded previews. View it directly instead.",
    openHost: "Open",
    desktopView: "Desktop view",
    tabletView: "Tablet view",
    mobileView: "Mobile view",
  },
};

type Dict = typeof en;

const fr: Dict = {
  nav: {
    work: "Travaux",
    studio: "Studio",
    process: "Processus",
    contact: "Contact",
    startProject: "Démarrer un projet",
  },
  hero: {
    eyebrow: "Agence Web & Digitale",
    line1: "Nous créons des",
    line2: "expériences numériques qui",
    line3: "transforment les marques.",
    description:
      "Webdono crée des sites web performants, des plateformes e-commerce et des expériences digitales pour des entreprises ambitieuses partout dans le monde.",
    ctaGallery: "Explorer la galerie",
    scroll: "Défiler",
  },
  filter: {
    all: "Tout",
  },
  categories: {
    Tourism: "Tourisme",
    "Hotels & Riads": "Hôtels & Riads",
    "E-commerce": "E-commerce",
    "Corporate Websites": "Sites corporatifs",
    Transportation: "Transport",
    "Luxury Services": "Services de luxe",
    Agriculture: "Agriculture",
    Experiences: "Expériences",
    Automotive: "Automobile",
  },
  projects: {
    eyebrow: "Travaux sélectionnés",
    headingPrefix: "Une galerie de",
    headingSuffix: "expériences digitales,",
    headingTail: "conçues de bout en bout.",
    empty: "Aucun projet dans cette catégorie pour le moment.",
  },
  studio: {
    eyebrow: "Le Studio",
    heading1: "Nous ne construisons pas des sites web.",
    heading2: "Nous créons des premières impressions.",
    description:
      "Webdono est une agence digitale pour les marques qui refusent l'ordinaire. Des riads de charme aux entreprises technologiques, nous concevons des expériences web pensées jusqu'au pixel — rapides, cinématiques et conçues pour convertir.",
    statShipped: "Expériences digitales livrées",
    statIndustries: "Secteurs servis",
    statYears: "Années d'expertise web",
    statCountries: "Pays desservis",
  },
  process: {
    eyebrow: "Notre Méthode",
    heading: "Un processus conçu pour des résultats premium.",
    steps: [
      {
        title: "Découvrir",
        text: "Nous étudions votre marque, votre audience et vos concurrents pour définir une direction créative précise avant de poser le moindre pixel.",
      },
      {
        title: "Concevoir",
        text: "Les interfaces sont conçues en haute fidélité en pensant au mouvement et à l'interaction — jamais une maquette statique livrée à l'aveugle.",
      },
      {
        title: "Développer",
        text: "Un développement front-end propre et performant donne vie au design — rapide, responsive et conçu pour évoluer avec votre entreprise.",
      },
      {
        title: "Lancer",
        text: "Nous livrons, mesurons et affinons — pour garantir que l'expérience performe aussi bien dans le monde réel que dans la maquette.",
      },
    ],
  },
  footer: {
    eyebrow: "Travaillons ensemble",
    heading1: "Prêt à construire quelque chose",
    heading2: "d'extraordinaire ?",
    description:
      "Parlez-nous de votre marque et de vos ambitions. Nous répondrons sous un jour ouvré.",
    cta: "Contactez-nous",
    copyright: "Tous droits réservés.",
  },
  modal: {
    openLive: "Voir en direct",
    clientIndustry: "Secteur du client",
    objectives: "Objectifs",
    designApproach: "Approche de conception",
    technologies: "Technologies",
    servicesProvided: "Services fournis",
    visitWebsite: "Visiter le site",
    contactWebdono: "Contacter Webdono",
    frameBlocked: "Ce site restreint les aperçus intégrés. Consultez-le directement.",
    openHost: "Ouvrir",
    desktopView: "Vue bureau",
    tabletView: "Vue tablette",
    mobileView: "Vue mobile",
  },
};

const ar: Dict = {
  nav: {
    work: "أعمالنا",
    studio: "الاستوديو",
    process: "منهجيتنا",
    contact: "تواصل معنا",
    startProject: "ابدأ مشروعك",
  },
  hero: {
    eyebrow: "تصميم مواقع ووكالة رقمية",
    line1: "نصنع تجارب",
    line2: "رقمية",
    line3: "تُحوّل العلامات التجارية.",
    description:
      "تصمم Webdono مواقع عالية الأداء ومنصات تجارة إلكترونية وتجارب رقمية للشركات الطموحة حول العالم.",
    ctaGallery: "استكشف المعرض",
    scroll: "مرر للأسفل",
  },
  filter: {
    all: "الكل",
  },
  categories: {
    Tourism: "السياحة",
    "Hotels & Riads": "الفنادق والرياض",
    "E-commerce": "التجارة الإلكترونية",
    "Corporate Websites": "مواقع الشركات",
    Transportation: "النقل",
    "Luxury Services": "خدمات فاخرة",
    Agriculture: "الزراعة",
    Experiences: "التجارب",
    Automotive: "السيارات",
  },
  projects: {
    eyebrow: "أعمال مختارة",
    headingPrefix: "معرض يضم",
    headingSuffix: "تجربة رقمية،",
    headingTail: "مصممة من الألف إلى الياء.",
    empty: "لا توجد مشاريع في هذه الفئة بعد.",
  },
  studio: {
    eyebrow: "الاستوديو",
    heading1: "نحن لا نبني مواقع إلكترونية فحسب.",
    heading2: "نحن نصنع الانطباعات الأولى.",
    description:
      "Webdono وكالة رقمية للعلامات التجارية التي ترفض أن تكون عادية. من الرياض البوتيكية إلى الشركات الصناعية، نصمم وننفذ تجارب ويب مدروسة حتى أدق التفاصيل — سريعة وسينمائية ومصممة لتحقيق التحويل.",
    statShipped: "تجربة رقمية منجزة",
    statIndustries: "قطاعات تم خدمتها",
    statYears: "سنوات من الخبرة في الويب",
    statCountries: "دول تم خدمتها",
  },
  process: {
    eyebrow: "كيف نعمل",
    heading: "منهجية مصممة لتحقيق نتائج استثنائية.",
    steps: [
      {
        title: "الاكتشاف",
        text: "ندرس علامتك التجارية وجمهورك ومنافسيك لتحديد اتجاه إبداعي واضح قبل وضع أول بكسل.",
      },
      {
        title: "التصميم",
        text: "تُصمَّم الواجهات بدقة عالية مع مراعاة الحركة والتفاعل — لا نسلّم أبدًا نموذجًا ثابتًا بلا رؤية.",
      },
      {
        title: "التطوير",
        text: "تطوير واجهة أمامية نظيف وعالي الأداء يُحيي التصميم — سريع ومتجاوب ومصمم للنمو مع عملك.",
      },
      {
        title: "الإطلاق",
        text: "نطلق ونقيس ونُحسّن — لضمان أن تؤدي التجربة في الواقع بنفس جودة أدائها في ملف التصميم.",
      },
    ],
  },
  footer: {
    eyebrow: "لنعمل معًا",
    heading1: "هل أنت مستعد لبناء شيء",
    heading2: "استثنائي؟",
    description:
      "أخبرنا عن علامتك التجارية والوجهة التي تريد الوصول إليها. سنرد خلال يوم عمل واحد.",
    cta: "تواصل معنا الآن",
    copyright: "جميع الحقوق محفوظة.",
  },
  modal: {
    openLive: "معاينة مباشرة",
    clientIndustry: "قطاع العميل",
    objectives: "الأهداف",
    designApproach: "نهج التصميم",
    technologies: "التقنيات",
    servicesProvided: "الخدمات المقدمة",
    visitWebsite: "زيارة الموقع",
    contactWebdono: "تواصل مع Webdono",
    frameBlocked: "يمنع هذا الموقع المعاينة المضمّنة. تصفحه مباشرة بدلاً من ذلك.",
    openHost: "افتح",
    desktopView: "عرض سطح المكتب",
    tabletView: "عرض الجهاز اللوحي",
    mobileView: "عرض الهاتف",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, fr, ar };
