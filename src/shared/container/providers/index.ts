import { container } from "tsyringe";

// tsyringe is a dependency injection library.
// Check comments on @shared/container

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorage from "./StorageProvider/implementations/DiskStorage";

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorage);
