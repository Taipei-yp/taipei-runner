import { NextFunction, Request, Response } from "express";

function expressAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authCookie } = req.cookies;
    if (authCookie) {
      res.locals.userIsAuth = true;
    }
  } catch (err) {
    console.log(err);
  }
  next();
}

export default expressAuthMiddleware;
