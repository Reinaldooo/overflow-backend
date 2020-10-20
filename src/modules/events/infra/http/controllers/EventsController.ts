import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import CreateEvent from "@modules/events/services/CreateEvent";

export default class EventsController {
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /events
    // Token required
    // Body fields: userId, date
    const { userId, date } = req.body;

    const parsedDate = parseISO(date);

    const createEvent = container.resolve(CreateEvent);

    const event = await createEvent.execute({
      date: parsedDate,
      userId,
    });

    return res.json(event);
  }
}
