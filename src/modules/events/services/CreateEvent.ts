import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Event from "../infra/typeorm/entities/Event";
import IEventsRepository from "../repositories/IEventsRepository";

interface RequestModel {
  userId: string;
  date: Date;
}

@injectable()
export default class CreateEvent {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  public async execute({ date, userId }: RequestModel): Promise<Event> {
    if (!date || !userId) {
      // throw erros in here and send them back in the route
      throw new AppError("Missing event info");
    }

    const eventHour = startOfHour(date);

    const eventExists = await this.eventsRepository.findByDate(eventHour);

    if (eventExists) {
      // throw erros in here and send them back in the route
      throw new AppError("This hour is already booked");
    }

    const event = await this.eventsRepository.create({
      userId,
      date: eventHour,
    });

    return event;
  }
}
