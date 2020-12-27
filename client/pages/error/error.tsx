import React, { FC, memo } from "react";
import block from "bem-cn";

import "./error.css";
import { Page } from "../../components/page";
import { Text } from "../../components/text";

const b = block("error-page");

type Props = {
  className?: string;
  textTop?: string;
  textBott?: string;
};

const Error: FC<Props> = ({ className = "", textTop = "", textBott = "" }) => {
  return (
    <>
      <Page className={b().mix(className)} left={<Text text="menu" />}>
        <Text header text={textTop} size="extra3" color="accent" />
        <Text header text={textBott} size="extra2" />
      </Page>
    </>
  );
};

const WrappedError = memo(Error);
export { WrappedError as Error };
