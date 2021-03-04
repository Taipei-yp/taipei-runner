import { Request, Response } from "express";
import {
  siteThemeRepository,
  userThemeRepository,
} from "server/db/repository/psql";
import { userInfo } from "server/helpers";

const userThemeRep = userThemeRepository();

const themeService = () => {
  const getAll = (_req: Request, res: Response) => {
    siteThemeRepository()
      .getAll()
      .then(themes => {
        res.status(200).json(themes);
      })
      .catch(err => res.status(500).json({ error: ["db error", err] }));
  };
  const getUserTheme = (_req: Request, res: Response) => {
    const user = userInfo(res);
    return userThemeRep
      .getByUserId(user.id)
      .then(data => res.status(200).json(data?.toJSON()))
      .catch(err =>
        res
          .status(500)
          .json({ error: { type: "db-error", data: JSON.stringify(err) } }),
      );
  };
  const updateUserTheme = (_req: Request, res: Response) => {
    const user = userInfo(res);
    return 1;
  };
  return { getAll, getUserTheme, updateUserTheme };
};
export { themeService };
