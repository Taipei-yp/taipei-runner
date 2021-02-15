import { NextFunction, Request, Response } from "express";
import { profileApi } from "../client/api";
import { ServerCookieManager } from "./server-cookie-manager";

const authCookieName = "taipeiauth";

function expressAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { get, set } = ServerCookieManager(req, res);
  const authCookie = get(authCookieName);
  if (!authCookie || authCookie !== "AUTH") {
    profileApi()
      .getProfile()
      .then(apiRes => {
        if (apiRes.status === 200) {
          set(authCookieName, "AUTH");
        }
      });
  }
  next();
}

export default expressAuthMiddleware;
