import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Class from "../infra/typeorm/entities/Class";
import IClassesRepository from "../repositories/IClassesRepository";
import ITechsRepository from "@modules/techs/repositories/ITechsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface RequestModel {
  tutorId: string;
  date: Date;
  techs: string[];
  description: string;
}

@injectable()
export default class CreateClass {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TechsRepository")
    private techsRepository: ITechsRepository
  ) {}

  public async execute({
    date,
    tutorId,
    techs,
    description,
  }: RequestModel): Promise<Class> {
    if (!date || !tutorId || !techs[0] || !description) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing class info");
    }

    if (description.length > 200) {
      // throw errors in here and send them back in the route
      throw new AppError("description should have 200 chars max.");
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

    const tutor = await this.usersRepository.findById(tutorId);

    if (!tutor) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid tutor.");
    }

    const techsFound = await this.techsRepository.findByExactNames(techs);

    if (!techsFound[0]) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid techs.");
    }

    const _class = await this.classesRepository.create({
      tutor,
      date: classHour,
      techs: techsFound,
      description,
    });

    return _class;
  }
}
