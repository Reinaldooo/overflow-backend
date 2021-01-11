import { injectable, inject } from "tsyringe";
//
import Class from "../infra/typeorm/entities/Class";
import IClassesRepository from "@modules/classes/repositories/IClassesRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export default class ListClassesByTechSvc {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute(techName: string): Promise<Class[]> {
    if (!techName) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing tech name.");
    }

    const classes = await this.classesRepository.findByTechName(techName);

    return classes;
  }
}
