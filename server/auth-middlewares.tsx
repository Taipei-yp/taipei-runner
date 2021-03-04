import { NextFunction, Request, Response } from "express";
import { setUserAuth, setUserInfo, userIsAuth } from "server/helpers";
import { ServerUser } from "server/user-model";
import { api, profileApi } from "client/api";

export async function checkAuthCkookieMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authCookie } = req.cookies;
    if (authCookie) {
      setUserAuth(res);
      const user: ServerUser = { id: -1, login: "" };
      try {
        const apiClient = api().client;
        const profileRes = await apiClient.get<ServerUser>(`/auth/user`, {
          withCredentials: true,
          headers: {
            Cookie: req.headers.cookie,
          },
        });
        user.id = profileRes.data.id || -1;
        user.login = profileRes.data.login;
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
  else {
    res.status(401).send("You are not authorized for api requests");
  }
}
