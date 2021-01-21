import AppError from "../../../shared/errors/AppError";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";
import FakeTechsRepository from "../repositories/fakes/FakeTechsRepository";
import CreateTech from "./CreateTech";

let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;

describe("Create User", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    fakeTechsRepository = new FakeTechsRepository();
    createTech = new CreateTech(fakeTechsRepository, fakeUsersRepository);
  });
  //
  it("Should be able to create a new tech", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const tech = await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user.id,
    });

    expect(tech.name).toBe("nodejs");
  });
  //
  it("Should not be able to create tech if user is not admin or invalid", async () => {
    const user = await createUser.execute({
      name: "Other",
      email: "other@gmail.com",
      passwd: "123456",
    });

    await expect(
      createTech.execute({
        name: "nodejs",
        image: "testImage",
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createTech.execute({
        name: "nodejs",
        image: "testImage",
        userId: "invalidUser",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create tech with missing info", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await expect(
      createTech.execute({
        name: "",
        image: "testImage",
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createTech.execute({
        name: "nodejs",
        image: "",
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createTech.execute({
        name: "nodejs",
        image: "testImage",
        userId: "",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create tech with existing name", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user.id,
    });

    await expect(
      createTech.execute({
        name: "nodejs",
        image: "testImage",
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
