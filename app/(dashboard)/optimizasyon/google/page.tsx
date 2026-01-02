"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/common/ComingSoon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export default function OptimizasyonGooglePage() {
  return (
    <PageShell
      icon={<GoogleIcon className="h-5 w-5" />}
      title="Google Optimizasyon"
      subtitle="Reklam performansınızı optimize edin"
    >
      <ComingSoon />
    </PageShell>
  );
}

