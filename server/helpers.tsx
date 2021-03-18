import { Response } from "express";
import { ServerUser } from "server/user-model";

export function userIsAuth(res: Response) {
  return !!res.locals.userIsAuth;
}

export function setUserAuth(res: Response) {
  res.locals.userIsAuth = true;
}

export function userInfo(res: Response) {
  return res.locals.userInfo as ServerUser;
}

export function setUserInfo(res: Response, user: ServerUser) {
  res.locals.userInfo = user;
}
