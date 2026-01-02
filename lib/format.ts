import { format as dateFnsFormat } from "date-fns";
import { tr } from "date-fns/locale";

export function formatCurrency(value: number, currency: string = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: Date | string, formatStr: string = "dd MMM"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateFnsFormat(dateObj, formatStr, { locale: tr });
}

export function formatDateRange(since: Date | string, until: Date | string): string {
  return `${formatDate(since, "dd/MMM")} - ${formatDate(until, "dd/MMM")}`;
}

export function formatPercentage(value: number): string {
  return `${formatNumber(value)}%`;
}

