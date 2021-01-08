import React, { FC, memo } from "react";
import block from "bem-cn";
import { Page } from "../../components/page";
import { Text } from "../../components/text";
import { Heading } from "../../components/heading";
import { LinkView } from "../../components/link-view";
import { formatScore } from "../../utils/format-score";

import "./gameover.css";

const b = block("error-page");

const score = 100;
const highscore = 200;

type Props = {
  className?: string;
};

const GameOver: FC<Props> = ({ className = "" }) => (
  <Page left={<LinkView to="/" label="Menu" size="xl" />}>
    <div className={b.mix(className)}>
      <Heading
        text="Game Over"
        size="l"
        color="accent"
        className={b("title")}
      />
      <Text
        text={`Your score: ${formatScore(score)}`}
        size="xxl"
        className={b("score")}
      />
      <Text
        text={`Your highscore: ${formatScore(highscore)}`}
        size="xxl"
        className={b("highscore")}
        color="primary"
      />
    </div>
  </Page>
);

const WrappedGameOver = memo(GameOver);
export { WrappedGameOver as GameOver };
