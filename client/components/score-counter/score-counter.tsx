import React, { FC, memo } from "react";
import block from "bem-cn";

import "./score-counter.css";

const b = block("score-counter");

export type Props = {
  score: number;
  maxLength?: number;
};

const ScoreCounter: FC<Props> = ({ score, maxLength = 6 }) => {
  return (
    <div className={b()}>Score {score.toString().padStart(maxLength, "0")}</div>
  );
};

const WrappedScoreCounter = memo(ScoreCounter);
export { WrappedScoreCounter as ScoreCounter };
