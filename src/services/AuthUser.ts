import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
//
import User from "@models/User";
import authConfig from "../config/auth";

interface RequestModel {
  email: string;
  passwd: string;
}

interface ResponseModel {
  user: User;
  token: string;
}

export default class AuthUser {
  public async execute({
    email,
    passwd,
  }: RequestModel): Promise<ResponseModel> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid mail/password.");
    }

    const passMatch = await compare(passwd, user.passwd);
    if (!passMatch) {
      throw new Error("Invalid mail/password.");
    }

    const { jwt } = authConfig;
    const token = sign({ id: user.id }, jwt.phrase, jwt.options);

    return { user, token };
  }
}
