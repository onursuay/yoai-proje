"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface PageShellProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  businessSelector?: boolean;
  children: ReactNode;
}

export function PageShell({
  icon,
  title,
  subtitle,
  action,
  businessSelector,
  children,
}: PageShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          icon={icon}
          title={title}
          subtitle={subtitle}
          action={action}
          businessSelector={businessSelector}
        />
        <main className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

