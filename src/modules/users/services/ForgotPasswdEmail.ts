import { injectable, inject } from "tsyringe";
//
// import User from "../infra/typeorm/entities/User";
// import AppError from "@shared/errors/AppError";
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

    const { id } = await this.passRecoveryTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido.
      Token: ${id}`
    );
  }
}
