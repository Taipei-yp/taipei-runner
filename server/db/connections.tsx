import { MongoClient } from "mongodb";
import { Sequelize } from "sequelize-typescript";
import { mongoConfig, psqlConfig } from "./configs";
import SiteTheme from "./models/schemes/site-theme";
import User from "./models/schemes/user";
import UserTheme from "./models/schemes/user-theme";

const psqlConnection = new Sequelize(psqlConfig);
psqlConnection.addModels([UserTheme, SiteTheme, User]);

const mongoConnection = new MongoClient(mongoConfig);

export { mongoConnection, psqlConnection };
