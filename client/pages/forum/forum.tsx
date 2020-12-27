import block from "bem-cn";
import React, { FC, memo } from "react";
import { Pagination } from "../../components/pagination";
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

const Forum: FC<Props> = ({ className }) => {
  /* right now it all is just a test of the table component */
  const [sort, handleSortRequest] = useNullableTableSort();

  return (
    <div className={b.mix(className)}>
      <Table
        headers={headers}
        data={data}
        components={{
          topic: TestComponent,
        }}
        sort={sort}
        onHeaderClick={handleSortRequest}
      />
      <Pagination pagesCount={5} currentPage={3} onPageClick={() => {}} />
    </div>
  );
};

const WrappedForum = memo(Forum);
export { WrappedForum as Forum };
