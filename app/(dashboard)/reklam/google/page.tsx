"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/common/ComingSoon";
import { Megaphone } from "lucide-react";

export default function ReklamGooglePage() {
  return (
    <PageShell
      icon={<Megaphone className="h-5 w-5" />}
      title="Reklam Yöneticisi"
      subtitle="Google reklam kampanyalarınızı yönetin"
    >
      <ComingSoon />
    </PageShell>
  );
}

