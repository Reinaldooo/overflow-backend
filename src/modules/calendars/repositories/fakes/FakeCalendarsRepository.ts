import { v4 as uuidv4 } from "uuid";
import { isEqual } from "date-fns";
//
import ICalendarsRepository from "@modules/calendars/repositories/ICalendarsRepository";
import ICreateCalendarDTO from "@modules/calendars/dtos/ICreateCalendarDTO";
import Calendar from "../../infra/typeorm/entities/Calendar";

export default class FakeCalendarsRepository implements ICalendarsRepository {
  private calendars: Calendar[] = [];
  public async findByDate(date: Date): Promise<Calendar | undefined> {
    const foundCalendar = this.calendars.find(calendar =>
      isEqual(calendar.date, date)
    );
    return foundCalendar;
  }

  public async create({ userId, date }: ICreateCalendarDTO): Promise<Calendar> {
    const calendar = new Calendar();
    Object.assign(calendar, { id: uuidv4(), date, userId });
    this.calendars.push(calendar);
    return calendar;
  }
}
