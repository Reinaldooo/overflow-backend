import { container } from "tsyringe";
import { Request, Response } from "express";
//
import CreateUser from "@modules/users/services/CreateUser";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    //> /users
    // Body fields: name, email, passwd
    const { name, email, passwd } = req.body;

    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute({
      name,
      email,
      passwd,
    });
    return res.send(user);
  }
}
