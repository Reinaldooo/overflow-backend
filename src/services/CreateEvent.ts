import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import Event from "../models/Event";
import EventsRepository from "../repositories/EventsRepository";

interface Request {
  user: string;
  date: Date;
}

class CreateEvent {
  public async execute({ date, user }: Request): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const eventHour = startOfHour(date);
    const exists = await eventsRepository.findByDate(eventHour);
    if (exists) {
      throw new Error("This hour is already booked");
    }
    const event = eventsRepository.create({
      user,
      date: eventHour,
    });
    await eventsRepository.save(event);
    return event;
  }
}

export default CreateEvent;
