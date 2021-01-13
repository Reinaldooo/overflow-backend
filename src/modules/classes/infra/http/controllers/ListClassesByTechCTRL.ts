import { Request, Response } from "express";
import { container } from "tsyringe";
//
import ListClassesByTechSvc from "@modules/classes/services/ListClassesByTechSvc";

export default class ListClassesByTechCTRL {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /classes/techs/:techName
    // Token required
    // Body fields: tutorId
    const { techName } = req.params;
    const listClassesByTechSvc = container.resolve(ListClassesByTechSvc);

    const classes = await listClassesByTechSvc.execute(techName);
    return res.json(classes);
  }
}
