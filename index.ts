import fs from "fs";
import https from "https";
import { app, initDadabases } from "./dist/server.js";

const key = fs.readFileSync("./ssl/key.pem");
const cert = fs.readFileSync("./ssl/cert.pem");

const server = https.createServer({ key, cert }, app);

const port = process.env.PORT || 4000;

initDadabases()
  .finally(() => {
    server.listen({ port, host: "local.ya-praktikum.tech" }, () => {
      console.log("Application is started on localhost:", port);
    });
  })
  .catch(error => console.log(`taipei-error:${error}`));
