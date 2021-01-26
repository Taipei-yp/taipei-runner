import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { FormView } from ".";

describe("Component FormView", () => {
  const onSubmit = jest.fn();
  const formView = TestRenderer.create(
    <FormView fields={[]} onSubmit={onSubmit} />,
  );

  it("correct render", () => {
    expect(formView.toJSON()).toMatchSnapshot();
  });

  it("onsubmit work", () => {
    act(formView.root.props.onSubmit);
    expect(onSubmit).toBeCalledTimes(1);
  });
});
