import React, { FC, memo } from "react";
import block from "bem-cn";
import { formatScore } from "../../utils/format-score";

import "./score-counter.css";

const b = block("score-counter");

export type Props = {
  score: number;
};

const ScoreCounter: FC<Props> = ({ score }) => {
  return <span className={b()}>Score {formatScore(score)}</span>;
};

const WrappedScoreCounter = memo(ScoreCounter);
export { WrappedScoreCounter as ScoreCounter };
