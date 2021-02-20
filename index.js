const { app } = require("./dist/server.js");
const fs = require("fs");
const https = require("https");

const key = fs.readFileSync("./ssl/key.pem");
const cert = fs.readFileSync("./ssl/cert.pem");

const server = https.createServer({ key: key, cert: cert }, app);

const port = process.env.PORT || 4000;

server.listen({ port, host: "local.ya-praktikum.tech" }, () => {
  console.log("Application is started on localhost:", port);
});
