// ─── EDIT THIS FILE ONLY TO ADD / REMOVE / UPDATE LINKS ─────────────────────

export type LinkItem = {
  id: string;
  label: string;
  sublabel?: string;
  href: string;
  iconId: string;
  color: string;
  glowColor: string;
  gradient: string;
  external?: boolean;
};

export const BRAND = {
  name: "دانار كابيتال",
  nameEn: "Danar Capital",
  tagline: "تعليم الأسواق المالية",
  taglineSub: "Forex · Stocks · Crypto",
  description: "تعليم تداول مجاني | توصيات يومية | شريك رسمي لـ XTB Broker",
} as const;

export const SOCIAL_LINKS: LinkItem[] = [
  {
    id: "x",
    label: "X (تويتر)",
    sublabel: "@Danar_Capital",
    href: "https://x.com/Danar_Capital",
    iconId: "x",
    color: "#E7E7E7",
    glowColor: "rgba(231,231,231,0.18)",
    gradient: "linear-gradient(135deg, rgba(18,18,28,0.92) 0%, rgba(14,48,88,0.88) 100%)",
    external: true,
  },
  {
    id: "snapchat",
    label: "سناب شات",
    sublabel: "Danar Capital",
    href: "https://snapchat.com/t/dTiudKnV",
    iconId: "snapchat",
    color: "#FFFC00",
    glowColor: "rgba(255,252,0,0.2)",
    gradient: "linear-gradient(135deg, rgba(45,38,0,0.92) 0%, rgba(100,90,0,0.88) 100%)",
    external: true,
  },
  {
    id: "tiktok",
    label: "تيك توك",
    sublabel: "@danar.capital",
    href: "https://www.tiktok.com/@danar.capital",
    iconId: "tiktok",
    color: "#69C9D0",
    glowColor: "rgba(105,201,208,0.2)",
    gradient: "linear-gradient(135deg, rgba(1,1,1,0.92) 0%, rgba(80,200,210,0.35) 60%, rgba(238,29,82,0.45) 100%)",
    external: true,
  },
  {
    id: "telegram",
    label: "تيليغرام",
    sublabel: "@Danarcapital",
    href: "https://t.me/Danarcapital",
    iconId: "telegram",
    color: "#29A9EB",
    glowColor: "rgba(41,169,235,0.2)",
    gradient: "linear-gradient(135deg, rgba(0,30,60,0.92) 0%, rgba(0,120,200,0.75) 100%)",
    external: true,
  },
  {
    id: "whatsapp",
    label: "واتساب",
    sublabel: "+971 52 399 4709",
    href: "https://wa.me/971523994709?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%AF%D8%A7%D9%86%D8%A7%D8%B1%20%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84",
    iconId: "whatsapp",
    color: "#25D366",
    glowColor: "rgba(37,211,102,0.2)",
    gradient: "linear-gradient(135deg, rgba(0,30,10,0.92) 0%, rgba(18,120,50,0.82) 100%)",
    external: true,
  },
  {
    id: "xtb",
    label: "سجّل مع شريكنا XTB",
    sublabel: "افتح حساب حقيقي مجاناً",
    href: "https://www.xtb.com/ar/live-account/?partnerId=7794172&utm_campaign=7794172&campaignId=31&utm_term=31&utm_content=product_real_account&refType=1&utm_source=pso&utm_medium=affiliate",
    iconId: "xtb",
    color: "#E8C84A",
    glowColor: "rgba(232,200,74,0.25)",
    gradient: "linear-gradient(135deg, rgba(30,22,0,0.95) 0%, rgba(100,80,0,0.85) 100%)",
    external: true,
  },
];
