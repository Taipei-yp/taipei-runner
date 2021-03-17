import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "client/components/button";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Meta } from "client/components/meta";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Table, useNullableTableSort } from "client/components/table";
import { Text } from "client/components/text";
import { environment } from "client/enviroment";
import { loadTopics } from "client/redux/forum/forum-actions";
import { forumSelector } from "client/redux/forum/forum-selectors";
import { ForumStages } from "client/redux/forum/forum-stages";

import "./forum.css";

const b = block("forum");

type Props = {
  className?: string;
};

const TopicComponent: FC<{ value: { id: number; name: string } }> = ({
  value,
}) => {
  const { id, name } = value;
  return <LinkView to={`/forum/topic/${id}`} label={name} size="l" />;
};

const CreatedAtComponent: FC<{ value: unknown }> = ({ value }) => {
  const date = new Date(value as string);
  return <Text size="l" text={`${date.toLocaleDateString()}`} />;
};

const headers = [
  { title: "Topics", field: "topic" },
  { title: "Created at", field: "createdAt" },
];

const Forum: FC<Props> = ({ className }) => {
  const [sort, handleSortRequest] = useNullableTableSort();

  const history = useHistory();

  const handleCreateTopicClick = useCallback(() => {
    history.push("/forum/topic/new");
  }, [history]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTopics());
  }, [dispatch]);

  const { stage, error, topics } = useSelector(forumSelector);

  const content = useMemo(() => {
    switch (stage) {
      case ForumStages.FAILURE:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={error} />
            </p>
          </div>
        );
      case ForumStages.LOADED:
        return (
          <Panel className={b("panel")}>
            <section className={b("table")}>
              <Table
                headers={headers}
                data={
                  topics.map(({ id, name, ...t }) => ({
                    ...t,
                    id,
                    topic: { id, name },
                  })) || []
                }
                components={{
                  topic: TopicComponent,
                  createdAt: CreatedAtComponent,
                }}
                sort={sort}
                onHeaderClick={handleSortRequest}
              />
            </section>
            <section className={b("create-topic")}>
              <Button onClick={handleCreateTopicClick}>Create Topic</Button>
            </section>
          </Panel>
        );
      default:
        return <p>Loading...</p>;
    }
  }, [error, stage, topics, handleCreateTopicClick, handleSortRequest, sort]);

  return (
    <>
      <Meta title={`${environment.title} | Forum`} />
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

const WrappedForum = memo(Forum);
export { WrappedForum as Forum };
