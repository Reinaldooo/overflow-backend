import path from "path";
import { promises } from "fs";
import { injectable, inject } from "tsyringe";
//
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface RequestModel {
  userId: string;
  avatarName: string;
}

@injectable()
export default class UpdateUserAvatar {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ userId, avatarName }: RequestModel): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError("Invalid user id.");

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    user.avatar = await this.storageProvider.save(avatarName);
    await this.usersRepository.save(user);

    return user;
  }
}
