"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Megaphone,
  Target,
  TrendingUp,
  Sparkles,
  Users,
  Palette,
  BarChart3,
  Package,
  Search,
  Link,
  User,
  ChevronDown,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Megaphone,
  Target,
  TrendingUp,
  Sparkles,
  Users,
  Palette,
  BarChart3,
  Package,
  Search,
  Link,
  User,
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Megaphone className="h-6 w-6 text-white" />
        </div>
        <span className="text-lg font-semibold">YO Ads</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {SIDEBAR_ITEMS.map((item) => {
          if ("children" in item) {
            const isOpen = openItems.includes(item.label);
            const hasActiveChild = item.children?.some((child) =>
              isActive(child.href)
            );
            const Icon = iconMap[item.icon] || Megaphone;

            return (
              <Collapsible
                key={item.label}
                open={isOpen}
                onOpenChange={() => toggleItem(item.label)}
              >
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100",
                    hasActiveChild && "bg-green-50 text-green-700"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {"badge" in item && item.badge && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children?.map((child) => (
                      <button
                        key={child.href}
                        onClick={() => router.push(child.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100",
                          isActive(child.href) &&
                            "bg-green-50 text-green-700 font-medium"
                        )}
                      >
                        <span>{child.label}</span>
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          }

          const Icon = iconMap[item.icon] || Megaphone;
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href!)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100",
                isActive(item.href!) && "bg-green-50 text-green-700"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Kemal Koçak</span>
          </div>
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

