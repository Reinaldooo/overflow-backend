import { container } from "tsyringe";

// Other dependencies import
import "@modules/users/providers";
import "./providers";

// tsyringe is a dependency injection library.
// This container will control all injections in the app.
// As the services needs to receive the repository in their contructors, using
// this method i can replace this syntax:

// const classesRepository = new ClassesRepository();
// const createClass = new CreateClass(classesRepository);

// With this:

// const createClass = container.resolve(CreateClass);

// To achieve this i must also use the `injectable` and `inject` decorators on the
// services definition

import ITechsRepository from "@modules/techs/repositories/ITechsRepository";
import TechsRepository from "@modules/techs/infra/typeorm/repositories/TechsRepository";

import IClassesRepository from "@modules/classes/repositories/IClassesRepository";
import ClassesRepository from "@modules/classes/infra/typeorm/repositories/ClassesRepository";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IPassRecoveryTokenRepository from "@modules/users/repositories/IPassRecoveryTokenRepository";
import PassRecoveryTokenRepository from "@modules/users/infra/typeorm/repositories/PassRecoveryTokenRepository";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import NotificationsRepository from "@modules/notifications/infra/typeorm/repositories/NotificationsRepository";

container.registerSingleton<IClassesRepository>(
  "ClassesRepository",
  ClassesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITechsRepository>(
  "TechsRepository",
  TechsRepository
);

container.registerSingleton<IPassRecoveryTokenRepository>(
  "PassRecoveryTokenRepository",
  PassRecoveryTokenRepository
);

container.registerSingleton<INotificationsRepository>(
  "NotificationsRepository",
  NotificationsRepository
);
