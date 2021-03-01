import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { ScoreCounter } from "client/components/score-counter";
import { environment } from "client/enviroment";
import Runner from "client/game-engine/runner";
import {
  leaderboardInit,
  saveScore,
} from "client/redux/leaderboard/leaderboard-actions";

import "./game.css";

const b = block("game");

type Props = {
  className?: string;
};

const Game: FC<Props> = ({ className = "" }) => {
  const [score, setScore] = useState(0);
  const [
    isBackgroundAnimationActive,
    setIsBackgroundAnimationActive,
  ] = useState(false);

  const dispatch = useDispatch();

  const sendScore = useCallback(
    (gameScore: number) => {
      dispatch(saveScore(gameScore));
    },
    [dispatch],
  );

  const gameRunningToggle = useCallback(
    (running: boolean) => {
      setIsBackgroundAnimationActive(running);
      dispatch(leaderboardInit());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(leaderboardInit());

    const runner = new Runner(
      "#runner",
      setScore,
      gameRunningToggle,
      sendScore,
    );
    runner.init();

    return () => runner.close();
  }, [gameRunningToggle, sendScore, dispatch]);
  return (
    <>
      <Meta title={`${environment.title} | Game`} />
      <Page
        left={<LinkView to="/" label="Menu" size="xl" />}
        right={<ScoreCounter score={score} />}
        fullHeight
        fullWidth
        align="stretch"
        animateBack={isBackgroundAnimationActive}
      >
        <div className={b.mix(className)} id="runner">
          <canvas className={b("canvas")} />
        </div>
      </Page>
    </>
  );
};

const WrappedGame = memo(Game);
export { WrappedGame as Game };
