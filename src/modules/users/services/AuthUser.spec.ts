import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUser from "./CreateUser";
import AuthUser from "./AuthUser";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authUser: AuthUser;
let createUser: CreateUser;

describe("Auth User", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    authUser = new AuthUser(fakeUsersRepository, fakeHashProvider);
  });
  //
  it("Should be able to auth user", async () => {
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
  //
  it("Should not be able to auth invalid user", async () => {
    await expect(
      authUser.execute({
        email: "rewifetri@gmail.com",
        passwd: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to auth user with incorrect passwd", async () => {
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
