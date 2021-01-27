import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakePassRecoveryTokenRepository from "../repositories/fakes/FakePassRecoveryTokenRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import ResetPasswd from "./ResetPasswd";

let fakeUsersRepository: FakeUsersRepository;
let resetPasswd: ResetPasswd;
let fakePassRecoveryTokenRepository: FakePassRecoveryTokenRepository;
let fakeHashProvider: FakeHashProvider;

describe("Reset Password", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePassRecoveryTokenRepository = new FakePassRecoveryTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswd = new ResetPasswd(
      fakeUsersRepository,
      fakePassRecoveryTokenRepository,
      fakeHashProvider
    );
  });
  //
  it("Should be able to reset password", async () => {
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const { id: tokenId } = await fakePassRecoveryTokenRepository.generate(
      user.id
    );
    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPasswd.execute({
      tokenId,
      passwd: "newpass",
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    const token = await fakePassRecoveryTokenRepository.findById(tokenId);

    expect(generateHash).toHaveBeenCalledWith("newpass");
    expect(updatedUser?.passwd).toBe("newpass");
    expect(token).toBeFalsy();
  });
  //
  it("Should not be able to reset password with invalid token", async () => {
    await expect(
      resetPasswd.execute({
        tokenId: "invalid",
        passwd: "newpass",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to reset password with invalid user", async () => {
    const { id: tokenId } = await fakePassRecoveryTokenRepository.generate(
      "invalid user id"
    );
    await expect(
      resetPasswd.execute({
        tokenId,
        passwd: "newpass",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to reset password after 2 hours", async () => {
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const token = await fakePassRecoveryTokenRepository.generate(user.id);

    // Add 2 hours to token creation time
    token.createdAt = new Date(
      token.createdAt.setMinutes(token.createdAt.getMinutes() + 121)
    );

    await expect(
      resetPasswd.execute({
        tokenId: token.id,
        passwd: "newpass",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
