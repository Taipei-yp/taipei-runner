import React from "react";
import TestRenderer from "react-test-renderer";
import { UserInfo } from "client/utils/ui-types";
import { User } from ".";

describe("Component User", () => {
  const testUser: UserInfo = {
    name: "testname",
    avatar: "/testsrc",
  };
  const user = TestRenderer.create(<User value={testUser} />);

  it("correct render", () => {
    expect(user.toJSON()).toMatchSnapshot();
  });
});
