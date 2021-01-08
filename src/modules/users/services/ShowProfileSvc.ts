import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";

import User from "../infra/typeorm/entities/User";

interface IRequest {
  userId: string;
}

@injectable()
export default class ShowProfileSvc {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    delete user.passwd;
    return user;
  }
}
