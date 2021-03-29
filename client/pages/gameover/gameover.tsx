import block from "bem-cn";
import React, { FC, memo } from "react";
import { useLocation } from "react-router";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Text } from "client/components/text";
import { environment } from "client/enviroment";
import { formatScore } from "client/utils/format-score";

import "./gameover.css";

const b = block("gameover");

type Props = {
  className?: string;
};
type LocationState = {
  gameScore: number;
};

const GameOver: FC<Props> = ({ className = "" }) => {
  const { state } = useLocation<LocationState>();
  const score = state.gameScore;
  return (
    <>
      <Meta title={`${environment.title} | Game over`} />
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
          <div className={b("restart")}>
            <LinkView
              to="/game"
              label="Restart"
              size="xxl"
              className={b("link")}
            />
          </div>
        </div>
      </Page>
    </>
  );
};

const WrappedGameOver = memo(GameOver);
export { WrappedGameOver as GameOver };
