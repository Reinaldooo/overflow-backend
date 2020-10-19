import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
// This function is used to load repos that i created (custom)
// If a repository is the stantard without custom methods, i can just use "getRepository"
//
import Event from "../infra/typeorm/entities/Event";
import EventsRepository from "../repositories/EventsRepository";
import AppError from "@shared/errors/AppError";

interface RequestModel {
  userId: string;
  date: Date;
}

export default class CreateEvent {
  // Each service consists of a simple execute method that handle all business rules
  public async execute({ date, userId }: RequestModel): Promise<Event> {
    if (!date || !userId) {
      // throw erros in here and send them back in the route
      throw new AppError("Missing event info");
    }

    const eventsRepository = getCustomRepository(EventsRepository);

    const eventHour = startOfHour(date);

    const eventExists = await eventsRepository.findByDate(eventHour);

    if (eventExists) {
      // throw erros in here and send them back in the route
      throw new AppError("This hour is already booked");
    }

    const event = eventsRepository.create({
      userId,
      date: eventHour,
    });

    await eventsRepository.save(event);

    return event;
  }
}
