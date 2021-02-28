import { MongoClient } from "mongodb";
import { Sequelize } from "sequelize-typescript";
import { mongoConfig, psqlConfig } from "./configs";
import SiteTheme from "./models/psql/site-theme";
import User from "./models/psql/user";
import UserTheme from "./models/psql/user-theme";

const psqlConnection = new Sequelize(psqlConfig);
psqlConnection.addModels([UserTheme, SiteTheme, User]);

const mongoConnection = new MongoClient(mongoConfig);

async function initDadabases() {
  return Promise.allSettled([psqlConnection.sync(), mongoConnection.connect()]);
}
export { initDadabases, mongoConnection, psqlConnection };
