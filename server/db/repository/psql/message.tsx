import MessageTable from "../../schemes/message";

const messageRepository = () => {
  const get = (parentId: number) => {
    return MessageTable.findAll({
      where: { parent_id: parentId },
      // deep = 2
      include: { model: MessageTable, include: [MessageTable] },
    });
  };

  const add = (parentId: number, text: string, _user_id: number) => {
    return MessageTable.findByPk(parentId).then(parent => {
      if (!parent) {
        console.log("parent not found");
        throw new Error("Can not find message to reply");
      }
      console.log(parent);

      return parent.$create("reply", { text });
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
