import nodemailer, { Transporter } from "nodemailer";
import { injectable, inject } from "tsyringe";
//
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailProvider from "../models/IMailProvider";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    // A provider can also depend on other providers. In this case the email
    // provider depends on the MailTemplateProvider
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(acc => {
      this.client = nodemailer.createTransport({
        host: acc.smtp.host,
        port: acc.smtp.port,
        secure: acc.smtp.secure,
        auth: {
          user: acc.user,
          pass: acc.pass,
        },
      });
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || "Equipe Typecal",
        address: from?.email || "equipe@typecal.com",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
