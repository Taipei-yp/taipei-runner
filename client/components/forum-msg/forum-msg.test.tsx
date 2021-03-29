import React from "react";
import TestRenderer from "react-test-renderer";
import { Message } from "client/models/forum";
import { ForumMsg } from ".";

describe("Component ForumMsg", () => {
  const testMgs: Message = {
    id: 1,
    author: {
      first_name: "test name",
      second_name: "test name",
      avatar: "/avarar",
      phone: "123",
      password: "",
      display_name: "",
      id: 1,
      login: "",
      email: "",
    },
    createdAt: "12.12.2020",
    text: "test text",
    parent_id: 1,
    reply: [],
  };

  const forumMsg = TestRenderer.create(<ForumMsg msg={testMgs} />);

  it("correct render", () => {
    expect(forumMsg.toJSON()).toMatchSnapshot();
  });
});
