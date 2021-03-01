import block from "bem-cn";
import React, { FC, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { leaderboardSelector } from "client/redux/leaderboard/leaderboard-selectors";
import { LeaderboardStages } from "client/redux/leaderboard/leaderboard-stages";
import { formatScore } from "client/utils/format-score";

import "./score-counter.css";

const b = block("score-counter");

export type Props = {
  score: number;
};

const ScoreCounter: FC<Props> = ({ score }) => {
  const { stage: leaderboardStage } = useSelector(leaderboardSelector);

  const content = useMemo(() => {
    switch (leaderboardStage) {
      case LeaderboardStages.LOADING:
        return <>Saving</>;
      case LeaderboardStages.FAILURE:
        return <>Failed to save results</>;
      default:
        return <>Score {formatScore(score)}</>;
    }
  }, [leaderboardStage, score]);

  return <span className={b()}>{content}</span>;
};

const WrappedScoreCounter = memo(ScoreCounter);
export { WrappedScoreCounter as ScoreCounter };
