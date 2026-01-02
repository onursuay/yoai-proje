"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionCard } from "@/components/common/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

interface AdAccount {
  account_id: string;
  name: string;
  currency: string;
}

export default function EntegrasyonPage() {
  const router = useRouter();
  const selectedAdAccountId = useAppStore((state) => state.selectedAdAccountId);
  const setSelectedAdAccountId = useAppStore((state) => state.setSelectedAdAccountId);
  const [isMetaDialogOpen, setIsMetaDialogOpen] = useState(false);
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>("");

  const fetchAdAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/meta/adaccounts");
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setAdAccounts(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching ad accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectMeta = () => {
    setIsMetaDialogOpen(true);
    if (!adAccounts.length) {
      fetchAdAccounts();
    }
  };

  const handleSelectAccount = () => {
    if (selectedAccount) {
      setSelectedAdAccountId(selectedAccount);
      setIsMetaDialogOpen(false);
      setSelectedAccount("");
    }
  };

  const isMetaConnected = !!selectedAdAccountId;
  const connectedAccount = adAccounts.find((acc) => acc.account_id === selectedAdAccountId);

  return (
    <PageShell
      icon={<Link className="h-5 w-5" />}
      title="Entegrasyon"
      subtitle="Reklam platformlarınızı bağlayın"
    >
      <div className="space-y-6">
        <SectionCard title="Reklam Platformları">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Meta Ads */}
            <Card
              className={`cursor-pointer transition-all ${
                isMetaConnected
                  ? "border-green-500 bg-green-50"
                  : "hover:border-gray-300"
              }`}
              onClick={handleConnectMeta}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold">Meta Ads</h3>
                  {isMetaConnected && (
                    <Badge className="mt-2 bg-green-500">Bağlandı</Badge>
                  )}
                  {connectedAccount && (
                    <p className="mt-1 text-sm text-gray-500">
                      {connectedAccount.name}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  {isMetaConnected ? "Değiştir" : "Hesap bağla →"}
                </Button>
              </CardContent>
            </Card>

            {/* Google Ads */}
            <Card className="cursor-pointer transition-all hover:border-gray-300">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold">Google Ads</h3>
                </div>
                <Button variant="ghost" size="sm">
                  Hesap bağla →
                </Button>
              </CardContent>
            </Card>

            {/* TikTok Ads */}
            <Card className="cursor-pointer transition-all hover:border-gray-300 opacity-60">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold">TikTok Ads</h3>
                  <Badge className="mt-2" variant="secondary">
                    Yakında
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" disabled>
                  Hesap bağla →
                </Button>
              </CardContent>
            </Card>
          </div>
        </SectionCard>

        <SectionCard title="Raporlama Platformları">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Google Analytics */}
            <Card className="cursor-pointer transition-all hover:border-gray-300">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold">Google Analytics</h3>
                </div>
                <Button variant="ghost" size="sm">
                  Hesap bağla →
                </Button>
              </CardContent>
            </Card>

            {/* Slack */}
            <Card className="cursor-pointer transition-all hover:border-gray-300 opacity-60">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold">Slack</h3>
                  <Badge className="mt-2" variant="secondary">
                    Yakında
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" disabled>
                  Hesap bağla →
                </Button>
              </CardContent>
            </Card>
          </div>
        </SectionCard>
      </div>

      {/* Meta Account Selection Dialog */}
      <Dialog open={isMetaDialogOpen} onOpenChange={setIsMetaDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meta Ads Hesabı Seçin</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {loading ? (
              <p className="text-sm text-gray-500">Yükleniyor...</p>
            ) : (
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Hesap seçin" />
                </SelectTrigger>
                <SelectContent>
                  {adAccounts.map((account) => (
                    <SelectItem key={account.account_id} value={account.account_id}>
                      {account.name} ({account.currency})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsMetaDialogOpen(false);
                setSelectedAccount("");
              }}
            >
              İptal
            </Button>
            <Button onClick={handleSelectAccount} disabled={!selectedAccount}>
              Bağla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}

