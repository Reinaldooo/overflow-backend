import "reflect-metadata";
import express from "express";
//
import routes from "./routes";
import "./db";

const server = express();
server.use(express.json());
server.use(routes);

server.listen(4000, () => {
  console.log("✅  Server up");
});
