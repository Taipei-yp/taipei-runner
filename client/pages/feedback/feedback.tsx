import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "client//components/text";
import { Button } from "client/components/button";
import { FormView, FormViewField } from "client/components/form-view";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { environment } from "client/enviroment";
import { init, sendFeedback } from "client/redux/feedback/feedback-actions";
import { feedbackSelector } from "client/redux/feedback/feedback-selectors";
import { FeedbackStages } from "client/redux/feedback/feedback-stages";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  const handleSubmit = useCallback(
    formValue => {
      dispatch(
        sendFeedback({
          createdAt: Date.now(),
          topic: formValue.topic,
          message: formValue.message,
        }),
      );
    },
    [dispatch],
  );

  const { stage, error } = useSelector(feedbackSelector);
  console.log(stage);
  console.log(error);

  const content = useMemo(() => {
    switch (stage) {
      case FeedbackStages.LOADING:
        return <p>Loading...</p>;
      case FeedbackStages.FAILURE:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={error} />
            </p>
            <Button onClick={reset} viewType="secondary">
              Try again
            </Button>
          </div>
        );
      case FeedbackStages.LOADED:
        return (
          <div>
            <Heading text="Success" color="primary" />
            <p>Thanks for your feedback</p>
            <Button onClick={reset} viewType="secondary">
              Send again
            </Button>
          </div>
        );
      default:
        return (
          <Panel>
            <Heading
              color="accent"
              text="Contact us"
              className={b("heading")}
            />
            <FormView
              className={b("feedback-form")}
              onSubmit={handleSubmit}
              fields={FeedbackFields}
              fullWidth
              align="center"
            />
          </Panel>
        );
    }
  }, [error, stage, handleSubmit, reset]);

  return (
    <>
      <Meta title={`${environment.title} | Feedback`} />
      <Page
        fullHeight
        fixHeader
        align="center"
        left={<LinkView to="/" label="Menu" size="xl" />}
      >
        <div className={b.mix(className)}>{content}</div>
      </Page>
    </>
  );
};

const WrappedFeedback = memo(Feedback);
export { WrappedFeedback as Feedback };
