import { injectable, inject } from "tsyringe";
//
// import User from "../infra/typeorm/entities/User";
// import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IMailProvider from "@providers/MailProvider/models/IMailProvider";

interface RequestModel {
  email: string;
}

@injectable()
export default class ForgotPasswdEmail {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: RequestModel): Promise<void> {
    this.mailProvider.sendMail(
      email,
      "Pedido de recuperação de senha recebido."
    );
  }
}
