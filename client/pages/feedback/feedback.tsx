import block from "bem-cn";
import React, { FC, memo, useCallback } from "react";
import { FormView, FormViewField } from "../../components/form-view";
import { Heading } from "../../components/heading";
import { LinkView } from "../../components/link-view";
import { Page } from "../../components/page";
import { Panel } from "../../components/panel";

import "./feedback.css";

const b = block("feedback");

type Props = {
  className?: string;
};

const FeedbackFields: FormViewField[] = [
  {
    labelText: "Topic",
    pattern: /[\w]+/,
    errorMessage: "Specify the topic",
    type: "text",
    name: "topic",
    elementType: "input",
  },
  {
    labelText: "Message",
    pattern: /[\w]+/,
    errorMessage: "Type your message",
    type: "text",
    name: "message",
    elementType: "textarea",
  },
];

const Feedback: FC<Props> = ({ className }) => {
  const handleSubmit = useCallback(formValue => {
    console.log(formValue);
  }, []);

  return (
    <Page
      fullHeight
      fixHeader
      align="center"
      left={<LinkView to="/menu" label="Menu" size="xl" />}
    >
      <div className={b.mix(className)}>
        <Panel className={b("panel")}>
          <Heading className={b("header")} text="Contact Us" />
          <FormView
            className={b("feedback-form")}
            onSubmit={handleSubmit}
            fields={FeedbackFields}
            fullWidth
            align="center"
          />
        </Panel>
      </div>
    </Page>
  );
};

const WrappedFeedback = memo(Feedback);
export { WrappedFeedback as Feedback };
