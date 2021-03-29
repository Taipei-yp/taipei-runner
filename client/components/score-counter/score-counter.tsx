import block from "bem-cn";
import React, { FC, memo } from "react";

import "./score-counter.css";

const b = block("score-counter");

export type Props = {
  score: number;
};

const ScoreCounter: FC<Props> = ({ score }) => (
  <span className={b()}>{score}</span>
);

const WrappedScoreCounter = memo(ScoreCounter);
export { WrappedScoreCounter as ScoreCounter };
