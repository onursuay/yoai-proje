"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart3 } from "lucide-react";

export default function RaporlarPage() {
  return (
    <PageShell
      icon={<BarChart3 className="h-5 w-5" />}
      title="Raporlar"
      subtitle="Reklam performans raporlarınız"
    >
      <div className="space-y-6">
        <Tabs defaultValue="meta" className="w-full">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="tiktok">
              TikTok
              <span className="ml-2 text-xs text-gray-500">Yakında</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meta" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Hızlı Bakış</h2>
              <Select defaultValue="best">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="best">En İyi Reklamlar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="cursor-pointer hover:border-primary">
                  <CardContent className="p-4">
                    <div className="aspect-video rounded bg-gray-100 mb-2" />
                    <p className="text-sm font-medium">Reklam {i}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Accordion type="multiple" className="space-y-4">
              {[
                "Maliyet",
                "Alışveriş",
                "Sepet",
                "Tıklama",
                "Mesajlaşma",
                "Erişim/Gösterim",
                "Uygulama",
              ].map((category) => (
                <AccordionItem key={category} value={category} className="border rounded-lg px-4">
                  <AccordionTrigger>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="py-4 space-y-4">
                      <div className="h-48 rounded bg-gray-100" />
                      <div className="grid gap-4 md:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <p className="text-sm text-gray-600">KPI {i}</p>
                              <p className="text-xl font-semibold">0</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

