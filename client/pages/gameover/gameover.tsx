import block from "bem-cn";
import React, { FC, memo } from "react";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Text } from "client/components/text";
import { formatScore } from "client/utils/format-score";

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
