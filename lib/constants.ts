export const SIDEBAR_ITEMS = [
  {
    label: "Reklam",
    icon: "Zap",
    children: [
      { label: "Meta", href: "/reklam/meta", badge: null },
      { label: "Google", href: "/reklam/google", badge: null },
    ],
  },
  {
    label: "Strateji",
    icon: "Settings",
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
    label: "YoAi",
    icon: "Sparkles",
    href: "/yoai",
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
    icon: "Link2",
    href: "/entegrasyon",
    badge: null,
  },
] as const;

