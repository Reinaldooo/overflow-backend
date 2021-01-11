import { Request, Response } from "express";
import { container } from "tsyringe";
//
import EnrollUser from "@modules/classes/services/EnrollUser";

export default class EnrollmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /classes/students
    // Token required
    // Body fields: tutorId
    const { userId } = req;
    const { tutorId, classId } = req.body;
    const enrollUser = container.resolve(EnrollUser);

    const enrollment = await enrollUser.execute({ tutorId, classId, userId });
    return res.json(enrollment);
  }
}
