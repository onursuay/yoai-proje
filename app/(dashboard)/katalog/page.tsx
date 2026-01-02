"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/common/ComingSoon";
import { Package } from "lucide-react";

export default function KatalogPage() {
  return (
    <PageShell
      icon={<Package className="h-5 w-5" />}
      title="Katalog"
      subtitle="Ürün kataloğunuzu yönetin"
    >
      <ComingSoon />
    </PageShell>
  );
}

