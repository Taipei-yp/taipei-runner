import { mongoConnection, psqlConnection } from "./connections";

async function initDadabases() {
  return Promise.allSettled([psqlConnection.sync(), mongoConnection.connect()]);
}
export { initDadabases, mongoConnection, psqlConnection };
