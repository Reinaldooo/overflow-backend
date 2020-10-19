import { getRepository } from "typeorm";
// This function is used to load a default repo containing typeorm methods
import { hash } from "bcryptjs";
//
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
// A custom User Repo wasn't needed

interface RequestModel {
  name: string;
  email: string;
  passwd: string;
}

export default class CreateUser {
  // Each service consists of a simple execute method that handle all business rules
  public async execute({ name, email, passwd }: RequestModel): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      // throw erros in here and send them back in the route
      throw new AppError("Email already used.");
    }

    const hashedPasswd = await hash(passwd, 8);

    const user = userRepository.create({
      name,
      email,
      passwd: hashedPasswd,
    });

    await userRepository.save(user);

    delete user.passwd;

    return user;
  }
}
