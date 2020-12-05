import path from "path";
import { promises } from "fs";
import { injectable, inject } from "tsyringe";
//
import User from "../infra/typeorm/entities/User";
import { uploadsDir } from "@config/upload";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";

interface RequestModel {
  userId: string;
  avatarName: string;
}

@injectable()
export default class UpdateUserAvatar {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId, avatarName }: RequestModel): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError("Invalid user id.");

    if (user.avatar) {
      const avatarPath = path.join(uploadsDir, user.avatar);
      try {
        // This try/catch is needed to avoid exception if there isn't a file
        // with the name specified

        // Check if avatar file exists, and if it does, delete it
        // stat method returns info about a file IF it exists
        // unlink method will delete the file
        const avatarFileExists = await promises.stat(avatarPath);
        if (avatarFileExists) await promises.unlink(avatarPath);
      } catch {}
    }

    user.avatar = avatarName;
    await this.usersRepository.save(user);

    return user;
  }
}