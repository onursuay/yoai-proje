"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandIcon } from "@/components/common/BrandIcon";

export default function OptimizasyonMetaPage() {
  return (
    <PageShell
      icon={<BrandIcon name="meta" size={18} className="h-[18px] w-[18px]" />}
      title="Facebook Optimizasyon"
      subtitle="Reklam performansınızı optimize edin"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs defaultValue="roas" className="w-auto">
            <TabsList>
              <TabsTrigger value="roas">ROAS Tabanlı</TabsTrigger>
              <TabsTrigger value="all">Tüm Optimizasyonlar</TabsTrigger>
              <TabsTrigger value="ebm">EBM Tabanlı</TabsTrigger>
            </TabsList>
          </Tabs>
          <Badge variant="outline" className="px-3 py-1">
            Tam Optimizasyon: Pasif
          </Badge>
        </div>

        <Accordion type="multiple" className="space-y-4">
          <AccordionItem value="artirma" className="border rounded-lg px-4">
            <AccordionTrigger>
              <CardTitle className="text-lg">Artırma Optimizasyonları</CardTitle>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-3 py-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="cursor-pointer hover:border-green-500">
                    <CardContent className="p-4">
                      <Badge className="mb-2">ROAS</Badge>
                      <h4 className="font-semibold mb-2">Optimizasyon {i}</h4>
                      <p className="text-sm text-gray-600">
                        Kısa açıklama metni buraya gelecek
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="azaltma" className="border rounded-lg px-4">
            <AccordionTrigger>
              <CardTitle className="text-lg">Azaltma Optimizasyonları</CardTitle>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-3 py-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="cursor-pointer hover:border-green-500">
                    <CardContent className="p-4">
                      <Badge className="mb-2">EBM</Badge>
                      <h4 className="font-semibold mb-2">Optimizasyon {i}</h4>
                      <p className="text-sm text-gray-600">Açıklama</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="kapatma" className="border rounded-lg px-4">
            <AccordionTrigger>
              <CardTitle className="text-lg">Kapatma Optimizasyonları</CardTitle>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-3 py-4">
                {[1].map((i) => (
                  <Card key={i} className="cursor-pointer hover:border-green-500">
                    <CardContent className="p-4">
                      <Badge className="mb-2">ROAS</Badge>
                      <h4 className="font-semibold mb-2">Optimizasyon {i}</h4>
                      <p className="text-sm text-gray-600">Açıklama</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="acma" className="border rounded-lg px-4">
            <AccordionTrigger>
              <CardTitle className="text-lg">Açma Optimizasyonları</CardTitle>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-3 py-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="cursor-pointer hover:border-green-500">
                    <CardContent className="p-4">
                      <Badge className="mb-2">EBM</Badge>
                      <h4 className="font-semibold mb-2">Optimizasyon {i}</h4>
                      <p className="text-sm text-gray-600">Açıklama</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PageShell>
  );
}

