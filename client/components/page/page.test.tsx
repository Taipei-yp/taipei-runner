import React from "react";
import TestRenderer from "react-test-renderer";
import { Page } from ".";

describe("Component Page", () => {
  const page = TestRenderer.create(<Page className="testclass" />);

  it("correct props", () => {
    expect(page.root.props.className).toBe("testclass");
  });

  it("correct render without childs", () => {
    expect(page.toJSON()).toMatchSnapshot();
  });
});
