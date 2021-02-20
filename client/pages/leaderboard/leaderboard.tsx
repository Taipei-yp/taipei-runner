import block from "bem-cn";
import React, { FC, memo } from "react";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Pagination, useDefaultPagination } from "client/components/pagination";
import { Panel } from "client/components/panel";
import { Table, useNullableTableSort } from "client/components/table";
import { User } from "client/components/user";
import { environment } from "client/enviroment";

import "./leaderboard.css";

const b = block("leaderboard");

type Props = {
  className?: string;
};

const headers = [
  { title: "#", field: "rank" },
  { title: "User", field: "user" },
  { title: "Score", field: "score" },
];

// TODO: remove this mock data after API connected
const data = [
  { id: 0, rank: 1, user: { avatar: undefined, name: "user 1" }, score: 99999 },
  { id: 1, rank: 2, user: { avatar: undefined, name: "user 2" }, score: 99992 },
  { id: 2, rank: 3, user: { avatar: undefined, name: "user 3" }, score: 99991 },
  { id: 3, rank: 4, user: { avatar: undefined, name: "user 4" }, score: 99990 },
  { id: 4, rank: 5, user: { avatar: undefined, name: "user 5" }, score: 99990 },
];

const pagesCount = 7;
const visiblePagesCount = 5;

const Leaderboard: FC<Props> = ({ className }) => {
  const [sort, handleSortRequest] = useNullableTableSort();

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
          <Panel className={b("panel")}>
            <Table
              className={b("table")}
              headers={headers}
              data={data}
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
          </Panel>
        </div>
      </Page>
    </>
  );
};

const WrappedLeaderboard = memo(Leaderboard);
export { WrappedLeaderboard as Leaderboard };
