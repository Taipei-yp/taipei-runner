import block from "bem-cn";
import React, { ComponentType, memo, MouseEvent, useCallback } from "react";
import { TableSort } from "client/utils/ui-types";

import "./table.css";

const b = block("table");

type Props<TData extends WithId> = {
  className?: string;
  headers: Array<HeaderInfo<TData>>;
  data: TData[];
  components?: Partial<Record<keyof TData, InnerComponent>>;
  sort?: TableSort;
  onHeaderClick?: (field: string) => void;
};

type HeaderInfo<TData extends WithId> = {
  title: string;
  field: keyof TData;
};

type WithId = {
  id: unknown;
  [key: string]: unknown;
};

// TODO: research react component generic types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InnerComponent = ComponentType<{ value: any }>;

const TextRenderer = (({ value }) => value) as InnerComponent;

const Table = <TData extends WithId>({
  className,
  headers,
  data,
  components = {},
  sort = { field: null, direction: null },
  onHeaderClick = () => {},
}: Props<TData>) => {
  const allComponents = headers.reduce((acc, { field }) => {
    acc[field] = components[field] ?? TextRenderer;
    return acc;
  }, {} as Record<keyof TData, InnerComponent>);

  let DataComponent: InnerComponent;

  const handleHeadClick = useCallback(
    (event: MouseEvent) => {
      const { field } = (event.target as HTMLTableSectionElement).dataset;
      onHeaderClick(field!);
    },
    [onHeaderClick],
  );

  return (
    <table className={b.mix(className)}>
      <thead>
        <tr onClick={handleHeadClick}>
          {headers.map(header => (
            <td key={header.field as string} data-field={header.field}>
              {header.title}
              {sort.field === header.field && (
                <span className={b("sort-direction")}>
                  {sort.direction === "asc" ? "▼" : "▲"}
                </span>
              )}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(datum => (
          <tr key={datum.id as string}>
            {headers.map(header => (
              <td key={`${datum.id}-${header.field}`}>
                {
                  ((DataComponent = allComponents[header.field]),
                  (<DataComponent value={datum[header.field]} />))
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const WrappedTable = memo(Table);
export { WrappedTable as Table };
