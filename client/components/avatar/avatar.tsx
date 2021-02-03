import block from "bem-cn";
import React, { FC, memo } from "react";
import defaultAvatar from "client/assets/images/default-avatar.png";

import "./avatar.css";

const b = block("avatar");

export type Props = {
  className?: string;
  size?: "large";
  src?: string | null;
  alt?: string;
};

const Avatar: FC<Props> = ({
  size = null,
  className = "",
  alt = "",
  src = defaultAvatar,
}) => {
  return (
    <div className={b({ size }).mix(className)}>
      <img src={src || defaultAvatar} className={b("image")} alt={alt} />
    </div>
  );
};

const WrappedAvatar = memo(Avatar);
export { WrappedAvatar as Avatar };
