import { mongoConnection, psqlConnection } from "./connections";
import { createSiteThemes } from "./initial-data";

async function initDadabases() {
  return Promise.allSettled([
    psqlConnection.sync().then(async () => {
      return createSiteThemes();
    }),
    mongoConnection.connect(),
  ]).then(results => {
    results.forEach(result => {
      if (result.status === "rejected") {
        console.log(result.reason);
      }
    });
  });
}
export { initDadabases, mongoConnection, psqlConnection };
