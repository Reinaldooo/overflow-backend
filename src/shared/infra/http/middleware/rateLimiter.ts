import { Request, Response, NextFunction } from "express";
import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
//
import AppError from "@shared/errors/AppError";
import cacheConfig from "@config/cache";

const redisClient = redis.createClient(cacheConfig.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "globalLimiter",
  points: 6,
  duration: 1,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new AppError("Please wait before trying again.", 429);
  }
}
