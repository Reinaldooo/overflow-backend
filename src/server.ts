import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
//
import routes from "./routes";
import "./db";
import { uploadsDir } from "@config/upload";
import AppError from "./errors/AppError";

const server = express();

server.use(express.json());
server.use(cors());
server.use("/files", express.static(uploadsDir));
server.use(routes);

server.use((e: Error, req: Request, res: Response, next: NextFunction) => {
  // Catch all unhandled errors
  if (e instanceof AppError)
    // If it's an custom error, send it, but if not, send a generic message
    return res.status(e.statusCode).json({
      status: "Error",
      message: e.message,
    });
  console.error("‼️‼️‼️‼️", e);
  return res.status(500).json({
    status: "Error",
    message: "Internal server error.",
  });
});

server.listen(4000, () => {
  console.log("✅  Server up");
});
