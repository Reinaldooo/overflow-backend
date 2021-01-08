import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Calendar from "../infra/typeorm/entities/Calendar";
import ICalendarsRepository from "../repositories/ICalendarsRepository";

interface RequestModel {
  userId: string;
  date: Date;
}

@injectable()
export default class CreateCalendar {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("CalendarsRepository")
    private eventsRepository: ICalendarsRepository
  ) {}

  public async execute({ date, userId }: RequestModel): Promise<Calendar> {
    if (!date || !userId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing calendar info");
    }

    const eventHour = startOfHour(date);

    const eventExists = await this.eventsRepository.findByDate(eventHour);

    if (eventExists) {
      // throw errors in here and send them back in the route
      throw new AppError("This hour is already booked");
    }

    const calendar = await this.eventsRepository.create({
      userId,
      date: eventHour,
    });

    return calendar;
  }
}
