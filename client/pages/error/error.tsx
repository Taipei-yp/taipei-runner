import React, { FC, memo } from "react";
import block from "bem-cn";

import "./error.css";
import { Page } from "../../components/page";
import { Text } from "../../components/text";

const b = block("error-page");

type Props = {
  className?: string;
  title?: string;
  description?: string;
};

const Error: FC<Props> = ({ className = "", title = "", description = "" }) => {
  return (
    <>
      <Page left={<Text text="menu" />}>
        <div className={b.mix(className)}>
          <Text
            isHeader
            text={title}
            size="extra3"
            color="accent"
            className={b("title")}
          />
          <Text text={description} size="extra2" className={b("description")} />
        </div>
      </Page>
    </>
  );
};

const WrappedError = memo(Error);
export { WrappedError as Error };
