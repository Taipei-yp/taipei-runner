import { useCallback, useMemo, useState } from "react";

export function useDefaultPagination(
  allPagesCount: number,
  suggestedVisiblePagesCount = allPagesCount,
  initialPage = 1,
) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const visiblePagesCount = useMemo(() => {
    return Math.min(allPagesCount, suggestedVisiblePagesCount);
  }, [allPagesCount, suggestedVisiblePagesCount]);

  const [firstVisible, lastVisible] = getVisibleRange(
    allPagesCount,
    currentPage,
    visiblePagesCount,
  );

  const canGoToPrevPage = canGoPrev(currentPage);
  const canGoToNextPage = canGoNext(currentPage, allPagesCount);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(currPage => {
      if (canGoPrev(currPage)) {
        return currPage - 1;
      }
      return currPage;
    });
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(currPage => {
      if (canGoNext(currPage, allPagesCount)) {
        return currPage + 1;
      }
      return currPage;
    });
  }, [allPagesCount]);

  return {
    currentPage,
    firstVisiblePage: firstVisible,
    lastVisiblePage: lastVisible,
    canGoToPrevPage,
    canGoToNextPage,
    goToPage: setCurrentPage,
    goToPrevPage,
    goToNextPage,
  };
}

function getVisibleRange(
  allPagesCount: number,
  currentPage: number,
  visiblePagesCount: number,
) {
  const minFirst = 1;
  const maxLast = allPagesCount;

  let first = currentPage - Math.floor(visiblePagesCount / 2);
  let last = first + visiblePagesCount - 1;

  if (first < minFirst) {
    last += minFirst - first;
    first = minFirst;
  } else if (last > maxLast) {
    first -= last - maxLast;
    last = maxLast;
  }

  return [first, last];
}

function canGoPrev(currentPage: number): boolean {
  return currentPage > 1;
}

function canGoNext(currentPage: number, allPagesCount: number): boolean {
  return currentPage < allPagesCount;
}
