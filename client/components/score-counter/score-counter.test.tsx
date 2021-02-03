import React from "react";
import TestRenderer from "react-test-renderer";
import { ScoreCounter } from ".";

describe("Component ScoreCounter", () => {
  const scoreCounter = TestRenderer.create(<ScoreCounter score={1000} />);

  it("correct render", () => {
    expect(scoreCounter.toJSON()).toMatchSnapshot();
  });
});
