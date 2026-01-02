"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/common/ComingSoon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export default function StratejiGooglePage() {
  return (
    <PageShell
      icon={<GoogleIcon className="h-5 w-5" />}
      title="Strateji"
      subtitle="Google reklam stratejinizi oluşturun"
    >
      <ComingSoon />
    </PageShell>
  );
}

