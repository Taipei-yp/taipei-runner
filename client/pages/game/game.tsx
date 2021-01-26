import block from "bem-cn";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { ScoreCounter } from "client/components/score-counter";
import Runner from "client/game-engine/runner";

import "./game.css";

const b = block("game");

type Props = {
  className?: string;
};

const Game: FC<Props> = ({ className = "" }) => {
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const runnerRef = useRef(new Runner("#runner", setScore, setRunning));
  useEffect(() => {
    const runner = runnerRef.current;
    runner.init();

    return () => runner.close();
  }, []);
  return (
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
  );
};

const WrappedGame = memo(Game);
export { WrappedGame as Game };
