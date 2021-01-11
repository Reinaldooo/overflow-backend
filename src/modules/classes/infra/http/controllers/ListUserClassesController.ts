import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import ListUserClassesSvc from "@modules/classes/services/ListUserClassesSvc";

export default class ListUserClassesController {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /classes/me
    // Token required
    const { userId } = req;
    const listUserClassesSvc = container.resolve(ListUserClassesSvc);

    const user = await listUserClassesSvc.execute(userId);
    return res.send(user);
  }
}
