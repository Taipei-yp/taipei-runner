import http from "http";
import { app, initDadabases } from "./dist/server.js";

const server = http.createServer(app);

const port = process.env.PORT || 4000;

initDadabases()
  .finally(() => {
    server.listen({ port }, () => {
      console.log("Application is started on localhost:", port);
    });
  })
  .catch(error => console.log(`taipei-error:${error}`));
