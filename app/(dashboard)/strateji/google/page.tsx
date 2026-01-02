"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/common/ComingSoon";
import { Target } from "lucide-react";

export default function StratejiGooglePage() {
  return (
    <PageShell
      icon={<Target className="h-5 w-5" />}
      title="Strateji"
      subtitle="Google reklam stratejinizi oluşturun"
    >
      <ComingSoon />
    </PageShell>
  );
}

