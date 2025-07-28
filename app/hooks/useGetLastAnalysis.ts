import { useAppSelector } from "./useTypedHooks";
import { useMemo } from "react";
import { HistoryEntry, UserData } from "@/types/userDataType";

export function useLatestHistoryDate(): Date | null {
  const userData = useAppSelector((state) => state.user.data) as UserData | null;

  const latestDate = useMemo(() => {
    if (!userData?.history) return null;

    const dates: Date[] = [];

    Object.values(userData.history).forEach((category) => {
      Object.values(category).forEach((entry: HistoryEntry) => {
        const date = new Date(entry.createdAt);
        if (!isNaN(date.getTime())) {
          dates.push(date);
        }
      });
    });

    if (dates.length === 0) return null;

    return new Date(Math.max(...dates.map((d) => d.getTime())));
  }, [userData]);

  return latestDate;
}
