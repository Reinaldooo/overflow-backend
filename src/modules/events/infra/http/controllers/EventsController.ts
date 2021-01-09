import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import CreateEvent from "@modules/events/services/CreateEvent";
import ListEventsInMonthByCalendar from "@modules/events/services/ListEventsInMonthByCalendar";

export default class EventsController {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /events/calendar/:calendarId/:month/:year
    // Token required
    // Body fields: year, month
    const { userId } = req;
    let { year, month, calendarId } = req.params;

    const listEventsInMonthByCalendar = container.resolve(
      ListEventsInMonthByCalendar
    );

    const events = await listEventsInMonthByCalendar.execute({
      year: parseInt(year),
      month: parseInt(month),
      calendarId,
      userId,
    });
    return res.json(events);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /events
    // Token required
    // Body fields: calendarId, date
    const { userId } = req;
    const { calendarId, date } = req.body;

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
