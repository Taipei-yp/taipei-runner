import React from "react";
import TestRenderer from "react-test-renderer";
import { Text } from ".";

describe("Component Text", () => {
  const text = TestRenderer.create(<Text text="test" className="testclass" />);

  it("correct render", () => {
    expect(text.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(text.root.props.className).toBe("testclass");
  });
});
