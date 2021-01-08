import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import CreateCalendar from "@modules/calendars/services/CreateCalendar";

export default class CalendarsController {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /calendars
    // Token required
    const { userId } = req;
    return res.json();
  }
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /calendars
    // Token required
    // Body fields: userId, date
    const { userId, date } = req.body;

    const parsedDate = parseISO(date);

    const createCalendar = container.resolve(CreateCalendar);

    const calendar = await createCalendar.execute({
      date: parsedDate,
      userId,
    });

    return res.json(calendar);
  }
}
