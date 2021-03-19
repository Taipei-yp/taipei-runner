import { mongoConnection, psqlConnection } from "./connections";
import { createSiteThemes } from "./initial-data";

async function initDatabases() {
  return Promise.allSettled([
    psqlConnection.sync({ alter: true }).then(async () => {
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
export { initDatabases };
