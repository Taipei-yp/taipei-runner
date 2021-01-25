import React from "react";
import TestRenderer from "react-test-renderer";
import { Heading } from ".";

describe("Component Heading", () => {
  const heading = TestRenderer.create(
    <Heading text="testtext" className="testclass" />,
  );

  it("correct render", () => {
    expect(heading.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(heading.root.props.className).toBe("testclass");
  });
});
