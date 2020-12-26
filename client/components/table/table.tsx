import React, {
  ComponentType,
  memo,
  useCallback,
  MouseEvent,
  useState,
} from "react";
import block from "bem-cn";

import "./table.css";

const b = block("table");

type Props<TData extends WithId> = {
  className?: string;
  headers: Array<HeaderInfo<TData>>;
  data: TData[];
  components?: Partial<Record<keyof TData, InnerComponent>>;
  onSortRequest?: (
    field: keyof TData | null,
    direction: SortDirection | null,
  ) => void;
};

type HeaderInfo<TData extends WithId> = {
  title: string;
  field: keyof TData;
};

type WithId = {
  id: unknown;
  [key: string]: unknown;
};

type InnerComponent = ComponentType<{ value: unknown }>;

type SortDirection = "asc" | "desc";

const TextRenderer = (({ value }) => value) as InnerComponent;

function Table<TData extends WithId>({
  className,
  headers,
  data,
  components = {},
  onSortRequest = () => {},
}: Props<TData>) {
  const allComponents = headers.reduce((acc, header) => {
    acc[header.field] = components[header.field] ?? TextRenderer;
    return acc;
  }, {} as Record<keyof TData, InnerComponent>);

  let DataComponent: InnerComponent;

  const [sort, setSort] = useState(null as null | string);

  const handleHeadClick = useCallback(
    (event: MouseEvent) => {
      const { field } = (event.target as HTMLTableSectionElement).dataset;

      // updating sort: null -> asc -> desc -> null -> asc -> ...
      setSort(prevSort => {
        if (prevSort) {
          const [prevField, prevDirection] = prevSort.split("-");

          if (prevField === field && prevDirection === "asc") {
            onSortRequest(field, "desc");
            return `${field}-desc`;
          }

          if (prevField === field && prevDirection === "desc") {
            onSortRequest(null, null);
            return null;
          }
        }

        onSortRequest(field as keyof TData, "asc");
        return `${field}-asc`;
      });
    },
    [onSortRequest],
  );

  return (
    <table className={b.mix(className)}>
      <thead>
        <tr onClick={handleHeadClick}>
          {headers.map(header => (
            <td key={header.field as string} data-field={header.field}>
              {header.title}
              {/* TODO: change visual effects for sorting */}
              {sort === `${header.field}-asc` && <span>+</span>}
              {sort === `${header.field}-desc` && <span>-</span>}
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
}

const WrappedTable = memo(Table);
export { WrappedTable as Table };
