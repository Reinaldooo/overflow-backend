import nodemailer, { Transporter } from "nodemailer";
//
import IMailProvider from "../models/IMailProvider";

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
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

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: "Equipe Typecal <forgot@typecal.com>",
      to,
      subject: "Nodemailer is unicode friendly ✔",
      text: body,
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
