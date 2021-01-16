import { injectable, inject } from "tsyringe";
import { classToClass } from "class-transformer";

import AppError from "@shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

import User from "../infra/typeorm/entities/User";

interface IRequest {
  userId: string;
  name?: string;
  email?: string;
  old_passwd?: string;
  passwd?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    userId,
    name,
    email,
    passwd,
    old_passwd,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    const emailIsUsed = await this.usersRepository.findByEmail(email);

    if (emailIsUsed && emailIsUsed.id !== userId) {
      throw new AppError("E-mail already in use");
    }

    user.name = name;
    user.email = email;

    if (passwd && !old_passwd) {
      throw new AppError(
        "You need to inform the old password to set a new password"
      );
    }

    if (passwd && old_passwd) {
      if (passwd === old_passwd) {
        throw new AppError("New password must be different.");
      }
      const oldPassIsValid = await this.hashProvider.compareHash(
        old_passwd,
        user.passwd
      );

      if (!oldPassIsValid) {
        throw new AppError("Old password does not match");
      }

      user.passwd = await this.hashProvider.generateHash(passwd);
    }

    const updatedUser = await this.usersRepository.save(user);

    return classToClass(updatedUser);
  }
}

export default UpdateProfileService;
