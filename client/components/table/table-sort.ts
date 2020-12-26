import { useCallback, useState } from "react";

export type TableSort = {
  sortFieldId: string | null;
  direction: SortDirection | null;
};

export type SortDirection = "asc" | "desc";

type SortRequestHandler = (field: string) => void;

// Вообще это можно описать через switch и стейт машину, но кажется тут совсем изевый вариант для этого.
const directionState: Record<SortDirection, SortDirection | null> = {
  asc: "desc",
  desc: null,
};

export function useNullableTableSort(): [TableSort, SortRequestHandler] {
  const [{ direction, sortFieldId }, setSort] = useState({
    // Хорошо бы давать более осмысленные названия переменным
    // Инача от обилия field сложно разобраться в том, что проиходит
    sortFieldId: null,
    direction: null,
  } as TableSort);

  const handleSortRequest = useCallback(
    (fieldId: string) => {
      // updating sort: null -> asc -> desc -> null -> asc -> ...
      const newSortFieldId = direction === "desc" ? null : fieldId;
      const newDirection = direction ? directionState[direction] : "asc";
      setSort({ sortFieldId: newSortFieldId, direction: newDirection });
    },
    [direction],
  );

  return [{ direction, sortFieldId }, handleSortRequest];
}

// we can add other variants here, maybe
