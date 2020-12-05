import { container } from "tsyringe";

import "@modules/users/providers";

// tsyringe is a dependency injection library.
// This container will control all injections in the app.
// As the services needs to receive the repository in their contructors, using
// this method i can replace this syntax:

// const eventsRepository = new EventsRepository();
// const createEvent = new CreateEvent(eventsRepository);

// With this:

// const createEvent = container.resolve(CreateEvent);

// To achieve this i must also use the `injectable` and `inject` decorators on the
// services definition

import IEventsRepository from "@modules/events/repositories/IEventsRepository";
import EventsRepository from "@modules/events/infra/typeorm/repositories/EventsRepository";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IEventsRepository>(
  "EventsRepository",
  EventsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
