import block from "bem-cn";
import React, { FC, memo } from "react";
import { Avatar } from "client/components/avatar";
import { Text } from "client/components/text";
import { Msg } from "client/models/msg";

import "./forum-msg.css";

const b = block("forum-msg");

type Props = {
  msg: Msg;
  className?: string;
};

const ForumMsg: FC<Props> = ({ msg, className = "" }) => {
  const { author, text, createdAt } = msg;
  return (
    <div className={b.mix(className)}>
      <div className={b("avatar")}>
        <Avatar alt={`${author.firstName} ${author.lastName} avatar`} />
      </div>

      <div className={b("content")}>
        <div className={b("header")}>
          <Text
            className={b("author")}
            color="light"
            size="s"
            text={`${author.firstName} ${author.lastName}`}
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
      </div>
    </div>
  );
};

const WrapperForumMsg = memo(ForumMsg);
export { WrapperForumMsg as ForumMsg };
