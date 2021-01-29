import { container } from "tsyringe";
import { Request, Response } from "express";
//
import AuthUser from "@modules/users/services/AuthUser";

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    //---> /session
    // Body fields: email, passwd
    const { email, passwd } = req.body;

    const authUser = container.resolve(AuthUser);

    const { user, token, expiresIn } = await authUser.execute({
      email,
      passwd,
    });

    return res.json({ user, token, expiresIn });
  }
}
