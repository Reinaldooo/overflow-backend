import { getRepository, Repository, Raw } from "typeorm";
//
import IEventsRepository from "@modules/events/repositories/IEventsRepository";
import ICreateEventDTO from "@modules/events/dtos/ICreateEventDTO";
import IFindInMonthFromCalendarIdDTO from "@modules/events/dtos/IFindInMonthFromCalendarIdDTO";
import Event from "../entities/Event";

export default class EventRepository implements IEventsRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: Repository<Event>;

  constructor() {
    this.ormRepo = getRepository(Event);
  }

  public async findByDate(
    date: Date,
    calendarId: string
  ): Promise<Event | undefined> {
    const event = await this.ormRepo.findOne({
      where: { date, calendarId },
    });
    return event;
  }

  public async findInMonthFromCalendarId({
    month,
    year,
    calendarId,
  }: IFindInMonthFromCalendarIdDTO): Promise<Event[]> {
    const parsedMonth = String(month).padStart(2, "0");

    const events = await this.ormRepo.find({
      where: {
        calendarId,
        date: Raw(
          fieldName =>
            `to_char(${fieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });
    return events;
  }

  public async create({
    userId,
    calendarId,
    date,
  }: ICreateEventDTO): Promise<Event> {
    const event = this.ormRepo.create({ userId, calendarId, date });
    await this.ormRepo.save(event);
    return event;
  }
}
