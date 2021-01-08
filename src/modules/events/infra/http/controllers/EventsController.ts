import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import CreateEvent from "@modules/events/services/CreateEvent";

export default class EventsController {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /events
    // Token required
    const { userId } = req;
    return res.json();
  }
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /events
    // Token required
    // Body fields: userId, calendarId, date
    const { userId, calendarId, date } = req.body;

    const parsedDate = parseISO(date);

    const createEvent = container.resolve(CreateEvent);

    const event = await createEvent.execute({
      date: parsedDate,
      userId,
      calendarId,
    });

    return res.json(event);
  }
}
