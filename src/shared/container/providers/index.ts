import { container } from "tsyringe";

// tsyringe is a dependency injection library.
// Check comments on @shared/container

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorage from "./StorageProvider/implementations/DiskStorage";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorage);

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);

// As a contructor is used in MailProvider (EtherealMailProvider), i need to use 'registerInstance'
container.registerInstance<IMailProvider>(
  // 'resolve' is used here because Ethereal itself depends on other providers
  "MailProvider",
  container.resolve(EtherealMailProvider)
);
