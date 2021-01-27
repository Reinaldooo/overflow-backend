import { injectable, inject } from "tsyringe";
import path from "path";
//
import IUsersRepository from "../repositories/IUsersRepository";
import IPassRecoveryTokenRepository from "../repositories/IPassRecoveryTokenRepository";
import AppError from "@shared/errors/AppError";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";

interface RequestModel {
  email: string;
}

@injectable()
export default class ForgotPasswdEmail {
  // DESCRIPTION
  // Sends email containing the link to recover password
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("QueueProvider")
    private queueProvider: IQueueProvider,
    @inject("PassRecoveryTokenRepository")
    private passRecoveryTokenRepository: IPassRecoveryTokenRepository
  ) {}

  public async execute({ email }: RequestModel): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      // If the user exists continue with the process, but if it don't, no errors
      // should be returned since hackers can use this to check if a person has
      // an account in the site
      const { id: token } = await this.passRecoveryTokenRepository.generate(
        user.id
      );

      const forgotPasswdTemplate = path.resolve(
        __dirname,
        "..",
        "views",
        "forgotPasswd.hbs"
      );

      this.queueProvider.add("SendPassRecoveryMail", {
        user,
        forgotPasswdTemplate,
        token,
      });
    }
  }
}
