import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import IClassesRepository from "../repositories/IClassesRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface RequestModel {
  tutorId: string;
  classId: string;
}

@injectable()
export default class DeleteClass {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ tutorId, classId }: RequestModel): Promise<boolean> {
    if (!tutorId || !classId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing class info");
    }

    const _class = await this.classesRepository.findById(classId);

    if (!_class) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid class.");
    }

    if (!(_class.tutorId === tutorId)) {
      // throw errors in here and send them back in the route
      throw new AppError("You are not the tutor of this class.");
    }

    const removedClass = await this.classesRepository.delete(classId);

    return removedClass;
  }
}
