import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Calendar from "../infra/typeorm/entities/Calendar";
import ICalendarsRepository from "../repositories/ICalendarsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface RequestModel {
  userId: string;
  name: string;
}

@injectable()
export default class CreateCalendar {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("CalendarsRepository")
    private calendarsRepository: ICalendarsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, userId }: RequestModel): Promise<string> {
    if (!name || !userId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing calendar info");
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid user.");
    }

    const userCalendars = await this.calendarsRepository.findByUserId(userId);

    if (userCalendars.find(c => c.name === name)) {
      // throw errors in here and send them back in the route
      throw new AppError(`You already have a calendar with this name.`);
    }

    const calendarId = await this.calendarsRepository.create({
      user,
      name,
    });

    return calendarId;
  }
}
