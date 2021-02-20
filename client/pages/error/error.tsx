import block from "bem-cn";
import React, { FC, memo } from "react";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Text } from "client/components/text";
import { environment } from "client/enviroment";

import "./error.css";

const b = block("error-page");

type Props = {
  className?: string;
  title?: string;
  description?: string;
};

const Error: FC<Props> = ({ className = "", title = "", description = "" }) => (
  <>
    <Meta title={`${environment.title} | Error`} />
    <Page left={<LinkView to="/" label="Menu" size="xl" />}>
      <div className={b.mix(className)}>
        <Heading text={title} size="l" color="accent" className={b("title")} />
        <Text text={description} size="xxl" className={b("description")} />
      </div>
    </Page>
  </>
);

const WrappedError = memo(Error);
export { WrappedError as Error };
