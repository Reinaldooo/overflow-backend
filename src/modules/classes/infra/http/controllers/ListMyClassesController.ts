import { Request, Response } from "express";
import { container } from "tsyringe";
//
import ListMyClassesSvc from "@modules/classes/services/ListMyClassesSvc";

export default class ListMyClassesController {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /classes/me
    // Token required
    const { userId } = req;
    const listMyClassesSvc = container.resolve(ListMyClassesSvc);

    const user = await listMyClassesSvc.execute(userId);
    return res.send(user);
  }
}
