import { useCallback, useState } from "react";
import {
  SortDirection,
  SortRequestHandler,
  TableSort,
} from "../../utils/ui-types";

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
