"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/common/ComingSoon";
import { User } from "lucide-react";

export default function HesabimPage() {
  return (
    <PageShell
      icon={<User className="h-5 w-5" />}
      title="Hesabım"
      subtitle="Hesap ayarları ve profil bilgileri"
    >
      <ComingSoon />
    </PageShell>
  );
}

