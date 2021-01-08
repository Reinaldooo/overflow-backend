import { container } from "tsyringe";
import { Request, Response } from "express";
//
import UpdateUserAvatar from "@modules/users/services/UpdateUserAvatar";

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    //---> /users/avatar
    if (!req.file)
      return res.status(401).json({ error: "Invalid or missing file." });

    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const { avatar, name } = await updateUserAvatar.execute({
      userId: req.userId,
      avatarName: req.file.filename,
    });

    res.json({ avatar, name });
  }
}
