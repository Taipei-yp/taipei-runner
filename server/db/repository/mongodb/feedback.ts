import { mongoConnection } from "../../connections";

const feedbackRepository = () => {
  const add = (feedbackMessage: unknown) => {
    return mongoConnection
      .db("taipei-runner")
      .collection("feedback")
      .insertOne(feedbackMessage);
  };

  return { add };
};

export { feedbackRepository };
