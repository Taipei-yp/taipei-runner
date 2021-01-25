import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { LinkView } from ".";

describe("Component LinkView", () => {
  const linkview = TestRenderer.create(
    <Router>
      <LinkView to="/test" label="testlabel" className="testclass" size="l" />
    </Router>,
  );
  it("correct render", () => {
    expect(linkview.toJSON()).toMatchSnapshot();
  });
});
