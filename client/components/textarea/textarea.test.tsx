import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Textarea } from ".";

describe("Component Textarea", () => {
  const onChange = jest.fn();
  const textarea = TestRenderer.create(
    <Textarea
      value="testvalue"
      name="testname"
      className="testclass"
      onChange={onChange}
    />,
  );

  it("correct render", () => {
    expect(textarea.toJSON()).toMatchSnapshot();
  });

  it("correct props", () => {
    expect(textarea.root.props.name).toBe("testname");
    expect(textarea.root.props.className).toBe("testclass");
  });

  it("onchange work", () => {
    act(textarea.root.props.onChange);
    expect(onChange).toBeCalledTimes(1);
  });
});
