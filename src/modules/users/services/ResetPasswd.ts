import { injectable, inject } from "tsyringe";
import { differenceInHours, startOfHour } from "date-fns";
//
// import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IPassRecoveryTokenRepository from "../repositories/IPassRecoveryTokenRepository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

interface RequestModel {
  tokenId: string;
  passwd: string;
}

@injectable()
export default class ResetPasswd {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("PassRecoveryTokenRepository")
    private passRecoveryTokenRepository: IPassRecoveryTokenRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ tokenId, passwd }: RequestModel): Promise<void> {
    const token = await this.passRecoveryTokenRepository.findById(tokenId);
    if (!token) {
      throw new AppError("Invalid token.");
    }
    if (differenceInHours(token.createdAt, new Date()) >= 2) {
      throw new AppError("Expired token.");
    }
    const user = await this.usersRepository.findById(token.userId);
    if (!user) {
      throw new AppError("Invalid user.");
    }
    // Hash will come later
    user.passwd = await this.hashProvider.generateHash(passwd);
    await this.usersRepository.save(user);
  }
}
