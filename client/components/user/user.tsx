import block from "bem-cn";
import React, { FC, memo } from "react";
import { Avatar } from "../avatar";
import { Text } from "../text";
import { UserInfo } from "./types";

import "./user.css";

const b = block("user");

type Props = {
  value: UserInfo;
};

const User: FC<Props> = ({ value }) => {
  return (
    <div className={b()}>
      <Avatar className={b("avatar")} src={value.avatar} />
      <Text text={value.name} size="l" />
    </div>
  );
};

const WrappedUser = memo(User);
export { WrappedUser as User };
