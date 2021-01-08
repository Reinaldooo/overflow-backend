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

  public async findByUserId(userId: string): Promise<Calendar[] | undefined> {
    return this.ormRepo
      .createQueryBuilder("calendar")
      .leftJoin("calendar.users", "user")
      .where("user.id = :id", { id: userId })
      .getMany();
  }

  public async create({ user, name }: ICreateCalendarDTO): Promise<Calendar> {
    const calendar = this.ormRepo.create({ name, users: [user] });
    await this.ormRepo.save(calendar);
    return calendar;
  }
}
