import { Request, Response } from "express";
import { feedbackRepository } from "../../db/repository/mongodb";
import { userInfo } from "../../helpers";

const feedbackRepo = feedbackRepository();
const feedbackService = () => {
  const addMessage = (req: Request, res: Response) => {
    const { body } = req;
    const user = userInfo(res);

    feedbackRepo.add({ ...body, user }).then(() => {
      return res.status(200).send("Ok");
    });
  };
  return { addMessage };
};
export { feedbackService };
