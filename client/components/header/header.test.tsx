import React from "react";
import TestRenderer from "react-test-renderer";
import { Header } from ".";

describe("Component Header", () => {
  const header = TestRenderer.create(<Header className="testclass" />);

  it("correct render without childs", () => {
    expect(header.toJSON()).toMatchSnapshot();
  });

  it("correct render with childs", () => {
    expect(header.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(header.root.props.className).toBe("testclass");
  });
});
