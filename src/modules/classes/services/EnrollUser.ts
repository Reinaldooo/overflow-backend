import { injectable, inject } from "tsyringe";
//
import AppError from "@shared/errors/AppError";
import IClassesRepository from "../repositories/IClassesRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface RequestModel {
  classId: string;
  userId: string;
  tutorId: string;
}

@injectable()
export default class EnrollUser {
  // Each service consists of a simple execute method that handle all business rules

  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    classId,
    userId,
    tutorId,
  }: RequestModel): Promise<boolean> {
    if (!classId || !userId || !tutorId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing info.");
    }

    if (userId === tutorId) {
      // throw errors in here and send them back in the route
      throw new AppError("You can't enroll in your own class.");
    }

    const _class = await this.classesRepository.findById(classId);

    if (!_class) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid class.");
    }

    const userEnrolled = _class.students.find(s => s.id === userId);

    if (userEnrolled) {
      // throw errors in here and send them back in the route
      throw new AppError("User already enrolled.");
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid user.");
    }

    _class.students = [..._class.students, user];
    await this.classesRepository.save(_class);

    await this.notificationsRepository.create({
      content: `A new student enrolled in one of your classes`,
      recipient_id: tutorId,
    });

    await this.cacheProvider.invalidade(`activeClasses/${tutorId}`);
    await this.cacheProvider.invalidade(`activeClasses/${userId}`);

    return true;
  }
}
