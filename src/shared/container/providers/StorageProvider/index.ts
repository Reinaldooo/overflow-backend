import { container } from "tsyringe";
//
import uploadConfig from "@config/upload";
import IStorageProvider from "./models/IStorageProvider";

import DiskStorage from "./implementations/DiskStorage";
import S3Storage from "./implementations/S3Storage";

const providers = {
  disk: DiskStorage,
  s3: S3Storage,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  providers[uploadConfig.driver]
);
