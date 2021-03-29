import { Router } from "express";
import { isAuthMiddleware } from "../../auth-middlewares";
import { forumService } from "../services";

export const forumRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const service = forumService();

  router.get("/topic", isAuthMiddleware, service.getTopics);
  router.get("/topic/:id", isAuthMiddleware, service.getTopic);
  router.post("/topic", isAuthMiddleware, service.addTopic);

  router.post("/message/:id/reply", isAuthMiddleware, service.replyToMessage);
  router.post("/message/:id/like", isAuthMiddleware, service.addMessageLike);

  apiRouter.use("/forum", router);
};
