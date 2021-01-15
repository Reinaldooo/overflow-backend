import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import { errors } from "celebrate";
//
import routes from "./routes";
import { uploadsDirConfig } from "@config/upload";
import AppError from "@shared/errors/AppError";

import "@shared/infra/typeorm";
import "@shared/container";

const server = express();

server.use(express.json());
server.use(cors());
server.use("/files", express.static(uploadsDirConfig.destination));
server.use(routes);

// Treat 'celebrate' pkg errors
server.use(errors());

server.use((e: Error, req: Request, res: Response, next: NextFunction) => {
  // Catch all unhandled errors
  if (e instanceof AppError)
    // If it's an custom error, send it, but if not, send a generic message
    return res.status(e.statusCode).json({
      status: "Error",
      message: e.message,
    });
  console.error("‼️‼️‼️‼️");
  console.error(e);
  return res.status(500).json({
    status: "Error",
    message: "Internal server error.",
  });
});

server.listen(process.env.BACKEND_PORT, () => {
  console.log("✅  Server up");
});
