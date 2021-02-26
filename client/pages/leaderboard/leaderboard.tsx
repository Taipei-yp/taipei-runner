import block from "bem-cn";
import React, { FC, memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "client//components/heading";
import { LeaderboardStages } from "client//redux/leaderboard/leaderboard-stages";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Pagination, useDefaultPagination } from "client/components/pagination";
import { Panel } from "client/components/panel";
import { Table, useNullableTableSort } from "client/components/table";
import { Text } from "client/components/text";
import { User } from "client/components/user";
import { environment } from "client/enviroment";
import { loadLeaderboard } from "client/redux/leaderboard/leaderboard-actions";
import { leaderboardSelector } from "client/redux/leaderboard/leaderboard-selectors";

import "./leaderboard.css";

const b = block("leaderboard");

type Props = {
  className?: string;
};

const headers = [
  { title: "User", field: "login" },
  { title: "Score", field: "taipeirunnerscore" },
];
// TODO can't fetch pagesCount from api :(
const pagesCount = 999;
const visiblePagesCount = 5;

const Leaderboard: FC<Props> = ({ className }) => {
  const [sort, handleSortRequest] = useNullableTableSort();

  const dispatch = useDispatch();

  const { stage, gameResultsData, error } = useSelector(leaderboardSelector);

  const {
    currentPage,
    firstVisiblePage,
    lastVisiblePage,
    canGoToPrevPage,
    canGoToNextPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = useDefaultPagination(pagesCount, visiblePagesCount);

  useEffect(() => {
    dispatch(loadLeaderboard(currentPage - 1));
  }, [dispatch, currentPage]);

  const content = useMemo(() => {
    switch (stage) {
      case LeaderboardStages.FAILURE:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={error} />
            </p>
          </div>
        );
      case LeaderboardStages.LOADED:
        return (
          <>
            <Table
              className={b("table")}
              headers={headers}
              data={gameResultsData || []}
              components={{
                user: User,
              }}
              sort={sort}
              onHeaderClick={handleSortRequest}
            />
            <Pagination
              firstPage={firstVisiblePage}
              lastPage={lastVisiblePage}
              currentPage={currentPage}
              canGoToNextPage={canGoToNextPage}
              canGoToPrevPage={canGoToPrevPage}
              onPageClick={goToPage}
              onGoToPrevPageClick={goToPrevPage}
              onGoToNextPageClick={goToNextPage}
            />
          </>
        );
      default:
        return <p>Loading...</p>;
    }
  }, [
    stage,
    gameResultsData,
    error,
    firstVisiblePage,
    lastVisiblePage,
    currentPage,
    canGoToNextPage,
    canGoToPrevPage,
    goToPage,
    goToPrevPage,
    goToNextPage,
    handleSortRequest,
    sort,
  ]);

  return (
    <>
      <Meta title={`${environment.title} | Leaderboard`} />
      <Page
        fullHeight
        fixHeader
        align="center"
        left={<LinkView to="/" label="Menu" size="xl" />}
      >
        <div className={b.mix(className)}>
          <Panel className={b("panel")}>{content}</Panel>
        </div>
      </Page>
    </>
  );
};

const WrappedLeaderboard = memo(Leaderboard);
export { WrappedLeaderboard as Leaderboard };
