"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Settings,
  TrendingUp,
  Sparkles,
  Users,
  Palette,
  BarChart3,
  Package,
  Search,
  Link2,
  User,
  ChevronDown,
  ChevronRight,
  Bell,
  CheckCircle2,
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
import { BrandIcon } from "@/components/common/BrandIcon";

type MenuIcon =
  | { type: "lucide"; icon: LucideIcon }
  | { type: "brand"; name: "meta" | "google" };

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Settings,
  TrendingUp,
  Sparkles,
  Users,
  Palette,
  BarChart3,
  Package,
  Search,
  Link2,
  User,
};

function MenuIconView({ icon }: { icon: MenuIcon }) {
  if (icon.type === "lucide") {
    const Icon = icon.icon;
    return <Icon className="h-4 w-4" aria-hidden="true" />;
  }
  return <BrandIcon name={icon.name} size={16} className="h-4 w-4" />;
}

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
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-4">
        <div className="flex h-8 w-8 items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <span className="text-lg font-semibold text-green-600">YoAi</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {SIDEBAR_ITEMS.map((item) => {
          if ("children" in item) {
            const isOpen = openItems.includes(item.label);
            const hasActiveChild = item.children?.some((child) =>
              isActive(child.href)
            );
            const Icon = iconMap[item.icon] || Zap;

            return (
              <Collapsible
                key={item.label}
                open={isOpen}
                onOpenChange={() => toggleItem(item.label)}
              >
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    hasActiveChild
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {"badge" in item && item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-1 bg-green-100 text-green-700 text-[10px] px-1.5 py-0 font-medium"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-8 mt-1 space-y-0.5">
                    {item.children?.map((child) => {
                      const childActive = isActive(child.href);
                      const childIcon: MenuIcon =
                        child.label === "Meta"
                          ? { type: "brand", name: "meta" }
                          : child.label === "Google"
                          ? { type: "brand", name: "google" }
                          : { type: "lucide", icon: Zap };
                      
                      // Sadece "Reklam" grubundaki Meta ve Google için Link kullan
                      const isReklamMetaOrGoogle = item.label === "Reklam" && (child.label === "Meta" || child.label === "Google");
                      
                      if (isReklamMetaOrGoogle) {
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            legacyBehavior
                          >
                            <a
                              onClick={(e) => e.stopPropagation()}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                                childActive
                                  ? "bg-green-50 text-green-700 font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              )}
                            >
                              <MenuIconView icon={childIcon} />
                              <span>{child.label}</span>
                            </a>
                          </Link>
                        );
                      }
                      
                      return (
                        <button
                          key={child.href}
                          onClick={() => router.push(child.href)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                            childActive
                              ? "bg-green-50 text-green-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <MenuIconView icon={childIcon} />
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          }

          const Icon = iconMap[item.icon] || Zap;
          const active = isActive(item.href!);
          
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href!)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1 bg-green-100 text-green-700 text-[10px] px-1.5 py-0 font-medium"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                KK
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">KK Kemal Koçak</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="relative rounded-lg p-1.5 hover:bg-gray-100">
              <Bell className="h-4 w-4 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

