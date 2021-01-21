import { container } from "tsyringe";
//
import cacheConfig from "@config/cache";
import ICacheProvider from "./models/ICacheProvider";
import RedisCache from "./implementations/RedisCache";

const providers = {
  redis: RedisCache,
};

container.registerSingleton<ICacheProvider>(
  "CacheProvider",
  providers[cacheConfig.driver]
);
