import { container } from "tsyringe";
import { Request, Response } from "express";
//
import ResetPasswd from "@modules/users/services/ResetPasswd";

export default class ResetPasswdController {
  public async create(req: Request, res: Response): Promise<Response> {
    //> /passwd/reset
    // Body fields: passwd,tokenId
    const { passwd, tokenId } = req.body;

    const resetPasswd = container.resolve(ResetPasswd);

    await resetPasswd.execute({
      passwd,
      tokenId,
    });
    return res.status(204).json();
  }
}
