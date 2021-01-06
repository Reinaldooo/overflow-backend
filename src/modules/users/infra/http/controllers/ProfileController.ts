import { container } from "tsyringe";
import { Request, Response } from "express";
//
import UpdateProfile from "@modules/users/services/UpdateProfile";
import ShowProfileSvc from "@modules/users/services/ShowProfileSvc";

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    //> /profile
    // Token required
    const { userId } = req;
    const showProfile = container.resolve(ShowProfileSvc);

    const user = await showProfile.execute({ userId });
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    //> /profile
    // Token required
    // Body fields: name, email, old_passwd, passwd
    const { userId } = req;
    const { name, email, old_passwd, passwd } = req.body;

    const updateProfile = container.resolve(UpdateProfile);

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      old_passwd,
      passwd,
    });
    delete user.passwd;
    return res.send(user);
  }
}
