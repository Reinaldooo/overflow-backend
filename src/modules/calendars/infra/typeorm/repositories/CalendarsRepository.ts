import { getRepository, Repository } from "typeorm";
//
import ICalendarsRepository from "@modules/calendars/repositories/ICalendarsRepository";
import ICreateCalendarDTO from "@modules/calendars/dtos/ICreateCalendarDTO";
import Calendar from "../entities/Calendar";

export default class CalendarRepository implements ICalendarsRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: Repository<Calendar>;

  constructor() {
    this.ormRepo = getRepository(Calendar);
  }

  public async findByDate(date: Date): Promise<Calendar | undefined> {
    const calendar = await this.ormRepo.findOne({
      where: { date },
    });
    return calendar;
  }

  public async create({ userId, date }: ICreateCalendarDTO): Promise<Calendar> {
    const calendar = this.ormRepo.create({ userId, date });
    await this.ormRepo.save(calendar);
    return calendar;
  }
}
