import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";
import { classToClass } from "class-transformer";
//
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface RequestModel {
  email: string;
  passwd: string;
}

interface ResponseModel {
  user: User;
  token: string;
  expiresIn: number;
}

@injectable()
export default class AuthUser {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    passwd,
  }: RequestModel): Promise<ResponseModel> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Invalid mail/password.");

    const passMatch = await this.hashProvider.compareHash(passwd, user.passwd);

    if (!passMatch) throw new AppError("Invalid mail/password.");

    const { jwt } = authConfig;
    const token = sign({ id: user.id }, jwt.phrase, jwt.options);
    const expiresIn = Date.now() + 24 * 60 * 60 * 1000; // 24h from now

    return { user: classToClass(user), token, expiresIn };
  }
}
