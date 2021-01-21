import Redis, { Redis as RedisClient } from "ioredis";
//
import cacheConfig from "@config/cache";
import ICacheProvider from "../models/ICacheProvider";

export default class RedisCache implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
  public async get(key: string): Promise<string | undefined> {
    return await this.client.get(key);
  }
  public async invalidade(key: string): Promise<void> {}
}
