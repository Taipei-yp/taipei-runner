import MessageTable from "../../schemes/message";
import TopicTable from "../../schemes/topic";

const topicRepository = () => {
  const add = (name: string, message: string, _user_id: number) => {
    return TopicTable.create({ name })
      .then(topicRecord => {
        return Promise.all([
          topicRecord,
          topicRecord.$create("message", { text: message }),
        ]);
      })
      .then(([topic, msg]) => ({ ...topic.toJSON(), message: msg.toJSON() }));
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
        include: [{ model: MessageTable, include: [MessageTable] }],
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
