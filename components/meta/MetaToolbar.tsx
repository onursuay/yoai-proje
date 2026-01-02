"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Edit, Trash2 } from "lucide-react";

export function MetaToolbar({
  searchQuery,
  onSearchChange,
  showInactive,
  onShowInactiveChange,
  dateRange,
  onDateRangeChange,
  onRefresh,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showInactive: boolean;
  onShowInactiveChange: (show: boolean) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onRefresh: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <Input
          placeholder="İsim veya id ile ara..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <Switch
            id="show-inactive"
            checked={showInactive}
            onCheckedChange={onShowInactiveChange}
          />
          <Label htmlFor="show-inactive" className="text-sm">
            Pasifleri Göster
          </Label>
        </div>
        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7">Son 7 Gün</SelectItem>
            <SelectItem value="last-30">Son 30 Gün</SelectItem>
            <SelectItem value="last-90">Son 90 Gün</SelectItem>
            <SelectItem value="custom">Özel Tarih</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="default">
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Varsayılan</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

