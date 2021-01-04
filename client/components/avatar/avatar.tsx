import React, { FC, memo } from "react";
import block from "bem-cn";

import defaultAvatar from "../../assets/images/default-avatar.png";

import "./avatar.css";

const b = block("avatar");

export type Props = {
  alt?: string;
  src?: string;
  className?: string;
  size?: "large";
};

const Avatar: FC<Props> = ({
  size = null,
  className = "",
  alt = "",
  src = defaultAvatar,
}) => {
  return (
    <div className={b({ size }).mix(className)}>
      <img src={src} className={b("image")} alt={alt} />
    </div>
  );
};

const WrappedAvatar = memo(Avatar);
export { WrappedAvatar as Avatar };
