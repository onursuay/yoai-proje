"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Youtube } from "lucide-react";
import { useState } from "react";
import { BrandIcon } from "@/components/common/BrandIcon";

export default function StratejiMetaPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <PageShell
      icon={<BrandIcon name="meta" size={18} className="h-[18px] w-[18px]" />}
      title="Strateji"
      subtitle="Meta reklam stratejinizi oluşturun"
    >
      <div className="space-y-6">
        <Card className="bg-gray-900 text-white">
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <p className="text-lg">Hedef Kitle oluşturuluyor...</p>
                <div className="space-y-3">
                  <div className="rounded-lg bg-gray-800 p-4">
                    <p className="font-semibold">Hedef Kitle</p>
                  </div>
                  <div className="ml-6 rounded-lg bg-gray-800 p-4">
                    <p>Yeni Kullanıcı</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-gray-800"
                onClick={() => setIsDialogOpen(true)}
              >
                <Youtube className="mr-2 h-4 w-4" />
                Strateji Nedir?
              </Button>
            </div>
            <div className="mt-8">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => setIsDialogOpen(true)}
              >
                Meta Strateji&apos;yi Hemen Dene
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meta Strateji</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Reklam Hesabı Seçin</label>
              <Select required>
                <SelectTrigger className="mt-1 border-red-500">
                  <SelectValue placeholder="Reklam Hesabı Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account1">Hesap 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Katalog Seçin</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Katalog Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="catalog1">Katalog 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">
                Günlük Reklam Bütçesi Belirleyin
              </label>
              <div className="mt-1 flex gap-2">
                <Input type="number" placeholder="1000" />
                <Select defaultValue="USD">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="TRY">TRY</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              İptal
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Strateji Oluştur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}

