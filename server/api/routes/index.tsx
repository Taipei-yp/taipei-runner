import { Router } from "express";
import { feedbackRouter } from "./feedback";
import { forumRouter } from "./forum";
import { themeRouter } from "./theme";

const apiRouter: Router = Router();

feedbackRouter(apiRouter);
forumRouter(apiRouter);
themeRouter(apiRouter);

export default apiRouter;
