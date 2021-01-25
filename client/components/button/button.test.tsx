import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Button } from ".";

describe("Component Button", () => {
  const onClick = jest.fn();
  const button = TestRenderer.create(
    <Button
      viewType="secondary"
      className="testclass"
      type="submit"
      onClick={onClick}
    >
      test button
    </Button>,
  );

  it("correct render", () => {
    expect(button.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(button.root.props.className).toBe("testclass");
  });

  it("onclick work", () => {
    act(button.root.props.onClick);
    expect(onClick).toBeCalledTimes(1);
  });
});
