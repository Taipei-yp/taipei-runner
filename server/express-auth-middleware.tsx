import { NextFunction, Request, Response } from "express";
import { profileApi } from "client/api";
import { AuthKey } from "client/service/cookie/types";
import { ServerCookieManager } from "./server-cookie-manager";

function expressAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { get, set } = ServerCookieManager(req, res);
  const authCookie = get(AuthKey);
  if (!authCookie || authCookie !== "AUTH") {
    profileApi()
      .getProfile()
      .then(apiRes => {
        if (apiRes.status === 200) {
          set(AuthKey, "AUTH");
        }
      });
  }
  next();
}

export default expressAuthMiddleware;
