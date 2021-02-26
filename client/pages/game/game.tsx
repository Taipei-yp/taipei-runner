import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { leaderboardApi } from "client/api";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { ScoreCounter } from "client/components/score-counter";
import { environment } from "client/enviroment";
import Runner from "client/game-engine/runner";
import { profileSelector } from "client/redux/profile/profile-selectors";

import "./game.css";

const b = block("game");

type Props = {
  className?: string;
};

const api = leaderboardApi();

const Game: FC<Props> = ({ className = "" }) => {
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);

  const { user } = useSelector(profileSelector);

  const sendScore = useCallback(
    async (finalScore: number) => {
      const userName =
        user.display_name || `${user.first_name} ${user.second_name}`;
      try {
        await api.saveScore(userName, finalScore);
      } catch {
        // go to error page
      }
    },
    [user.display_name, user.first_name, user.second_name],
  );

  const updateRunning = useCallback(
    newRunning => {
      if (running && !newRunning && score) {
        sendScore(score);
      }
      setRunning(newRunning);
    },
    [running, score, sendScore],
  );

  useEffect(() => {
    const runner = new Runner("#runner", setScore, updateRunning);
    runner.init();

    return () => runner.close();
  }, [sendScore, updateRunning]);
  return (
    <>
      <Meta title={`${environment.title} | Game`} />
      <Page
        left={<LinkView to="/" label="Menu" size="xl" />}
        right={<ScoreCounter score={score} />}
        fullHeight
        fullWidth
        align="stretch"
        animateBack={running}
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
