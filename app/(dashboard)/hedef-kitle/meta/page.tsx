"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MetaIcon } from "@/components/icons/MetaIcon";

export default function HedefKitleMetaPage() {
  return (
    <PageShell
      icon={<MetaIcon className="h-5 w-5" />}
      title="Hedef Kitle"
      subtitle="Reklam hedef kitlelerinizi yönetin"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label>Meta</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center gap-2">
            <Label>Google</Label>
            <Switch />
          </div>
        </div>

        <Tabs defaultValue="ai" className="w-full">
          <TabsList>
            <TabsTrigger value="ai">AI Tabanlı Hedef Kitle</TabsTrigger>
            <TabsTrigger value="detailed">Detaylı Kitle</TabsTrigger>
            <TabsTrigger value="similar">Benzer Kitle</TabsTrigger>
            <TabsTrigger value="retargeting">Retargeting</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <Input placeholder="Hedef kitle arayın..." />
            <Accordion type="multiple">
              {["Kategori 1", "Kategori 2", "Kategori 3"].map((category) => (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger>{category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Hedef Kitle 1", "Hedef Kitle 2"].map((audience) => (
                        <div
                          key={audience}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <span>{audience}</span>
                          <Button size="sm">Reklam Oluştur</Button>
                        </div>
                      ))}
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

