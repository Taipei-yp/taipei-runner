import React, { FC, memo, useCallback, MouseEvent } from "react";
import block from "bem-cn";
import "./pagination.css";
import { arrayFromTo } from "../../utils/array-utils";

const b = block("pagination");

type Props = {
  className?: string;
  firstPage: number;
  lastPage: number;
  currentPage: number;
  canGoToNextPage: boolean;
  canGoToPrevPage: boolean;
  onPageClick: (pageNumber: number) => void;
  onGoToPrevPageClick?: () => void;
  onGoToNextPageClick?: () => void;
};

const Pagination: FC<Props> = ({
  className,
  firstPage,
  lastPage,
  currentPage,
  canGoToNextPage,
  canGoToPrevPage,
  onPageClick,
  onGoToPrevPageClick,
  onGoToNextPageClick,
}) => {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      const { pageNumber } = event.currentTarget.dataset;
      onPageClick(Number.parseInt(pageNumber!, 10));
    },
    [onPageClick],
  );

  return (
    <ul className={b.mix(className)}>
      <li
        className={b("item", { disabled: !canGoToPrevPage })}
        onClick={onGoToPrevPageClick}
      >
        {"<"}
      </li>
      {arrayFromTo(firstPage, lastPage).map(page => (
        <li
          key={page}
          className={b("item", { active: page === currentPage })}
          data-page-number={page}
          onClick={handleClick}
        >
          {page}
        </li>
      ))}
      <li
        className={b("item", { disabled: !canGoToNextPage })}
        onClick={onGoToNextPageClick}
      >
        {">"}
      </li>
    </ul>
  );
};

const WrappedPagination = memo(Pagination);
export { WrappedPagination as Pagination };
