import { injectable, inject } from "tsyringe";
import path from "path";
//
import IUsersRepository from "../repositories/IUsersRepository";
import IPassRecoveryTokenRepository from "../repositories/IPassRecoveryTokenRepository";
import IMailProvider from "@providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";

interface RequestModel {
  email: string;
}

@injectable()
export default class ForgotPasswdEmail {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("PassRecoveryTokenRepository")
    private passRecoveryTokenRepository: IPassRecoveryTokenRepository
  ) {}

  public async execute({ email }: RequestModel): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist.");
    }

    const { id: token } = await this.passRecoveryTokenRepository.generate(
      user.id
    );

    const forgotPasswdTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgotPasswd.hbs"
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "Typecal - Recuperação de senha",
      templateData: {
        file: forgotPasswdTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/passwd/forgot?tk=${token}`,
        },
      },
    });
  }
}
