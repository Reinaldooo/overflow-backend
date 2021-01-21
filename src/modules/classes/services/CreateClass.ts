import { isBefore, startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import Class from "../infra/typeorm/entities/Class";
import IClassesRepository from "../repositories/IClassesRepository";
import ITechsRepository from "@modules/techs/repositories/ITechsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

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
    private techsRepository: ITechsRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
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

    if (techs.length > 4) {
      // throw errors in here and send them back in the route
      throw new AppError("You can add 4 techs max.");
    }

    if (description.length > 200) {
      // throw errors in here and send them back in the route
      throw new AppError("Description should have 200 chars max.");
    }

    const classHour = startOfHour(date);

    if (isBefore(date, new Date())) {
      // throw errors in here and send them back in the route
      throw new AppError("You can not create classes in the past.");
    }

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

    await this.cacheProvider.invalidade(`activeClasses/${tutorId}`);

    return _class;
  }
}
