import { injectable, inject } from "tsyringe";
//
import Tech from "../infra/typeorm/entities/Tech";
import AppError from "@shared/errors/AppError";
import ITechsRepository from "../repositories/ITechsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface RequestModel {
  name: string;
  image: string;
  userId: string;
}

@injectable()
export default class CreateTech {
  constructor(
    @inject("TechsRepository")
    private techsRepository: ITechsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, image, userId }: RequestModel): Promise<Tech> {
    if (!name || !image || !userId) {
      // throw errors in here and send them back in the route
      throw new AppError("Missing tech info.");
    }

    const [techExists] = await this.techsRepository.findByNames([name]);

    if (techExists) {
      // throw errors in here and send them back in the route
      throw new AppError("Tech already exists.");
    }

    const user = await this.usersRepository.findById(userId);

    if (!user?.admin) {
      // throw errors in here and send them back in the route
      throw new AppError("User not authorized to create techs.");
    }

    const tech = await this.techsRepository.create({
      name,
      image,
    });

    return tech;
  }
}
