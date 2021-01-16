import { container } from "tsyringe";
import { Request, Response } from "express";
//
import CreateUser from "@modules/users/services/CreateUser";
import SearchUsers from "@modules/users/services/SearchUsers";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    //> /users/search
    // Body fields: searchName
    const { searchName } = req.body;
    const searchUsers = container.resolve(SearchUsers);

    const users = await searchUsers.execute(searchName);
    return res.send(users);
  }

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
