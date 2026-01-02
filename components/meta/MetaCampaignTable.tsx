"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, formatNumber, formatPercentage } from "@/lib/format";
import { type MetaInsight } from "@/lib/metaNormalize";

interface CampaignRow extends MetaInsight {
  name: string;
  status: string;
  daily_budget?: string;
  created_time: string;
}

const columns: ColumnDef<CampaignRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => <Switch checked={row.original.status === "ACTIVE"} />,
  },
  {
    accessorKey: "effective_status",
    header: "Etkinlik",
    cell: () => <Badge className="bg-green-100 text-green-700">Aktif</Badge>,
  },
  {
    accessorKey: "campaign_name",
    header: "Kampanya",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.campaign_name}</div>
    ),
  },
  {
    accessorKey: "daily_budget",
    header: "Bütçe",
    cell: ({ row }) => {
      const budget = row.original.daily_budget;
      return budget ? formatCurrency(parseFloat(budget), "TRY") : "-";
    },
  },
  {
    accessorKey: "created_time",
    header: "Oluşturulma Tarihi",
    cell: ({ row }) => formatDate(row.original.created_time),
  },
  {
    accessorKey: "spend",
    header: "Harcanan Tutar",
    cell: ({ row }) => formatCurrency(row.original.spend, "TRY"),
  },
  {
    accessorKey: "impressions",
    header: "Gösterim",
    cell: ({ row }) => formatNumber(row.original.impressions),
  },
  {
    accessorKey: "reach",
    header: "Erişim",
    cell: ({ row }) => formatNumber(row.original.reach),
  },
  {
    accessorKey: "purchase_roas",
    header: "ROAS",
    cell: ({ row }) => formatNumber(row.original.purchase_roas),
  },
  {
    id: "cpm",
    header: "1.000 Gösterim Başına Maliyet",
    cell: ({ row }) => formatCurrency(row.original.cpm / 1000, "TRY"),
  },
  {
    accessorKey: "clicks",
    header: "Bağlantı Tıklaması",
    cell: ({ row }) => formatNumber(row.original.clicks),
  },
  {
    id: "cpc",
    header: "Bağlantı Tıklama Başına Maliyet",
    cell: ({ row }) => formatCurrency(row.original.cpc, "TRY"),
  },
  {
    accessorKey: "ctr",
    header: "Tıklama Oranı",
    cell: ({ row }) => formatPercentage(row.original.ctr),
  },
  {
    accessorKey: "message_starts",
    header: "Mesajlaşma Başla",
    cell: ({ row }) => formatNumber(row.original.message_starts),
  },
];

export function MetaCampaignTable({
  data,
  campaigns,
}: {
  data: MetaInsight[];
  campaigns: Array<{
    id: string;
    name: string;
    status: string;
    daily_budget?: string;
    created_time: string;
  }>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const rows: CampaignRow[] = data.map((insight) => {
    const campaign = campaigns.find((c) => c.id === insight.campaign_id);
    return {
      ...insight,
      name: campaign?.name || insight.campaign_name,
      status: campaign?.status || "UNKNOWN",
      daily_budget: campaign?.daily_budget,
      created_time: campaign?.created_time || "",
    };
  });

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sonuç bulunamadı
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

