import React, { ComponentType, memo, useCallback, MouseEvent } from "react";
import block from "bem-cn";
import { TableSort } from "./table-sort";
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
  columnId: keyof TData;
};

type WithId = {
  id: unknown;
  [key: string]: unknown;
};

type InnerComponent = ComponentType<{ value: unknown }>;

const TextRenderer = (({ value }) => value) as InnerComponent;

function Table<TData extends WithId>({
  className,
  headers,
  data,
  components = {},
  sort = { sortFieldId: null, direction: null },
  onHeaderClick = () => {},
}: Props<TData>) {
  // С появлением api вот это преобразование уедет в парсер.
  // Мемоизация тут может поломать сортировку в теории<div className=""></div>
  const allComponents = headers.reduce((acc, { columnId }) => {
    acc[columnId] = components[columnId] ?? TextRenderer;
    return acc;
  }, {} as Record<keyof TData, InnerComponent>);

  // Лучше не мутирвоать какой то внешний объект из map, а создать функцию
  // getDataComponent или renderDataComponent.
  let DataComponent: InnerComponent;

  const handleHeadClick = useCallback(
    (event: MouseEvent) => {
      const { field } = (event.target as HTMLTableSectionElement).dataset;
      onHeaderClick(field!);
    },
    [onHeaderClick],
  );

  const { sortFieldId, direction } = sort;

  return (
    <table className={b.mix(className)}>
      <thead>
        <tr onClick={handleHeadClick}>
          {headers.map(({ columnId, title }) => (
            // Не надо делать as string, если ты считаешь, что здесь должна быть строка
            // Лучше приводить значение к строке.
            <td key={String(columnId)} data-field={columnId}>
              {title}
              {/* TODO: change visual effects of sorting */}
              {/** Выглядит очень громоздно, лучше вынести это в функцию с ранним выходом */}
              {sortFieldId === columnId && direction === "asc" && (
                <span>+</span>
              )}

              {/** Эти проверки можно превратить в мапу Record<Direction, Symbol>. И если есть значение отдаем симфол, если нет, то не рисуем ничего. */}
              {sortFieldId === columnId && direction === "desc" && (
                <span>-</span>
              )}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(datum => (
          <tr key={String(datum.id)}>
            {headers.map(({ columnId }) => (
              <td key={`${datum.id}-${columnId}`}>
                {
                  ((DataComponent = allComponents[columnId]),
                  (<DataComponent value={datum[columnId]} />))
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
