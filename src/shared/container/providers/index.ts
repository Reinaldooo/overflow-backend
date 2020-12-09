import { container } from "tsyringe";

// tsyringe is a dependency injection library.
// Check comments on @shared/container

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorage from "./StorageProvider/implementations/DiskStorage";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorage);

// Apparently if a constructor is used, i need to use registerInstance
container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);
