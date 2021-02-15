import { Request, Response } from "express";

const ServerCookieManager = (req: Request, res: Response) => {
  const get = (name: string) => req.cookies[name];

  const getAll = () => req.cookies;

  const set = (name: string, value: string, days = 7) => {
    const maxAge = days * 24 * 60 * 60 * 1000;
    res.cookie(name, value, { maxAge });
  };

  return { get, getAll, set };
};

export { ServerCookieManager };
