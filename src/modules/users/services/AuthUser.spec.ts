import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUser from "./CreateUser";
import AuthUser from "./AuthUser";

describe("Auth User", () => {
  it("Should be able to auth user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    const authUser = new AuthUser(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const res = await authUser.execute({
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    expect(res).toHaveProperty("token");
    expect(res.user).toEqual(user);
  });
  it("Should not be able to auth invalid user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUser = new AuthUser(fakeUsersRepository, fakeHashProvider);

    await expect(
      authUser.execute({
        email: "rewifetri@gmail.com",
        passwd: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to auth user with incorrect passwd", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    const authUser = new AuthUser(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await expect(
      authUser.execute({
        email: "rewifetri@gmail.com",
        passwd: "incorrect",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
