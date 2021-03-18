import { Request, Response } from "express";

const feedbackService = () => {
  const addMessage = (_req: Request, res: Response) => {
    return res.status(200).send("ok");
  };
  return { addMessage };
};
export { feedbackService };
