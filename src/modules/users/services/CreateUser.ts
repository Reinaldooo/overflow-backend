import { injectable, inject } from "tsyringe";
import { classToClass } from "class-transformer";
//
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface RequestModel {
  name: string;
  email: string;
  passwd: string;
}

@injectable()
export default class CreateUser {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, passwd }: RequestModel): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      // throw errors in here and send them back in the route
      throw new AppError("Email already used.", 409);
    }

    const hashedPasswd = await this.hashProvider.generateHash(passwd);

    const user = await this.usersRepository.create({
      name,
      email,
      passwd: hashedPasswd,
    });

    return classToClass(user);
  }
}
