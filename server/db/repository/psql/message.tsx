import MessageTable from "../../schemes/message";

const messageRepository = () => {
  const get = (parentId: number) => {
    return MessageTable.findAll({
      where: { parent_id: parentId },
      // deep = 2
      include: { model: MessageTable, include: [MessageTable] },
    });
  };

  const add = (parentId: number, text: string, user_id: number) => {
    return MessageTable.findByPk(parentId).then(parent => {
      if (!parent) {
        throw new Error("Can not find message to reply");
      }

      return parent.$create("reply", { text, user_id });
    });
  };

  const addLike = (id: number) => {
    return MessageTable.findByPk(id).then(message => {
      return message?.increment("likes");
    });
  };

  return {
    get,
    add,
    addLike,
  };
};

export { messageRepository };
