import { Response } from "express";

export function userIsAuth(res: Response) {
  return !!res.locals.userIsAuth;
}
export function setUserAuth(res: Response) {
  res.locals.userIsAuth = true;
}
export function userInfo(res: Response) {
  return !!res.locals.userInfo;
}
export function setUserInfo(res: Response, user: unknown) {
  res.locals.userInfo = user;
}
