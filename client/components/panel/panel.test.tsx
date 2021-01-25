import React from "react";
import TestRenderer from "react-test-renderer";
import { Panel } from ".";

describe("Component Panel", () => {
  const panel = TestRenderer.create(
    <Panel className="testclass">
      <div>ChildrenComponent</div>
    </Panel>,
  );

  it("correct render", () => {
    expect(panel.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(panel.root.props.className).toBe("testclass");
  });
});
