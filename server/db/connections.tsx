import { MongoClient } from "mongodb";
import { Sequelize } from "sequelize-typescript";
import { mongoConfig, psqlConfig } from "./configs";
import { SiteThemesData } from "./initial-data";
import SiteTheme from "./schemes/site-theme";
import User from "./schemes/user";
import UserTheme from "./schemes/user-theme";

const psqlConnection = new Sequelize(psqlConfig);
psqlConnection.addModels([UserTheme, SiteTheme, User]);

SiteTheme.afterSync(() => {
  SiteThemesData.forEach(v => {
    SiteTheme.findOrCreate({
      where: {
        theme: v.theme,
      },
      defaults: {
        description: v.description,
        delete: false,
      },
    });
  });
});

const mongoConnection = new MongoClient(mongoConfig);

export { mongoConnection, psqlConnection };
