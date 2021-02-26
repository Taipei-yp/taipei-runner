import React from "react";
import { Provider } from "react-redux";
import TestRenderer from "react-test-renderer";
import { configureStore } from "client/redux/store";
import { ScoreCounter } from ".";

describe("Component ScoreCounter", () => {
  const { store } = configureStore();

  const scoreCounter = TestRenderer.create(
    <Provider store={store}>
      <ScoreCounter score={1000} />
    </Provider>,
  );

  it("correct render", () => {
    expect(scoreCounter.toJSON()).toMatchSnapshot();
  });
});
