import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Button } from ".";

describe("Component Button", () => {
  let onClickCall = false;
  const clickFunc = () => {
    onClickCall = true;
  };
  const button = TestRenderer.create(
    <Button
      viewType="secondary"
      className="testclass"
      type="submit"
      onClick={clickFunc}
    >
      test button
    </Button>,
  );

  it("correct render", () => {
    expect(button.toJSON()).toMatchSnapshot();
  });
  it("correct props", () => {
    expect(button.root.props.viewType).toBe("secondary");
    expect(button.root.props.className).toBe("testclass");
    expect(button.root.props.type).toBe("submit");
  });
  it("onclick work", () => {
    act(button.root.props.onClick);
    expect(onClickCall).toBe(true);
  });
});
