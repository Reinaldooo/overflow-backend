import { Request, Response } from "express";
import { container } from "tsyringe";
//
import EnrollUser from "@modules/classes/services/EnrollUser";
import UnenrollUserSvc from "@modules/classes/services/UnenrollUserSvc";

export default class EnrollmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /classes/:classId/students
    // Token required
    const { userId } = req;
    const { tutorId } = req.body;
    const { classId } = req.params;
    const enrollUser = container.resolve(EnrollUser);

    const enrollment = await enrollUser.execute({ tutorId, classId, userId });
    return res.json(enrollment);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    //---> /classes/:classId/students
    // Token required
    const { userId } = req;
    const { classId } = req.params;
    const unenrollUserSvc = container.resolve(UnenrollUserSvc);

    const unenrollment = await unenrollUserSvc.execute({ classId, userId });
    return res.json(unenrollment);
  }
}
