import { Router } from "express";
import { isAuthMiddleware } from "../../auth-middlewares";
import { feedbackService } from "../services";

export const feedbackRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const service = feedbackService();
  router.post("/", isAuthMiddleware, service.addMessage);
  apiRouter.use("/feedback", router);
};
