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
      .then(themes => res.status(200).json(themes))
      .catch(err => res.status(500).json({ error: ["db error", err] }));
  };
  const getUserTheme = (_req: Request, res: Response) => {
    const user = userInfo(res);
    return userThemeRep
      .getByUserId(user.id)
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(500).json({ error: { type: "db error", data: err } }),
      );
  };
  const updateUserTheme = (req: Request, res: Response) => {
    const { themeId } = req.params;
    if (!themeId || Number.isNaN(Number(themeId))) {
      res.status(400).json({
        error: {
          type: "request parameter error",
          data: "incorrect themeId parameter",
        },
      });
    }
    const user = userInfo(res);
    userThemeRep
      .updateByUserId(user.id, Number(themeId))
      .then(() => res.status(200).send("ok"))
      .catch(err =>
        res
          .status(500)
          .json({ error: { type: "db error", data: JSON.stringify(err) } }),
      );
  };
  return { getAll, getUserTheme, updateUserTheme };
};
export { themeService };
