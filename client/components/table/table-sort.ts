import { useCallback, useState } from "react";

export type TableSort = {
  field: string | null;
  direction: SortDirection | null;
};

export type SortDirection = "asc" | "desc";

type SortRequestHandler = (field: string) => void;

const nextSortDirection: Record<
  SortDirection | "null",
  SortDirection | null
> = {
  null: "asc",
  asc: "desc",
  desc: null,
};

export const useNullableTableSort = (): [TableSort, SortRequestHandler] => {
  const [{ field, direction }, setSort] = useState({
    field: null,
    direction: null,
  } as TableSort);

  const handleSortRequest = useCallback(
    (sortBy: string) => {
      const newSortDirection =
        nextSortDirection[String(direction) as SortDirection | "null"];
      const newSortField = newSortDirection ? sortBy : null;
      setSort({ field: newSortField, direction: newSortDirection });
    },
    [direction],
  );

  return [{ field, direction }, handleSortRequest];
};

// we can add other variants here, maybe
