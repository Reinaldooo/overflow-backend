import { v4 as uuidv4 } from "uuid";
import { isEqual } from "date-fns";
//
import ICalendarsRepository from "@modules/calendars/repositories/ICalendarsRepository";
import ICreateCalendarDTO from "@modules/calendars/dtos/ICreateCalendarDTO";
import Calendar from "../../infra/typeorm/entities/Calendar";

export default class FakeCalendarsRepository implements ICalendarsRepository {
  private calendars: Calendar[] = [];
  public async findByUserId(userId: string): Promise<Calendar[] | undefined> {
    const foundCalendars = this.calendars.filter(calendar =>
      calendar.users?.find(u => u.id === userId)
    );
    return foundCalendars;
  }

  public async findById(calendarId: string): Promise<Calendar | undefined> {
    const foundCalendar = this.calendars.find(
      calendar => calendar.id === calendarId
    );
    return foundCalendar;
  }

  public async create({ user, name }: ICreateCalendarDTO): Promise<string> {
    const calendar = new Calendar();
    Object.assign(calendar, { id: uuidv4(), name, users: [user] });
    this.calendars.push(calendar);
    return calendar.id;
  }

  public async save(calendar: Calendar): Promise<Calendar> {
    const calendarIdx = this.calendars.findIndex(c => c.id === calendar.id);
    if (calendarIdx < 0) {
      this.calendars.push(calendar);
    }
    this.calendars.splice(calendarIdx, 1, calendar);
    return calendar;
  }
}
