import { mongoConnection, psqlConnection } from "./connections";
import { createSiteThemes } from "./initial-data";

async function initDadabases() {
  return Promise.allSettled([
    psqlConnection.sync().then(async () => {
      return createSiteThemes();
    }),
    mongoConnection.connect(),
  ]);
}
export { initDadabases, mongoConnection, psqlConnection };
