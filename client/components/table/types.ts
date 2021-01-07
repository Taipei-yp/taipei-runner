export type TableSort = {
  field: string | null;
  direction: SortDirection | null;
};

export type SortDirection = "asc" | "desc";

export type SortRequestHandler = (field: string) => void;
