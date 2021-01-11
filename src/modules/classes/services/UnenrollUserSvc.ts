import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import IClassesRepository from "../repositories/IClassesRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface RequestModel {
  classId: string;
  userId: string;
}

@injectable()
export default class UnenrollUserSvc {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute({ classId, userId }: RequestModel): Promise<boolean> {
    if (!classId || !userId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing info.");
    }

    const _class = await this.classesRepository.findById(classId);

    if (!_class) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid class.");
    }

    const userEnrolled = _class.students.find(s => s.id === userId);

    if (!userEnrolled) {
      // throw errors in here and send them back in the route
      throw new AppError("User not enrolled.");
    }

    _class.students = _class.students.filter(s => s.id !== userId);
    await this.classesRepository.save(_class);

    return true;
  }
}
