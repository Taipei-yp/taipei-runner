import React from "react";
import TestRenderer from "react-test-renderer";
import { ThemeSelect } from ".";

describe("Component ThemeSelect", () => {
  const text = TestRenderer.create(<ThemeSelect className="testclass" />);

  it("correct render", () => {
    expect(text.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(text.root.props.className).toBe("testclass");
  });
});
