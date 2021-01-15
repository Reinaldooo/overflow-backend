import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import CreateClass from "@modules/classes/services/CreateClass";
import EditClass from "@modules/classes/services/EditClass";
import DeleteClass from "@modules/classes/services/DeleteClass";

export default class ClassesController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
  //
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /classes/:classId
    // Token required
    const { userId: tutorId } = req;
    const { date, techs, description } = req.body;

    const parsedDate = parseISO(date);

    const createClass = container.resolve(CreateClass);

    const _class = await createClass.execute({
      date: parsedDate,
      tutorId,
      techs,
      description,
    });

    return res.json(_class);
  }
  //
  public async update(req: Request, res: Response): Promise<Response> {
    //---> /classes/:classId
    // Token required
    const { userId: tutorId } = req;
    const { date, techs, description } = req.body;
    const { classId } = req.params;

    const parsedDate = parseISO(date);

    const editClass = container.resolve(EditClass);

    const updatedClass = await editClass.execute({
      date: parsedDate,
      tutorId,
      techs,
      description,
      classId,
    });

    return res.json(updatedClass);
  }
  //
  public async delete(req: Request, res: Response): Promise<Response> {
    //---> /classes/:classId
    // Token required
    const { userId: tutorId } = req;
    const { classId } = req.params;

    const deleteClass = container.resolve(DeleteClass);

    const classRemoved = await deleteClass.execute({
      tutorId,
      classId,
    });

    return res.json(classRemoved);
  }
}
