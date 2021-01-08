import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Event from "../infra/typeorm/entities/Event";
import IEventsRepository from "../repositories/IEventsRepository";

interface RequestModel {
  userId: string;
  date: Date;
  calendarId: string;
}

@injectable()
export default class CreateEvent {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  public async execute({
    date,
    userId,
    calendarId,
  }: RequestModel): Promise<Event> {
    if (!date || !userId || !calendarId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing event info");
    }

    const eventHour = startOfHour(date);

    const eventExists = await this.eventsRepository.findByDate(
      eventHour,
      calendarId
    );

    if (eventExists) {
      // throw errors in here and send them back in the route
      throw new AppError("This hour is unavailable.");
    }

    const event = await this.eventsRepository.create({
      userId,
      calendarId,
      date: eventHour,
    });

    return event;
  }
}
