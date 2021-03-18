import { ServerUser } from "../../../user-model";
import MessageTable from "../../schemes/message";
import TopicTable from "../../schemes/topic";
import UserTable from "../../schemes/user";

const topicRepository = () => {
  const add = (name: string, message: string, user: ServerUser) => {
    return TopicTable.create({ name })
      .then(topicRecord => {
        return Promise.all([
          topicRecord,
          topicRecord.$create("message", { text: message, user_id: user.id }),
        ]);
      })
      .then(([topic, msg]) => ({
        ...topic.toJSON(),
        message: { ...msg.toJSON(), author: user },
      }));
  };

  const getAll = () => {
    return TopicTable.findAll({
      include: MessageTable,
    });
  };

  const get = (id: number) => {
    return TopicTable.findByPk(id, {
      // deep = 2
      include: {
        model: MessageTable,
        include: [
          UserTable,
          {
            model: MessageTable,
            include: [{ model: MessageTable, include: [UserTable] }, UserTable],
          },
        ],
      },
    });
  };

  return {
    add,
    get,
    getAll,
  };
};

export { topicRepository };
