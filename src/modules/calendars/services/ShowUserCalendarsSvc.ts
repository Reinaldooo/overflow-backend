import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Calendar from "@modules/calendars/infra/typeorm/entities/Calendar";
import ICalendarsRepository from "@modules/calendars/repositories/ICalendarsRepository";

@injectable()
export default class ShowUserCalendarsSvc {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("CalendarsRepository")
    private calendarsRepository: ICalendarsRepository
  ) {}

  public async execute(userId: string ): Promise<Calendar[] | undefined> {
    if (!userId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing info");
    }

    const calendars = await this.calendarsRepository.findByUserId(userId);

    return calendars;
  }
}
