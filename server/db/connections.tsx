import { MongoClient } from "mongodb";
import { Sequelize } from "sequelize-typescript";
import { mongoConfig, psqlConfig } from "./configs";
import Message from "./schemes/message";
import SiteTheme from "./schemes/site-theme";
import Topic from "./schemes/topic";
import User from "./schemes/user";
import UserTheme from "./schemes/user-theme";

const psqlConnection = new Sequelize(psqlConfig);

psqlConnection.addModels([UserTheme, SiteTheme, User, Topic, Message]);

const mongoConnection = new MongoClient(mongoConfig);

export { mongoConnection, psqlConnection };
