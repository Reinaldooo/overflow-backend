import { container } from "tsyringe";
import { Request, Response } from "express";
//
import ListTopTutorsSvc from "@modules/classes/services/ListTopTutorsSvc";

export default class ListTopTechsCTRL {
  public async index(_: Request, res: Response): Promise<Response> {
    //> /classes/tutors/top
    // token required
    const listTopTutorsSvc = container.resolve(ListTopTutorsSvc);

    const techs = await listTopTutorsSvc.execute();

    return res.send(techs);
  }
}
