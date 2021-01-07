import React, { FC, memo, useEffect, useRef, useState } from "react";
import block from "bem-cn";

import "./game.css";
import Runner from "../../game-engine/runner";
import { Page } from "../../components/page";
import { LinkView } from "../../components/link-view";
import { ScoreCounter } from "../../components/score-counter";

const b = block("game");

type Props = {
  className?: string;
};

const Game: FC<Props> = ({ className = "" }) => {
  const [score, setScore] = useState(0);
  const runnerRef = useRef(new Runner("#runner", setScore));
  useEffect(() => {
    runnerRef.current.init();
  }, []);
  return (
    <Page
      left={<LinkView to="/menu" label="Menu" size="xl" />}
      right={<ScoreCounter score={score} />}
      fullHeight
      fullWidth
      align="bottom"
    >
      <div className={b.mix(className)} id="runner">
        <canvas className={b("canvas")} />
      </div>
    </Page>
  );
};

const WrappedGame = memo(Game);
export { WrappedGame as Game };
