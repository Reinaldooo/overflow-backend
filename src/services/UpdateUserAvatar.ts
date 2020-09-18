import { getRepository } from "typeorm";
import path from "path";
import { promises } from "fs";
//
import User from "@models/User";
import { uploadsDir } from "@config/upload";

interface RequestModel {
  userId: string;
  avatarName: string;
}

export default class UpdateUserAvatar {
  public async execute({ userId, avatarName }: RequestModel): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) throw new Error("Invalid user id.");

    if (user.avatar) {
      const avatarPath = path.join(uploadsDir, user.avatar);
      try {
        // Check if avatar file exists, and if it does, delete it
        // stat method returns info about a file IF it exists
        // unlink method will delete the file
        const avatarFileExists = await promises.stat(avatarPath);
        if (avatarFileExists) await promises.unlink(avatarPath);
      } catch {}
    }

    user.avatar = avatarName;
    await userRepository.save(user);

    return user;
  }
}
