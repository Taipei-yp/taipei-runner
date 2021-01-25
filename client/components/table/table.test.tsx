import React from "react";
import TestRenderer from "react-test-renderer";
import { Table } from "client/components/table/table";

describe("Component Table", () => {
  it("renders table by data and headers", () => {
    const headers = [
      {
        title: "FIRST-FIELD",
        field: "firstField",
      },
      {
        title: "SECOND-FIELD",
        field: "secondField",
      },
    ];
    const data = [
      {
        id: 0,
        firstField: 1,
        secondField: "1",
      },
      {
        id: 1,
        firstField: 2,
        secondField: "2",
      },
      {
        id: 2,
        firstField: 3,
        secondField: "3",
      },
    ];
    const component = TestRenderer.create(
      <Table headers={headers} data={data} />,
    );
    expect(component).toMatchSnapshot();
  });

  it("renders empty table for empty data", () => {
    const component = TestRenderer.create(<Table headers={[]} data={[]} />);
    expect(component).toMatchSnapshot();
  });
});
