import block from "bem-cn";
import React, { FC, memo, MouseEvent } from "react";
import { Avatar } from "client/components/avatar";
import { Button } from "client/components/button";
import { Text } from "client/components/text";
import { Message } from "client/models/forum";

import "./forum-msg.css";

const b = block("forum-msg");

type Props = {
  msg: Message;
  className?: string;
  onReplyButtonClick?: (e: MouseEvent) => void;
  onLikeButtonClick?: (e: MouseEvent) => void;
  disableReplyButton?: boolean;
};

const ForumMsg: FC<Props> = ({
  msg,
  className = "",
  onReplyButtonClick,
  onLikeButtonClick,
  disableReplyButton,
}) => {
  const { author, text, createdAt } = msg;
  return (
    <div className={b.mix(className)}>
      <div className={b("avatar")}>
        <Avatar alt={`${author.first_name} ${author.second_name} avatar`} />
      </div>

      <div className={b("content")}>
        <div className={b("header")}>
          <Text
            className={b("author")}
            color="light"
            size="s"
            text={`${author.first_name} ${author.second_name}`}
          />
          <Text
            className={b("created-at")}
            color="light"
            size="s"
            text={createdAt}
          />
        </div>
        <div className={b("body")}>
          <Text className={b("text")} text={text} />
        </div>
        <div className={b("footer")}>
          <Button onClick={onLikeButtonClick} size="s">
            <Text text="&#9829;" />
            <Text text={`(${msg.likes})`} />
          </Button>
          {!disableReplyButton && (
            <Button onClick={onReplyButtonClick} viewType="secondary" size="s">
              <Text text="&#8627;" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const WrapperForumMsg = memo(ForumMsg);
export { WrapperForumMsg as ForumMsg };
