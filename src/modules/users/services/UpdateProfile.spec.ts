import "dotenv/config";
//
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateProfileService from "./UpdateProfile";
import AuthUser from "./AuthUser";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authUser: AuthUser;
let updateProfileService: UpdateProfileService;

describe("UpdateUserProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
    authUser = new AuthUser(fakeUsersRepository, fakeHashProvider);
  });

  it("should be able to update the user profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: "Willian",
      email: "willian@gmail.com",
    });

    expect(updatedUser.name).toBe("Willian");
    expect(updatedUser.email).toBe("willian@gmail.com");
  });

  it("should not be able to change to a used email", async () => {
    await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const user = await fakeUsersRepository.create({
      name: "Test",
      email: "test@example.com",
      passwd: "123456",
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: "Test2",
        email: "rewifetri@gmail.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await updateProfileService.execute({
      userId: user.id,
      old_passwd: "123456",
      passwd: "123123",
    });

    const res = await authUser.execute({
      email: "rewifetri@gmail.com",
      passwd: "123123",
    });

    expect(res).toHaveProperty("token");
    expect(res.user.id).toBe(user.id);
  });

  it("should not be able to update the password without old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: "Test",
        email: "test@example.com",
        passwd: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: "Test",
        email: "test@example.com",
        old_passwd: "wrong-old-password",
        passwd: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the profile from non-existing user", async () => {
    await expect(
      updateProfileService.execute({
        userId: "non-existing-user-id",
        name: "Test",
        email: "test@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
