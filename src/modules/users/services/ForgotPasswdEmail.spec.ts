import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@providers/MailProvider/fakes/FakeMailProvider";
import ForgotPasswdEmail from "./ForgotPasswdEmail";

describe("Password recovery", () => {
  it("Should be able to recover passwd using email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const forgotPasswdEmail = new ForgotPasswdEmail(
      fakeUsersRepository,
      fakeMailProvider
    );

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await forgotPasswdEmail.execute({
      email: "rewifetri@gmail.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
