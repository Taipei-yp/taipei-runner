import { Message, Topic } from "client/models/forum";
import { api } from "./api";

const path = `/forum`;

const forumApi = () => {
  const { client } = api(true);

  const getTopics = () => {
    return client
      .get<Topic[]>(`${path}/topic`, {
        withCredentials: true,
      })
      .then(resp => resp.data);
  };

  const getTopic = (id: number) => {
    return client
      .get<Topic>(`${path}/topic/${id}`, {
        withCredentials: true,
      })
      .then(resp => resp.data);
  };

  const addTopic = (name: string, message: string) => {
    return client
      .post<Topic>(
        `${path}/topic`,
        { name, message },
        {
          withCredentials: true,
        },
      )
      .then(resp => resp.data);
  };

  const replyToMessage = (messageId: number, text: string) => {
    return client
      .post<Message>(
        `${path}/message/${messageId}/reply`,
        { text },
        {
          withCredentials: true,
        },
      )
      .then(resp => resp.data);
  };

  return {
    getTopics,
    getTopic,
    addTopic,
    replyToMessage,
  };
};

export { forumApi };
