import React, { FC, memo } from "react";
import block from "bem-cn";

import "./button.css";

const b = block("avatar");

export type Props = {
  className?: string;
  size?: "large";
  src: string;
  alt: string;
};

const Avatar: FC<Props> = ({ size = null, className = "", alt = "", src }) => {
  return (
    <div className={b({ size }).mix(className)}>
      <img src={src} className={b("image")} alt={alt} />
    </div>
  );
};

const WrappedAvatar = memo(Avatar);
export { WrappedAvatar as Avatar };
