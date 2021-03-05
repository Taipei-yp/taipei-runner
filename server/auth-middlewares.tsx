import { NextFunction, Request, Response } from "express";
import { setUserAuth, setUserInfo, userIsAuth } from "server/helpers";
import { profileApi } from "client/api";
import { ServerUser } from "client/models/user";

export async function checkAuthCkookieMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authCookie } = req.cookies;
    if (authCookie) {
      setUserAuth(res);
      let user: ServerUser = { id: -1, login: "" };
      try {
        const api = profileApi();
        const profileRes = await api.getProfile();
        user = profileRes.data;
      } catch (error) {
        console.log(`Failed to load user data: ${error}`);
      }
      setUserInfo(res, user);
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
  res.status(401).send("You are not authorized for api requests");
}
