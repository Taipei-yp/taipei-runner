import block from "bem-cn";
import React, { FC, memo, useCallback } from "react";
import { FormView, FormViewField } from "../../components/form-view";
import { ForumMsg } from "../../components/forum-msg";
import { Heading } from "../../components/heading";
import { LinkView } from "../../components/link-view";
import { Page } from "../../components/page";
import { Panel } from "../../components/panel";

import "./forum-topic.css";

const b = block("forum-topic");

type Props = {
  className?: string;
};

const ReplyFormFields: FormViewField[] = [
  {
    labelText: "Reply",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "reply",
    elementType: "textarea",
  },
];

const ForumTopicData = {
  topic: "First Topic",
  lastUpdate: "13 october 2020",
  repliesCount: 345,
  msg: {
    id: 0,
    author: {
      firstName: "FirstName",
      lastName: "LastName",
      avatar:
        "https://www.alesagglo-expo.com/wp-content/uploads/2014/07/avatar-temp.png",
    },
    createdAt: "13 october 2020",
    text:
      "Hi guys, I found a bug - your game does not work and does not start and is generally very bad. Hi guys, I found a bug - your game does not work and does not start and is generally very bad.",
  },
  replies: [
    {
      id: 1,
      author: {
        firstName: "FirstName1",
        lastName: "LastName2",
        avatar:
          "https://www.alesagglo-expo.com/wp-content/uploads/2014/07/avatar-temp.png",
      },
      createdAt: "13 october 2020",
      text:
        "Hi guys, I found a bug - your game does not work and does not start and is generally very bad. Hi guys, I found a bug - your game does not work and does not start and is generally very bad.",
    },
    {
      id: 2,
      author: {
        firstName: "FirstName2",
        lastName: "LastName2",
        avatar:
          "https://www.alesagglo-expo.com/wp-content/uploads/2014/07/avatar-temp.png",
      },
      createdAt: "13 october 2020",
      text:
        "Hi guys, I found a bug - your game does not work and does not start and is generally very bad. Hi guys, I found a bug - your game does not work and does not start and is generally very bad.",
    },
    {
      id: 3,
      author: {
        firstName: "FirstName3",
        lastName: "LastName3",
        avatar:
          "https://www.alesagglo-expo.com/wp-content/uploads/2014/07/avatar-temp.png",
      },
      createdAt: "13 october 2020",
      text:
        "Hi guys, I found a bug - your game does not work and does not start and is generally very bad. Hi guys, I found a bug - your game does not work and does not start and is generally very bad.",
    },
  ],
};

const ForumTopic: FC<Props> = ({ className }) => {
  const formSubmit = useCallback((formValue: { reply: string }) => {
    console.log(formValue);
  }, []);

  return (
    <Page left={<LinkView to="/" label="Menu" size="xl" />}>
      <div className={b.mix(className)}>
        <Panel>
          <Heading
            text={ForumTopicData.topic}
            size="s"
            color="accent"
            className={b("heading")}
          />
          <div className={b("content")}>
            <ForumMsg className={b("topic-msg")} msg={ForumTopicData.msg} />
            {ForumTopicData.replies.map(msg => (
              <ForumMsg className={b("reply")} msg={msg} key={msg.id} />
            ))}
            <FormView
              onSubmit={formSubmit}
              fields={ReplyFormFields}
              fullWidth
            />
          </div>
        </Panel>
      </div>
    </Page>
  );
};

const WrappedForumTopic = memo(ForumTopic);
export { WrappedForumTopic as ForumTopic };
