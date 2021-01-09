import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Event from "../infra/typeorm/entities/Event";
import IEventsRepository from "../repositories/IEventsRepository";
import ICalendarsRepository from "@modules/calendars/repositories/ICalendarsRepository";
import IFindInMonthFromCalendarIdDTO from "../dtos/IFindInMonthFromCalendarIdDTO";

@injectable()
export default class ListEventsInMonthByCalendar {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("CalendarsRepository")
    private calendarsRepository: ICalendarsRepository,
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  public async execute({
    month,
    year,
    calendarId,
    userId,
  }: IFindInMonthFromCalendarIdDTO): Promise<Event[]> {
    if (!month || !year || !calendarId || !userId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing events info");
    }

    const calendar = await this.calendarsRepository.findById(calendarId);

    if (!calendar) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid calendar.");
    }

    if (!calendar.users.find(u => u.id === userId)) {
      // throw errors in here and send them back in the route
      throw new AppError(
        "You are not authorized to see events on this calendar."
      );
    }

    const events = await this.eventsRepository.findInMonthFromCalendarId({
      month,
      year,
      calendarId,
      userId,
    });

    return events;
  }
}
