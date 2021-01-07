import React, { FC, memo } from "react";
import block from "bem-cn";
import { Page } from "../../components/page";
import { Text } from "../../components/text";
import { Heading } from "../../components/heading";
import "./error.css";
import { LinkView } from "../../components/link-view";

const b = block("error-page");
const maxLenght = 6;
const score = 100;
const highscore = 200;

type Props = {
  className?: string;
};

const GameOver: FC<Props> = ({ className = "" }) => {
  return (
    <>
      <Page left={<LinkView to="/menu" label="menu" />}>
        <div className={b.mix(className)}>
          <Heading
            text="Game Over"
            size="l"
            color="accent"
            className={b("title")}
          />
          <Text
            text={`Your score: ${score.toString().padStart(maxLenght, "0")}`}
            size="xxl"
            className={b("score")}
          />
          <Text
            text={`Your highscore: ${highscore
              .toString()
              .padStart(maxLenght, "0")}`}
            size="xxl"
            className={b("highscore")}
            color="primary"
          />
        </div>
      </Page>
    </>
  );
};

const WrappedGameOver = memo(GameOver);
export { WrappedGameOver as GameOver };
