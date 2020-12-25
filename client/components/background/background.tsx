import React, { FC, memo } from "react";
import block from "bem-cn";

import "./background.css";

const b = block("background");

export type Props = {
  shade: boolean;
};

const Background: FC<Props> = ({ shade = false }) => {
  return <div className={b({ shade })} />;
};

const WrappedBackground = memo(Background);
export { WrappedBackground as Background };
