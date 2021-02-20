import block from "bem-cn";
import React, { FC, memo, useEffect, useState } from "react";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { ScoreCounter } from "client/components/score-counter";
import { environment } from "client/enviroment";
import Runner from "client/game-engine/runner";

import "./game.css";

const b = block("game");

type Props = {
  className?: string;
};

const Game: FC<Props> = ({ className = "" }) => {
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const runner = new Runner("#runner", setScore, setRunning);
    runner.init();

    return () => runner.close();
  }, []);
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
