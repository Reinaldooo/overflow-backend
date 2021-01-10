import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import CreateClass from "@modules/classes/services/CreateClass";

export default class ClassesController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
  //
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /classes
    // Token required
    // Body fields: date
    const { userId: tutorId } = req;
    const { date } = req.body;

    const parsedDate = parseISO(date);

    const createClass = container.resolve(CreateClass);

    const _class = await createClass.execute({
      date: parsedDate,
      tutorId,
    });

    return res.json(_class);
  }
}
