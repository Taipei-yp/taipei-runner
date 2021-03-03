import UserTheme from "server/db/schemes/user-theme";
import { psqlConnection as conn } from "../../connections";
import SiteTheme from "../../schemes/site-theme";
import { SiteThemeAdd, SiteThemeEdit } from "../models/site-theme";

const siteThemeRepository = () => {
  const addTheme = (data: SiteThemeAdd) => {
    return conn.model(SiteTheme).create({ data, ...{ deteted: false } });
  };
  const editTheme = (id: number, data: SiteThemeEdit) => {
    return conn.model(SiteTheme).update(data, { where: { id } });
  };
  const deleteTheme = (id: number) => {
    return conn.model(SiteTheme).update({ deleted: true }, { where: { id } });
  };
  const getAll = () => {
    return conn.model(SiteTheme).findAll({
      where: {
        deleted: false,
      },
    });
  };

  return {
    addTheme,
    editTheme,
    deleteTheme,
    getAll,
  };
};

export { siteThemeRepository };
