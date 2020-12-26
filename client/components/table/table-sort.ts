import { useCallback, useState } from "react";

export type TableSort = {
  sortFieldId: string | null;
  direction: SortDirection | null;
};

export type SortDirection = "asc" | "desc";

type SortRequestHandler = (field: string) => void;

export function useNullableTableSort(): [TableSort, SortRequestHandler] {
  const [sort, setSort] = useState({
    // Хорошо бы давать более осмысленные названия переменным
    // Инача от обилия field сложно разобраться в том, что проиходит
    sortFieldId: null,
    direction: null,
  } as TableSort);

  const handleSortRequest = useCallback((fieldId: string) => {
    // updating sort: null -> asc -> desc -> null -> asc -> ...
    setSort(({ sortFieldId, direction: prevDirection }) => {
      if (sortFieldId && sortFieldId === fieldId) {
        switch (prevDirection) {
          case "asc":
            return {
              sortFieldId: fieldId,
              // Direction я бы превратил в enum.
              direction: "asc",
            };
          case "desc":
            return {
              sortFieldId: null,
              // Я правда не очень понимаю почему direction может быть null. Если избавить от этого условия
              // код можно будет сильно упростить.
              direction: null,
            };
          default:
            break;
        }
      }

      return {
        sortFieldId: fieldId,
        direction: "asc",
      };
    });
  }, []);

  return [sort, handleSortRequest];
}

// we can add other variants here, maybe
