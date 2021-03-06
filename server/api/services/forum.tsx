import { Request, Response } from "express";
import { messageRepository, topicRepository } from "../../db/repository/psql";
import { userRepository } from "../../db/repository/psql/user";
import { userInfo } from "../../helpers";
import { ServerUser } from "../../user-model";

const topicRepo = topicRepository();
const messageRepo = messageRepository();
const userRepo = userRepository();

const forumService = () => {
  const getTopics = (_req: Request, res: Response) => {
    topicRepo
      .getAll()
      .then(topics => res.status(200).json(topics))
      .catch(err => res.status(500).json({ error: ["db error", err] }));
  };

  const getTopic = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      res.status(400).json({
        error: {
          type: "request parameter error",
          data: "incorrect id parameter",
        },
      });
    }

    topicRepo
      .get(Number(id))
      .then(topics => res.status(200).json(topics))
      .catch(err => res.status(500).json({ error: ["db error", err] }));
  };

  const addTopic = (req: Request, res: Response) => {
    const { name, message } = req.body;

    const isTopicValid = name.length > 2;
    const isMessageValid = message.length > 2;

    if (!isTopicValid || !isMessageValid) {
      res.status(400).json({
        error: {
          type: "request parameter error",
          data: "incorrect topic or message length",
        },
      });
    }

    userRepo.updateOrCreateAndGet(userInfo(res)).then(user => {
      if (!user) {
        throw new Error("Can not update or update user");
      }
      return topicRepo
        .add(name, message, user.toJSON() as ServerUser)
        .then(topic => {
          res.status(200).send(topic);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: { type: "db error", data: JSON.stringify(err) } });
        });
    });
  };

  const replyToMessage = (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!id || Number.isNaN(Number(id)) || !text || text.length < 3) {
      res.status(400).json({
        error: {
          type: "request parameter error",
          data: "incorrect parameters parameter",
        },
      });
    }

    userRepo.updateOrCreateAndGet(userInfo(res)).then(user => {
      if (!user) {
        throw new Error("Can not create user");
      }

      return messageRepo
        .add(Number(id), text, (user.toJSON() as ServerUser).id)
        .then(message => {
          res.status(200).send(message);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: { type: "db error", data: JSON.stringify(err) } });
        });
    });
  };

  const addMessageLike = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      res.status(400).json({
        error: {
          type: "request parameter error",
          data: "incorrect id parameter",
        },
      });
    }

    return messageRepo
      .addLike(Number(id))
      .then(message => {
        res.status(200).send(message);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: { type: "db error", data: JSON.stringify(err) } });
      });
  };

  return { getTopics, getTopic, addTopic, replyToMessage, addMessageLike };
};
export { forumService };
