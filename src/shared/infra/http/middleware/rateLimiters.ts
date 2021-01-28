import { Request, Response, NextFunction } from "express";
import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
//
import AppError from "@shared/errors/AppError";
import cacheConfig from "@config/cache";

const redisClient = redis.createClient(cacheConfig.redis);

const globalLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "globalLimiter",
  points: 6,
  duration: 1,
});

const filesLimiter = new RateLimiterRedis({
  // File limiter should have higher points since a single request may need a lot
  // assets.
  storeClient: redisClient,
  keyPrefix: "filesLimiter",
  points: 30,
  duration: 1,
});

export async function filesRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await filesLimiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new AppError("Please wait before trying again.", 429);
  }
}

export default async function globalRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await globalLimiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new AppError("Please wait before trying again.", 429);
  }
}
