import { Request, Response } from "express";
import { container } from "tsyringe";
//
import ListTutorClassesSvc from "@modules/classes/services/ListTutorClassesSvc";

export default class ListTutorClassesController {
  public async index(req: Request, res: Response): Promise<Response> {
    //---> /classes/tutor/:tutorId
    // Token required
    const { tutorId } = req.params;
    const listTutorClassesSvc = container.resolve(ListTutorClassesSvc);

    const classes = await listTutorClassesSvc.execute(tutorId);
    return res.json(classes);
  }
}
