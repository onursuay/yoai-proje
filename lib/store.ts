import { create } from "zustand";
import { persist } from "zustand/middleware";
import { subDays, format } from "date-fns";

interface DateRange {
  since: string; // YYYY-MM-DD
  until: string; // YYYY-MM-DD
}

interface AppState {
  selectedBusinessName: string;
  selectedAdAccountId: string | null;
  selectedDateRange: DateRange;
  setSelectedBusinessName: (name: string) => void;
  setSelectedAdAccountId: (id: string | null) => void;
  setSelectedDateRange: (range: DateRange) => void;
}

const defaultDateRange: DateRange = {
  since: format(subDays(new Date(), 30), "yyyy-MM-dd"),
  until: format(new Date(), "yyyy-MM-dd"),
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedBusinessName: "Yo Dijital",
      selectedAdAccountId: null,
      selectedDateRange: defaultDateRange,
      setSelectedBusinessName: (name) => set({ selectedBusinessName: name }),
      setSelectedAdAccountId: (id) => set({ selectedAdAccountId: id }),
      setSelectedDateRange: (range) => set({ selectedDateRange: range }),
    }),
    {
      name: "yo-ads-store",
    }
  )
);

