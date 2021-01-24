import React from "react";
import TestRenderer from "react-test-renderer";
import { Heading } from ".";

describe("Component Heading", () => {
  const heading = TestRenderer.create(
    <Heading text="testtext" color="primary" size="l" className="testclass" />,
  );

  it("correct render", () => {
    expect(heading.toJSON()).toMatchSnapshot();
  });
  it("correct props", () => {
    expect(heading.root.props.color).toBe("primary");
    expect(heading.root.props.size).toBe("l");
    expect(heading.root.props.className).toBe("testclass");
  });
});
