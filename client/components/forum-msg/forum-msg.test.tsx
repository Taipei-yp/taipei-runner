import React from "react";
import TestRenderer from "react-test-renderer";
import { Msg } from "client/models/msg";
import { ForumMsg } from ".";

describe("Component ForumMsg", () => {
  const testMgs: Msg = {
    id: 1,
    author: {
      firstName: "test name",
      lastName: "test name",
      avatar: "/avarar",
    },
    createdAt: "12.12.2020",
    text: "test text",
  };

  const forumMsg = TestRenderer.create(<ForumMsg msg={testMgs} />);

  it("correct render", () => {
    expect(forumMsg.toJSON()).toMatchSnapshot();
  });
});
