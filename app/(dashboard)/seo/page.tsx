"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/common/ComingSoon";
import { Search } from "lucide-react";

export default function SeoPage() {
  return (
    <PageShell
      icon={<Search className="h-5 w-5" />}
      title="SEO"
      subtitle="SEO analiz ve optimizasyon"
    >
      <ComingSoon />
    </PageShell>
  );
}

