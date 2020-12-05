import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";
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

    return { user, token };
  }
}
