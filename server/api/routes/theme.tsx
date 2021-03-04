import { Router } from "express";
import { isAuthMiddleware } from "../../auth-middlewares";
import { themeService } from "../services";

export const themeRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const service = themeService();
  router.get("/", isAuthMiddleware, service.getAll);
  router.get("/user", isAuthMiddleware, service.getUserTheme);
  router.post("/user", isAuthMiddleware, service.updateUserTheme);
  apiRouter.use("/theme", router);
};
