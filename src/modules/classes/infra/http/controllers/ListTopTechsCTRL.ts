import { container } from "tsyringe";
import { Request, Response } from "express";
//
import ListTopTechsSvc from "@modules/classes/services/ListTopTechsSvc";

export default class ListTopTechsCTRL {
  public async index(_: Request, res: Response): Promise<Response> {
    //> /classes/techs/top
    // token required
    const listTopTechsSvc = container.resolve(ListTopTechsSvc);

    const techs = await listTopTechsSvc.execute();

    return res.send(techs);
  }
}
