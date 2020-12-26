import { useCallback, useState } from "react";

export type TableSort = {
  field: string | null;
  direction: SortDirection | null;
};

export type SortDirection = "asc" | "desc";

type SortRequestHandler = (field: string) => void;

export function useNullableTableSort(): [TableSort, SortRequestHandler] {
  const [sort, setSort] = useState({
    field: null,
    direction: null,
  } as TableSort);

  const handleSortRequest = useCallback((field: string) => {
    // updating sort: null -> asc -> desc -> null -> asc -> ...
    setSort(({ field: prevField, direction: prevDirection }) => {
      if (prevField) {
        if (prevField === field && prevDirection === "asc") {
          return {
            field,
            direction: "asc",
          };
        }

        if (prevField === field && prevDirection === "desc") {
          return {
            field: null,
            direction: null,
          };
        }
      }

      return {
        field,
        direction: "asc",
      };
    });
  }, []);

  return [sort, handleSortRequest];
}

// we can add other variants here, maybe
