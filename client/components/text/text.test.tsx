import React from "react";
import TestRenderer from "react-test-renderer";
import { Text } from ".";

describe("Component Text", () => {
  const text = TestRenderer.create(
    <Text text="test" color="light" size="l" className="testclass" />,
  );

  it("correct render", () => {
    expect(text.toJSON()).toMatchSnapshot();
  });
  it("correct props", () => {
    expect(text.root.props.color).toBe("light");
    expect(text.root.props.size).toBe("l");
    expect(text.root.props.className).toBe("testclass");
  });
});
