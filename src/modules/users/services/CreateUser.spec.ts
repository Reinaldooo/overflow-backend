import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUser from "./CreateUser";

describe("Create User", () => {
  it("Should be able to create a new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUser(fakeUsersRepository);

    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user with a existent email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUser(fakeUsersRepository);

    await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    expect(
      createUser.execute({
        name: "Reinaldo",
        email: "rewifetri@gmail.com",
        passwd: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
