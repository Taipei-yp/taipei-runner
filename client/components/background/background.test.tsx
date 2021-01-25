import React from "react";
import TestRenderer from "react-test-renderer";
import { Background } from ".";

describe("Component Background", () => {
  const background = TestRenderer.create(<Background />);
  it("correct render", () => {
    expect(background.toJSON()).toMatchSnapshot();
  });
});
