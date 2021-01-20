import { container } from "tsyringe";
//
import IStorageProvider from "./models/IStorageProvider";

import DiskStorage from "./implementations/DiskStorage";

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorage);
