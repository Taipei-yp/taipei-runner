import React from "react";
import TestRenderer from "react-test-renderer";
import { Avatar } from ".";

describe("Component Avatar", () => {
  const avatar = TestRenderer.create(<Avatar src="testpath" />);
  it("correct render", () => {
    expect(avatar.toJSON()).toMatchSnapshot();
  });
});
