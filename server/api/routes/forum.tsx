import { Router } from "express";
import { isAuthMiddleware } from "../../auth-middlewares";
import { forumService } from "../services";

export const forumRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const service = forumService();
  router.get("/", isAuthMiddleware, service.getAll());
  apiRouter.use("/forum", router);
};
