import Redis, { Redis as RedisClient } from "ioredis";
//
import cacheConfig from "@config/cache";
import ICacheProvider from "../models/ICacheProvider";

export default class RedisCache implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.redis);
  }

  public async save(key: string, value: string | number): Promise<void> {
    await this.client.set(key, value);
  }
  public async get(key: string): Promise<string | undefined> {
    return await this.client.get(key);
  }
  public async invalidade(key: string): Promise<void> {
    await this.client.del(key);
  }
  public async invalidadePrefix(prefix: string): Promise<void> {
    const stream = this.client.scanStream({ match: `${prefix}:*` });
    stream.on("data", resultKeys => {
      // `resultKeys` is an array of strings representing key names.
      // Note that resultKeys may contain 0 keys, and that it will sometimes
      // contain duplicates due to SCAN's implementation in Redis.
      if (resultKeys.length) {
        resultKeys.forEach(key => this.client.unlink(key));
      }
    });
  }
}
