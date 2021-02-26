import { MongoClient } from "mongodb";
import { Sequelize } from "sequelize-typescript";
import { mongoConfig, psqlConfig } from "./configs";
import SiteTheme from "./models_psql/site-theme";
import UserTheme from "./models_psql/user-theme";

const psqlConnection = new Sequelize(psqlConfig);
psqlConnection.addModels([UserTheme, SiteTheme]);

const mongoConnection = new MongoClient(mongoConfig);

async function initDadabases() {
  return Promise.allSettled([psqlConnection.sync(), mongoConnection.connect()]);
}
export { initDadabases, mongoConnection, psqlConnection };
