import { getRepository } from "typeorm";
// This function is used to load a default repo containing typeorm methods
import { hash } from "bcryptjs";
//
import User from "../models/User";
// A custom User Repo wasn't needed

interface Request {
  name: string;
  email: string;
  passwd: string;
}

export default class CreateUser {
  // Each service consists of a simple execute method that handle all business rules
  public async execute({ name, email, passwd }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      // throw erros in here and send them back in the route
      throw new Error("Email already used.");
    }

    const hashedPasswd = await hash(passwd, 8);

    const event = userRepository.create({
      name,
      email,
      passwd: hashedPasswd,
    });

    await userRepository.save(event);

    return event;
  }
}
