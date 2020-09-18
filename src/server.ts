import "reflect-metadata";
import express from "express";
//
import routes from "./routes";
import "./db";
import { uploadsDir } from "@config/upload";

const server = express();
server.use(express.json());
server.use("/files", express.static(uploadsDir));
server.use(routes);

server.listen(4000, () => {
  console.log("✅  Server up");
});
