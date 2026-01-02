"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";

export default function IyzaiPage() {
  return (
    <PageShell
      icon={<Sparkles className="h-5 w-5" />}
      title="iyzAi"
      subtitle="AI destekli reklam yönetimi"
      businessSelector={true}
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Hesaplar</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Ara..." className="max-w-xs" />
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Merhaba Kemal / Nasıl yardımcı olabilirim?
            </h2>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Markama Uygun Makaleler Yaz",
            "Kategorilerim İçin Makaleler Yaz",
            "Anasayfam İçin Makale Yaz",
            "Ürünlerim İçin Makaleler Yaz",
            "Meta Başlığı ve Açıklamalar",
          ].map((title, i) => (
            <Card key={i} className="cursor-pointer hover:border-primary">
              <CardContent className="p-4">
                <h3 className="font-semibold">{title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-4">
            <Textarea
              placeholder="Bir mesaj gönderin..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <div className="text-sm text-gray-500">
          Günlük Mesaj Hakkınız 0/10
        </div>
      </div>
    </PageShell>
  );
}

