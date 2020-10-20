import { container } from "tsyringe";

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

// const eventsRepository = new EventsRepository();
// const createEvent = new CreateEvent(eventsRepository);

// container.resolve(CreateEvent);
