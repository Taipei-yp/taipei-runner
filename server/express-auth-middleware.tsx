import { NextFunction, Request, Response } from "express";
import { profileApi } from "../client/api";

function expressAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.cookies.taipeiAuth) {
    profileApi()
      .getProfile()
      .then(apiRes => {
        if (apiRes.status === 200) {
          res.cookie("taipeiAuth", "AUTH", {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          });
        }
      });
  }
  next();
}

export default expressAuthMiddleware;
