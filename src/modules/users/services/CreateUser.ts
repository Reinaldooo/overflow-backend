import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";
//
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";

interface RequestModel {
  name: string;
  email: string;
  passwd: string;
}

@injectable()
export default class CreateUser {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, passwd }: RequestModel): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      // throw erros in here and send them back in the route
      throw new AppError("Email already used.");
    }

    const hashedPasswd = await hash(passwd, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      passwd: hashedPasswd,
    });

    delete user.passwd;

    return user;
  }
}
