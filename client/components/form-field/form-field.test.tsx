import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { FormField } from ".";

describe("Component FormField", () => {
  const formField = TestRenderer.create(
    <FormField labelText="test">
      <input type="text" />
    </FormField>,
  );

  it("correct render", () => {
    expect(formField.toJSON()).toMatchSnapshot();
  });
});
