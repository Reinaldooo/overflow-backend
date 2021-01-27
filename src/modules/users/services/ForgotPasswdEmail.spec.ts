import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@providers/MailProvider/fakes/FakeMailProvider";
import FakeQueueProvider from "@providers/QueueProvider/fakes/FakeQueueProvider";
import FakePassRecoveryTokenRepository from "@modules/users/repositories/fakes/FakePassRecoveryTokenRepository";
import ForgotPasswdEmail from "./ForgotPasswdEmail";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeQueueProvider: FakeQueueProvider;
let forgotPasswdEmail: ForgotPasswdEmail;
let fakePassRecoveryTokenRepository: FakePassRecoveryTokenRepository;

describe("Password recovery", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeQueueProvider = new FakeQueueProvider();
    fakePassRecoveryTokenRepository = new FakePassRecoveryTokenRepository();

    forgotPasswdEmail = new ForgotPasswdEmail(
      fakeUsersRepository,
      fakeQueueProvider,
      fakePassRecoveryTokenRepository
    );
  });
  //
  it("Should be able to recover passwd using email", async () => {
    const sendMail = jest.spyOn(fakeQueueProvider, "add");

    await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await forgotPasswdEmail.execute({
      email: "rewifetri@gmail.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });
  //
  it("Should not be able to recover passwd using invalid email", async () => {
    await expect(
      forgotPasswdEmail.execute({
        email: "non-existant-email",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should generate forgot passwd token", async () => {
    const generateToken = jest.spyOn(
      fakePassRecoveryTokenRepository,
      "generate"
    );

    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await forgotPasswdEmail.execute({
      email: "rewifetri@gmail.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
