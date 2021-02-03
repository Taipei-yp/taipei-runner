import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { PrivateRoute } from ".";

describe("Component PrivateRoute", () => {
  const testComponent = () => <div>Component</div>;

  it("redirect if user is not authenticated", () => {
    const history = createMemoryHistory();
    history.push("/");
    TestRenderer.create(
      <Router history={history}>
        <PrivateRoute path="/" component={testComponent} auth={false} />
      </Router>,
    );
    expect(history.location.pathname).toBe("/signin");
  });

  it("render if user is authenticated", () => {
    const history = createMemoryHistory();
    history.push("/");
    const testrouter = TestRenderer.create(
      <Router history={history}>
        <PrivateRoute path="/" component={testComponent} auth />
      </Router>,
    );
    expect(testrouter.toJSON()).toMatchSnapshot();
  });
});
