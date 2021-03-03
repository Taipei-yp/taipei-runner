import { Response } from "express";

export function userIsAuth(res: Response) {
  return !!res.locals.userIsAuth;
}
export function setUserAuth(res: Response) {
  res.locals.userIsAuth = true;
}
