import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Calendar from "../infra/typeorm/entities/Calendar";
import ICalendarsRepository from "../repositories/ICalendarsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface RequestModel {
  userId: string;
  calendarId: string;
}

interface ResponseModel {
  calendarName: string;
  userName: string;
}

@injectable()
export default class IncludeUserInCalendar {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("CalendarsRepository")
    private calendarsRepository: ICalendarsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    calendarId,
    userId,
  }: RequestModel): Promise<ResponseModel> {
    if (!calendarId || !userId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing calendar info");
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid user.");
    }

    const calendar = await this.calendarsRepository.findById(calendarId);

    if (!calendar) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid calendar.");
    }

    if (calendar.users.find(u => u.id === user.id)) {
      // throw errors in here and send them back in the route
      throw new AppError("User already included.");
    }

    if (calendar.users.length > 4) {
      // throw errors in here and send them back in the route
      throw new AppError("Users limit reached.");
    }

    calendar.users = [...calendar.users, user];
    await this.calendarsRepository.save(calendar);

    return {
      calendarName: calendar.name,
      userName: user.name,
    };
  }
}
