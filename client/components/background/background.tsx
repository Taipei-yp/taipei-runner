import block from "bem-cn";
import React, { FC, memo } from "react";

import "./background.css";

const b = block("background");

export type Props = {
  shade?: boolean;
  animate?: boolean;
};

const Background: FC<Props> = ({ shade = false, animate = true }) => {
  return <div className={b({ shade, animate })} />;
};

const WrappedBackground = memo(Background);
export { WrappedBackground as Background };
