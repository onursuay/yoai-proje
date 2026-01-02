"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store";

interface TopbarProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  businessSelector?: boolean;
}

export function Topbar({
  icon,
  title,
  subtitle,
  action,
  businessSelector = true,
}: TopbarProps) {
  const selectedBusinessName = useAppStore((state) => state.selectedBusinessName);
  const setSelectedBusinessName = useAppStore((state) => state.setSelectedBusinessName);

  return (
    <div className="flex h-20 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        {icon && <div className="text-gray-600">{icon}</div>}
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {businessSelector && (
          <Select
            value={selectedBusinessName}
            onValueChange={setSelectedBusinessName}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yo Dijital">Yo Dijital</SelectItem>
            </SelectContent>
          </Select>
        )}
        {action}
      </div>
    </div>
  );
}

