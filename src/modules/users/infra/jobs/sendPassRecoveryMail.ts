import { container } from "tsyringe";
//
import "@shared/container/providers/MailTemplateProvider";
import "@shared/container/providers/MailProvider";
import IMailProvider from "@providers/MailProvider/models/IMailProvider";

const mailProvider = container.resolve<IMailProvider>("MailProvider");

export default {
  key: "SendPassRecoveryMail",
  options: {},
  async handle({ data: { user, forgotPasswdTemplate, token } }) {
    await mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "Overflow - Recuperação de senha",
      templateData: {
        file: forgotPasswdTemplate,
        variables: {
          name: user.name,
          link: `${process.env.FRONTEND_WEB_URL}/passwd-reset/${token}`,
          token,
        },
      },
    });
  },
};
