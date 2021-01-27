import { RedisOptions } from "ioredis";

interface ICacheConfig {
  // Only redis for now
  driver: "redis";
  redis: {
    host: string;
    port: number;
    password: string | undefined;
  };
}

export default {
  driver: "redis",
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
  },
} as ICacheConfig;
