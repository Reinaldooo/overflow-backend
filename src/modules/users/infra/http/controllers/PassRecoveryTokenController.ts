import { container } from "tsyringe";
import { Request, Response } from "express";
//
import ForgotPasswdEmail from "@modules/users/services/ForgotPasswdEmail";

export default class PassRecoveryTokenController {
  public async create(req: Request, res: Response): Promise<Response> {
    //> /passwd/forgot
    // Body fields: name, email, passwd
    const { email } = req.body;

    const forgotPasswdEmail = container.resolve(ForgotPasswdEmail);

    await forgotPasswdEmail.execute({
      email,
    });
    return res.status(204);
  }
}
