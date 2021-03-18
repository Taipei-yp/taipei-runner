import { Router } from "express";
import { isAuthMiddleware } from "../../auth-middlewares";
import { forumService } from "../services";

export const forumRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const service = forumService();
  // router.get("/", isAuthMiddleware, service.getAll());
  router.get("/topic", service.getTopics);
  router.get("/topic/:id", service.getTopic);
  router.post("/topic", service.addTopic);

  router.post("/message/:id/reply", service.replyToMessage);
  router.post("/message/:id/like", service.addMessageLike);

  apiRouter.use("/forum", router);
};
