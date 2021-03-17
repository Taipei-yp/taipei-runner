import block from "bem-cn";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormView, FormViewField } from "client/components/form-view";
import { ForumMsg } from "client/components/forum-msg";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { environment } from "client/enviroment";
import { Message } from "client/models/forum";
import {
  failure,
  loadTopic,
  replyToMessage,
} from "client/redux/forum/forum-actions";
import { forumSelector } from "client/redux/forum/forum-selectors";
import { ForumStages } from "client/redux/forum/forum-stages";

import "./forum-topic.css";

const b = block("forum-topic");

type Props = {
  className?: string;
  match: { params: { id: string } };
};

const ReplyFormFields: FormViewField[] = [
  {
    labelText: "Reply",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "text",
    elementType: "textarea",
  },
];

const Reply = ({
  replies,
  secondary = false,
  onMessageClick = () => {},
}: {
  replies: Message[];
  secondary?: boolean;
  onMessageClick?: (message: Message) => void;
}) => {
  return (
    <>
      {replies.map(msg => (
        <>
          <ForumMsg
            className={b("reply", { secondary })}
            msg={{
              ...msg,
              author: {
                phone: "123",
                password: "",
                display_name: "",
                id: 1,
                login: "",
                email: "",
                first_name: "hello",
                second_name: "world",
              },
            }}
            key={msg.id}
            onClick={() => onMessageClick(msg)}
          />
          {msg.reply && <Reply replies={msg.reply} secondary />}
        </>
      ))}
    </>
  );
};

const ForumTopic: FC<Props> = ({ className, match }) => {
  const dispatch = useDispatch();

  const formBlockRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const { id } = match.params;
    if (!id) {
      dispatch(failure("Can not find topic id"));
      return;
    }

    dispatch(loadTopic(Number(id)));
  }, [dispatch, match.params]);

  const { stage, error, topic } = useSelector(forumSelector);

  const [messageToReply, setMessageToReply] = useState<Message | null>(null);

  const formSubmit = useCallback(
    (formValue: { text: string }) => {
      if (!topic) {
        return;
      }
      dispatch(
        replyToMessage(
          topic?.id,
          messageToReply?.id || topic?.message.id,
          formValue.text,
        ),
      );
    },
    [dispatch, messageToReply, topic],
  );

  const onMessageClick = useCallback(
    message => {
      formBlockRef.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });

      if (messageToReply && messageToReply.id === message.id) {
        setMessageToReply(null);
        return;
      }
      setMessageToReply(message);
    },
    [messageToReply, setMessageToReply],
  );

  const content = useMemo(() => {
    switch (stage) {
      case ForumStages.FAILURE:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={error} />
            </p>
          </div>
        );
      case ForumStages.LOADED:
        return (
          <Panel>
            <Heading
              text={topic?.name || "Topic"}
              size="s"
              color="accent"
              className={b("heading")}
            />
            <div className={b("content")}>
              {topic?.message && (
                <ForumMsg
                  className={b("topic-msg")}
                  msg={{
                    ...topic.message,
                    author: {
                      phone: "123",
                      password: "",
                      display_name: "",
                      id: 1,
                      login: "",
                      email: "",
                      first_name: "hello",
                      second_name: "world",
                    },
                  }}
                />
              )}
              {topic?.message.reply && (
                <Reply
                  replies={topic?.message.reply}
                  onMessageClick={onMessageClick}
                />
              )}
              <div ref={formBlockRef}>
                {messageToReply && (
                  <div
                    role="button"
                    tabIndex={0}
                    className={b("message-to-reply")}
                    onClick={() => onMessageClick(messageToReply)}
                  >
                    <p>
                      <Text size="s" color="primary" text="You reply to:" />
                    </p>
                    <p>
                      <q>
                        <Text size="s" text={messageToReply?.text} />
                      </q>
                    </p>
                  </div>
                )}
                <FormView
                  onSubmit={formSubmit}
                  fields={ReplyFormFields}
                  fullWidth
                />
              </div>
            </div>
          </Panel>
        );
      default:
        return <p>Loading...</p>;
    }
  }, [error, stage, topic, formSubmit, messageToReply, onMessageClick]);

  return (
    <>
      <Meta title={`${environment.title} | Topic`} />
      <Page left={<LinkView to="/" label="Menu" size="xl" />}>
        <div className={b.mix(className)}>{content}</div>
      </Page>
    </>
  );
};

const WrappedForumTopic = memo(ForumTopic);
export { WrappedForumTopic as ForumTopic };
