"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function MetaTabs({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="campaigns">Kampanyalar</TabsTrigger>
        <TabsTrigger value="adsets">
          Reklam Setleri
          <Badge className="ml-2" variant="secondary">
            Yakında
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="ads">
          Reklamlar
          <Badge className="ml-2" variant="secondary">
            Yakında
          </Badge>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}

