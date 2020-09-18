import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
//
import authConfig from "@config/auth";

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
  if (!authHeader) throw new Error("Missing token");

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.phrase);
    const { id } = decoded as DecodedToken;
    req.userId = id;
  } catch (error) {
    throw new Error("Invalid token");
  }
  return next();
}
