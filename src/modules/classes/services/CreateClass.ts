import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Class from "../infra/typeorm/entities/Class";
import IClassesRepository from "../repositories/IClassesRepository";

interface RequestModel {
  tutorId: string;
  date: Date;
}

@injectable()
export default class CreateClass {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute({ date, tutorId }: RequestModel): Promise<Class> {
    if (!date || !tutorId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing class info");
    }

    const classHour = startOfHour(date);

    const classExists = await this.classesRepository.findByDate(
      classHour,
      tutorId
    );

    if (classExists) {
      // throw errors in here and send them back in the route
      throw new AppError("This hour is unavailable.");
    }

    const _class = await this.classesRepository.create({
      tutorId,
      date: classHour,
    });

    return _class;
  }
}
