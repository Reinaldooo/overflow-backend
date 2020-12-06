import AppError from "../../../shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUser from "./CreateUser";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;

describe("Create User", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
  });
  //
  it("Should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    expect(user).toHaveProperty("id");
  });
  //
  it("Should not be able to create a new user with a existent email", async () => {
    await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await expect(
      createUser.execute({
        name: "Reinaldo",
        email: "rewifetri@gmail.com",
        passwd: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
