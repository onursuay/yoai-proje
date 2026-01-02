"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

export default function TasarimPage() {
  return (
    <PageShell
      icon={<Palette className="h-5 w-5" />}
      title="Tasarım"
      subtitle="Reklam görselleri ve videoları oluşturun"
      action={
        <div className="flex items-center gap-4">
          <Badge className="px-3 py-1">100 Kredi</Badge>
          <Button variant="outline">Kredi Yükle</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Tabs defaultValue="design" className="w-full">
          <TabsList className="mx-auto">
            <TabsTrigger value="design">Tasarım</TabsTrigger>
            <TabsTrigger value="library">Kütüphane</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Label>Görsel Üret</Label>
                  <Switch defaultChecked />
                  <Label>Video Üret</Label>
                  <Switch />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Prompt</Label>
                  <Textarea placeholder="Görsel için prompt yazın..." className="mt-1" />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Başlık (0/300)</Label>
                    <Input className="mt-1" />
                  </div>
                  <div>
                    <Label>Slogan (0/100)</Label>
                    <Input className="mt-1" />
                  </div>
                  <div>
                    <Label>Web Site URL</Label>
                    <Input className="mt-1" />
                  </div>
                  <div>
                    <Label>Görsel Oranı</Label>
                    <Select defaultValue="4:3">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4:3">4:3</SelectItem>
                        <SelectItem value="1:1">1:1</SelectItem>
                        <SelectItem value="9:16">9:16</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Görsel Oluştur
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900 to-green-700">
              <CardContent className="p-8">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-white/10 backdrop-blur-sm"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

