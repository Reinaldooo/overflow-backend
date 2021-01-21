import ICacheProvider from "../models/ICacheProvider";

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: string): Promise<void> {
    this.cache[key] = value;
  }
  public async get(key: string): Promise<string | undefined> {
    return this.cache[key];
  }
  public async invalidade(key: string): Promise<void> {
    delete this.cache[key];
  }
}
