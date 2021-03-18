import { Request, Response } from "express";

const feedbackService = () => {
  const addMessage = (req: Request, res: Response) => {
    return res.status(200).send(req.body);
  };
  return { addMessage };
};
export { feedbackService };
