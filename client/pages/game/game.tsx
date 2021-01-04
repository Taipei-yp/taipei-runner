import React, { FC, memo, useEffect, useRef } from "react";
import block from "bem-cn";

import "./game.css";
import Runner from "../../game-engine/runner";
import { Background } from "../../components/background";

const b = block("game");

type Props = {
  className?: string;
};

const Game: FC<Props> = ({ className = "" }) => {
  const runnerRef = useRef(new Runner("#runner"));
  useEffect(() => {
    runnerRef.current.init();
  });
  return (
    <div>
      <Background shade={false} />
      <div className={b.mix(className)} id="runner">
        <canvas className={b("canvas")} />
      </div>
    </div>
  );
};

const WrappedGame = memo(Game);
export { WrappedGame as Game };
