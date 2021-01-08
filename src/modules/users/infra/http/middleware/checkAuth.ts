import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
//
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface DecodedToken {
  iat: number;
  exp: number;
  id: string;
}

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Missing token");

  // Bearer tokenstring
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.phrase);
    const { id } = decoded as DecodedToken;
    // The "as" notation makes sure a variable is treated as the choosen type
    req.userId = id;
    // Including userId into req obj to be used later
  } catch (error) {
    throw new AppError("Invalid token");
  }
  return next();
}
