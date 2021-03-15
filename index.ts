import fs from "fs";
import https from "https";
import { env } from "process";
import { app, initDadabases } from "./dist/server.js";

const server = https.createServer(app);

if (process.env.NODE_ENV === "development") {
  const key = fs.readFileSync("./ssl/key.pem");
  const cert = fs.readFileSync("./ssl/cert.pem");
  server.setSecureContext({ key, cert });
}

const port = process.env.PORT || 4000;

initDadabases()
  .finally(() => {
    server.listen({ port }, () => {
      console.log("Application is started on localhost:", port);
    });
  })
  .catch(error => console.log(`taipei-error:${error}`));
