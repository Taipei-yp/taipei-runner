import { MongoClient } from "mongodb";
import { Sequelize } from "sequelize-typescript";
import { mongoConfig, psqlConfig } from "./configs";
import SiteTheme from "./schemes/site-theme";
import User from "./schemes/user";
import UserTheme from "./schemes/user-theme";

const psqlConnection = new Sequelize(psqlConfig);
psqlConnection.addModels([UserTheme, SiteTheme, User]);

const mongoConnection = new MongoClient(mongoConfig);

export { mongoConnection, psqlConnection };
