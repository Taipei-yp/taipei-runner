import React from "react";
import TestRenderer from "react-test-renderer";
import { Background } from ".";

describe("Component Background", () => {
  const avatar = TestRenderer.create(<Background />);
  it("correct render", () => {
    expect(avatar.toJSON()).toMatchSnapshot();
  });
});
