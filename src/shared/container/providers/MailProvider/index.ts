import { container } from "tsyringe";
//
import IMailProvider from "./models/IMailProvider";
import mailConfig from "../../../../config/mail";

import EtherealMailProvider from "./implementations/EtherealMailProvider";
import SESMailProvider from "./implementations/SESMailProvider";

const providers = {
  // 'container.resolve' is used here because Ethereal itself depends on other providers
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

// As a contructor is used in MailProvider (EtherealMailProvider), i need to use 'registerInstance'
container.registerInstance<IMailProvider>(
  "MailProvider",
  providers[mailConfig.driver]
);
