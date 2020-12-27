import block from "bem-cn";
import React, { FC, memo, useCallback, useState } from "react";
import { Button } from "../../components/button";
import { Pagination } from "../../components/pagination";
import { Panel } from "../../components/panel";
import { Table } from "../../components/table";
import { useNullableTableSort } from "../../components/table/table-sort";
import "./forum.css";

const b = block("forum");

type Props = {
  className?: string;
};

const TestComponent: FC<{ value: unknown }> = ({ value }) => {
  return <div>{`${value}--${value}`}</div>;
};

const headers = [
  { title: "Topics", field: "topic" },
  { title: "Last Update", field: "lastUpdate" },
  { title: "Replies", field: "repliesCount" },
];

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

const pagesCount = 5;

const Forum: FC<Props> = ({ className }) => {
  const [sort, handleSortRequest] = useNullableTableSort();
  const [page, setPage] = useState(1);

  const handleCreateTopicClick = useCallback(() => {
    alert("need to create a new topic!");
  }, []);

  const handlePageClick = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleGoToFirstPageClick = useCallback(() => {
    setPage(1);
  }, []);

  const handleGoToLastPageClick = useCallback(() => {
    setPage(pagesCount);
  }, []);

  return (
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
        <section className={b("under-table")}>
          <Button
            className={b("under-table", "create-topic")}
            onClick={handleCreateTopicClick}
          >
            Create Topic
          </Button>
          <Pagination
            className={b("under-table", "pagination")}
            pagesCount={pagesCount}
            currentPage={page}
            onPageClick={handlePageClick}
            onGoToFirstPageClick={handleGoToFirstPageClick}
            onGoToLastPageClick={handleGoToLastPageClick}
          />
        </section>
      </Panel>
    </div>
  );
};

const WrappedForum = memo(Forum);
export { WrappedForum as Forum };
