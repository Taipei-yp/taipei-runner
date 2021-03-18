import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "client/components/button";
import { FormView, FormViewField } from "client/components/form-view";
import { Heading } from "client/components/heading";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { environment } from "client/enviroment";
import { addTopic, init } from "client/redux/forum/forum-actions";
import { forumSelector } from "client/redux/forum/forum-selectors";
import { ForumStages } from "client/redux/forum/forum-stages";

const b = block("forum-topic-create");

type Props = {
  className: string;
};

const FormFields: FormViewField[] = [
  {
    labelText: "Topic",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "name",
    elementType: "input",
  },
  {
    labelText: "Message",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "message",
    elementType: "textarea",
  },
];

const ForumTopicCreate: FC<Props> = ({ className }: Props) => {
  const { stage, error, topic } = useSelector(forumSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  const formSubmit = useCallback(
    ({ name, message }: { name: string; message: string }) => {
      dispatch(addTopic(name, message));
    },
    [dispatch],
  );

  const content = useMemo(() => {
    switch (stage) {
      case ForumStages.LOADING:
        return <p>Loading...</p>;
      case ForumStages.FAILURE:
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
      case ForumStages.LOADED:
        if (topic) {
          return <Redirect to={`/forum/topic/${topic.id}`} />;
        }
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>Something went wrong</p>
            <Button onClick={reset} viewType="secondary">
              Try again
            </Button>
          </div>
        );
      default:
        return (
          <Panel>
            <Heading
              color="accent"
              text="Create topic"
              className={b("heading")}
            />
            <FormView onSubmit={formSubmit} fields={FormFields} />
          </Panel>
        );
    }
  }, [error, stage, formSubmit, reset, topic]);

  return (
    <>
      <Meta title={`${environment.title} | Create topic`} />
      <Page fixHeader fullHeight align="center">
        <div className={b.mix(className)}>{content}</div>
      </Page>
    </>
  );
};

const WrappedForumTopicCreate = memo(ForumTopicCreate);
export { WrappedForumTopicCreate as ForumTopicCreate };
