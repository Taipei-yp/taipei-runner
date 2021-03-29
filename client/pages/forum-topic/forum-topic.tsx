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
  addMessageLike,
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
  onReplyButtonClick = () => {},
  onLikeButtonClick = () => {},
}: {
  replies: Message[];
  secondary?: boolean;
  onReplyButtonClick?: (message: Message) => void;
  onLikeButtonClick?: (message: Message) => void;
}) => {
  return (
    <>
      {replies.map(msg => (
        <div key={`block${msg.id}`}>
          <ForumMsg
            className={b("reply", { secondary })}
            msg={msg}
            onReplyButtonClick={() => onReplyButtonClick(msg)}
            onLikeButtonClick={() => onLikeButtonClick(msg)}
            disableReplyButton={secondary}
          />
          {msg.reply && (
            <Reply
              onLikeButtonClick={onLikeButtonClick}
              replies={msg.reply}
              secondary
            />
          )}
        </div>
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

  const onReplyButtonClick = useCallback(
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

  const onLikeButtonClick = useCallback(
    message => {
      if (!(topic && message)) {
        return;
      }
      dispatch(addMessageLike(topic.id, message.id));
    },
    [dispatch, topic],
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
          <Panel className={b("panel")}>
            <Heading
              text={topic?.name || "Topic"}
              size="s"
              color="accent"
              className={b("heading")}
            />
            <div className={b("content")}>
              {topic?.message && (
                <ForumMsg
                  onReplyButtonClick={() => onReplyButtonClick(topic?.message)}
                  onLikeButtonClick={() => onLikeButtonClick(topic?.message)}
                  className={b("topic-msg")}
                  msg={topic?.message}
                  disableReplyButton
                />
              )}
              {topic?.message.reply && (
                <Reply
                  replies={topic?.message.reply}
                  onReplyButtonClick={onReplyButtonClick}
                  onLikeButtonClick={onLikeButtonClick}
                />
              )}
              <div ref={formBlockRef}>
                {messageToReply && (
                  <div
                    role="button"
                    tabIndex={0}
                    className={b("message-to-reply")}
                    onClick={() => onReplyButtonClick(messageToReply)}
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
  }, [
    error,
    stage,
    topic,
    formSubmit,
    messageToReply,
    onReplyButtonClick,
    onLikeButtonClick,
  ]);

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
