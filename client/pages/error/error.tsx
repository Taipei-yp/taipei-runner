import React, { FC, memo } from "react";
import block from "bem-cn";
import { Page } from "../../components/page";
import { Text } from "../../components/text";
import { Heading } from "../../components/heading";
import { LinkView } from "../../components/link-view";

import "./error.css";

const b = block("error-page");

type Props = {
  className?: string;
  title?: string;
  description?: string;
};

const Error: FC<Props> = ({ className = "", title = "", description = "" }) => (
  <Page left={<LinkView to="/" label="Menu" size="xl" />}>
    <div className={b.mix(className)}>
      <Heading text={title} size="l" color="accent" className={b("title")} />
      <Text text={description} size="xxl" className={b("description")} />
    </div>
  </Page>
);

const WrappedError = memo(Error);
export { WrappedError as Error };
