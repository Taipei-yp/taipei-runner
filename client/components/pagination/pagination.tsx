import React, { FC, memo, useCallback, MouseEvent } from "react";
import block from "bem-cn";
import "./pagination.css";

const b = block("pagination");

type Props = {
  pagesCount: number;
  currentPage: number;
  onPageClick: (pageNumber: number) => void;
  onGoToFirstPageClick?: () => void;
  onGoToLastPageClick?: () => void;
};

const Pagination: FC<Props> = ({
  pagesCount,
  currentPage,
  onPageClick,
  onGoToFirstPageClick,
  onGoToLastPageClick,
}) => {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      const { pageNumber } = event.currentTarget.dataset;
      onPageClick(Number.parseInt(pageNumber!, 10));
    },
    [onPageClick],
  );

  return (
    <ul className={b()}>
      <li className={b("item")} onClick={onGoToFirstPageClick}>
        {"<<"}
      </li>
      {Array(pagesCount)
        .fill("")
        .map((_, i) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={b("item", { active: i + 1 === currentPage })}
            data-page-number={i + 1}
            onClick={handleClick}
          >
            {i + 1}
          </li>
        ))}
      <li className={b("item")} onClick={onGoToLastPageClick}>
        {">>"}
      </li>
    </ul>
  );
};

const WrappedPagination = memo(Pagination);
export { WrappedPagination as Pagination };
