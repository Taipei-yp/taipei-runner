import block from "bem-cn";
import React, { FC, memo, useCallback } from "react";
import { Button } from "client/components/button";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Pagination, useDefaultPagination } from "client/components/pagination";
import { Panel } from "client/components/panel";
import { Table, useNullableTableSort } from "client/components/table";

import "./forum.css";

const b = block("forum");

type Props = {
  className?: string;
};

const TestComponent: FC<{ value: unknown }> = ({ value }) => {
  return <LinkView to="/forum/topic/1" label={value as string} size="l" />;
};

const headers = [
  { title: "Topics", field: "topic" },
  { title: "Last Update", field: "lastUpdate" },
  { title: "Replies", field: "repliesCount" },
];

// TODO: remove this mock data
const data = [
  {
    id: 0,
    topic: "First Topic",
    lastUpdate: "11 september 2001",
    repliesCount: 345,
  },
  {
    id: 1,
    topic: "Second Topic",
    lastUpdate: "36 february 2781",
    repliesCount: 3,
  },
];

const pagesCount = 8;
const visiblePagesCount = 5;

const Forum: FC<Props> = ({ className }) => {
  const [sort, handleSortRequest] = useNullableTableSort();

  const handleCreateTopicClick = useCallback(() => {
    console.warn("need to create a new topic!");
  }, []);

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
    <Page
      fullHeight
      fixHeader
      align="center"
      left={<LinkView to="/" label="Menu" size="xl" />}
    >
      <div className={b.mix(className)}>
        <Panel className={b("panel")}>
          <section className={b("table")}>
            <Table
              headers={headers}
              data={data}
              components={{
                topic: TestComponent,
              }}
              sort={sort}
              onHeaderClick={handleSortRequest}
            />
          </section>
          <section className={b("pagination")}>
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
          </section>
          <section className={b("create-topic")}>
            <Button onClick={handleCreateTopicClick}>Create Topic</Button>
          </section>
        </Panel>
      </div>
    </Page>
  );
};

const WrappedForum = memo(Forum);
export { WrappedForum as Forum };
