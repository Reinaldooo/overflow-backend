import { injectable, inject } from "tsyringe";
import { classToClass } from "class-transformer";
//
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
export default class SearchUsers {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(searchName: string): Promise<User[]> {
    if (!searchName) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid search.");
    }
    if (searchName.length < 3) {
      // throw errors in here and send them back in the route
      throw new AppError("Please include at least 3 chars.");
    }

    let foundUsers = await this.usersRepository.findByName(searchName);
    foundUsers = foundUsers.map(u => classToClass(u));

    return foundUsers;
  }
}
