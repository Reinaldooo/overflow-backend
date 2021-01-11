import { injectable, inject } from "tsyringe";
//
import Class from "../infra/typeorm/entities/Class";
import IClassesRepository from "@modules/classes/repositories/IClassesRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export default class ListTutorClassesSvc {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute(tutorId: string): Promise<Class[]> {
    if (!tutorId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing tutor id.");
    }

    const classes = await this.classesRepository.findTutorClasses(tutorId);

    return classes;
  }
}
