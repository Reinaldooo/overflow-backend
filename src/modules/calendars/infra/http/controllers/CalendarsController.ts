import { Request, Response } from "express";
import { container } from "tsyringe";
//
import CreateCalendar from "@modules/calendars/services/CreateCalendar";
import ShowUserCalendarsSvc from "@modules/calendars/services/ShowUserCalendarsSvc";

export default class CalendarsController {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /calendars
    // Token required
    const { userId } = req;
    const showUserCalendars = container.resolve(ShowUserCalendarsSvc);

    const calendars = await showUserCalendars.execute(
      userId
    );

    return res.json(calendars);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /calendars
    // Token required
    // Body fields: name
    const { userId } = req;
    const { name } = req.body;

    const createCalendar = container.resolve(CreateCalendar);

    const calendar = await createCalendar.execute({
      name,
      userId,
    });

    return res.json(calendar);
  }
}
