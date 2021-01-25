import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Input } from ".";

describe("Component Input", () => {
  const onChange = jest.fn();
  const input = TestRenderer.create(
    <Input
      value="testvalue"
      name="testname"
      className="testclass"
      fullWidth
      onChange={onChange}
    />,
  );

  it("correct render", () => {
    expect(input.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(input.root.props.className).toBe("testclass");
  });

  it("onchange work", () => {
    act(input.root.props.onChange);
    expect(onChange).toBeCalledTimes(1);
  });
});
