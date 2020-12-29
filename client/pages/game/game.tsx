import React, { FC, memo, useEffect } from "react";
import block from "bem-cn";

import "./game.css";
import Runner from "../../game-engine/runner";

const b = block("game");

type Props = {
  className?: string;
};

const Game: FC<Props> = ({ className = "" }) => {
  useEffect(() => {
    const runner = new Runner("#runner");
    runner.init();
  });
  return (
    <div className={b.mix(className)} id="runner">
      <canvas className={b("canvas")} />
    </div>
  );
};

const WrappedGame = memo(Game);
export { WrappedGame as Game };
