import { v4 as uuidv4 } from "uuid";
import { isEqual } from "date-fns";
//
import IEventsRepository from "@modules/events/repositories/IEventsRepository";
import ICreateEventDTO from "@modules/events/dtos/ICreateEventDTO";
import Event from "../../infra/typeorm/entities/Event";

export default class FakeEventsRepository implements IEventsRepository {
  private events: Event[] = [];
  public async findByDate(date: Date, calendarId): Promise<Event | undefined> {
    const foundEvent = this.events.find(
      event => isEqual(event.date, date) && event.calendarId === calendarId
    );
    return foundEvent;
  }

  public async create({
    userId,
    date,
    calendarId,
  }: ICreateEventDTO): Promise<Event> {
    const event = new Event();
    Object.assign(event, { id: uuidv4(), date, userId, calendarId });
    this.events.push(event);
    return event;
  }
}
