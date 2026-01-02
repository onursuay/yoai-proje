export const SIDEBAR_ITEMS = [
  {
    label: "Reklam",
    icon: "Megaphone",
    children: [
      { label: "Meta", href: "/reklam/meta", badge: null },
      { label: "Google", href: "/reklam/google", badge: null },
    ],
  },
  {
    label: "Strateji",
    icon: "Target",
    badge: "AI",
    children: [
      { label: "Meta", href: "/strateji/meta", badge: null },
      { label: "Google", href: "/strateji/google", badge: null },
    ],
  },
  {
    label: "Optimizasyon",
    icon: "TrendingUp",
    badge: "AI",
    children: [
      { label: "Meta", href: "/optimizasyon/meta", badge: null },
      { label: "Google", href: "/optimizasyon/google", badge: null },
    ],
  },
  {
    label: "iyzAi",
    icon: "Sparkles",
    href: "/iyzai",
    badge: "⌘K",
  },
  {
    label: "Hedef Kitle",
    icon: "Users",
    href: "/hedef-kitle/meta",
    badge: "AI",
  },
  {
    label: "Tasarım",
    icon: "Palette",
    href: "/tasarim",
    badge: "AI",
  },
  {
    label: "Raporlar",
    icon: "BarChart3",
    href: "/raporlar",
    badge: null,
  },
  {
    label: "Katalog",
    icon: "Package",
    href: "/katalog",
    badge: null,
  },
  {
    label: "SEO",
    icon: "Search",
    href: "/seo",
    badge: null,
  },
  {
    label: "Entegrasyon",
    icon: "Link",
    href: "/entegrasyon",
    badge: null,
  },
  {
    label: "Hesabım",
    icon: "User",
    href: "/hesabim",
    badge: null,
  },
] as const;

