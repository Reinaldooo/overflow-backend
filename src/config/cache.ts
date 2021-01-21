import { RedisOptions } from "ioredis";

interface ICacheConfig {
  // Only redis for now
  driver: "redis";
  redis: RedisOptions;
}

const redisPort = Number(process.env.REDIS_PORT);

export default {
  driver: "redis",
  redis: {
    host: "localhost",
    port: redisPort,
    password: undefined,
  },
} as ICacheConfig;
