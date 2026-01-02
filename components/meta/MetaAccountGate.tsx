"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function MetaAccountGate() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meta Hesabı Bağlanmadı</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Meta reklam verilerinizi görmek için önce bir Meta hesabı bağlamanız
          gerekiyor.
        </p>
        <Button onClick={() => router.push("/entegrasyon")}>
          <Link2 className="mr-2 h-4 w-4" />
          Meta Hesabı Bağla
        </Button>
      </CardContent>
    </Card>
  );
}

