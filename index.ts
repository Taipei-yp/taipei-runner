import fs from "fs";
import https from "https";
import http from "http";
import { app, initDatabases } from "./dist/server.js";

let server = http.createServer(app);

if (process.env.NODE_ENV === "development") {
  const key = fs.readFileSync("./ssl/key.pem");
  const cert = fs.readFileSync("./ssl/cert.pem");
  server = https.createServer({ key, cert }, app);
}

const port = process.env.PORT || 4000;

initDatabases()
  .finally(() => {
    server.listen({ port }, () => {
      console.log("Application is started on localhost:", port);
    });
  })
  .catch(error => console.log(`taipei-error:${error}`));
