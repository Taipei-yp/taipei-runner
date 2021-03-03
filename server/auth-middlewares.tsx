import { NextFunction, Request, Response } from "express";
import { setUserAuth, userIsAuth } from "./helpers";

export function checkAuthCkookieMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authCookie } = req.cookies;
    if (authCookie) {
      setUserAuth(res);
    }
  } catch (err) {
    console.log(err);
  }
  next();
}
export function isAuthMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (userIsAuth(res)) next();
  res.statusCode = 401;
}
