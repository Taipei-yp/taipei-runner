import block from "bem-cn";
import React, { FC, memo } from "react";

import "./forum.css";
import { Table } from "../../components/table";

const b = block("forum");

type Props = {
  className?: string;
};

const TestComponent: FC<{ value: unknown }> = ({ value }) => {
  return <div>{`${value}--${value}`}</div>;
};

const Forum: FC<Props> = ({ className }) => {
  /* right now it's all is just a test of the table component */
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

  return (
    <div className={b.mix(className)}>
      <Table
        headers={headers}
        data={data}
        components={{
          topic: TestComponent,
        }}
        onSortRequest={(field, direction) => console.log(field, direction)}
      />
    </div>
  );
};

const WrappedForum = memo(Forum);
export { WrappedForum as Forum };
