import AppError from "@shared/errors/AppError";
import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;

describe("Create Class", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    fakeTechsRepository = new FakeTechsRepository();
    createTech = new CreateTech(fakeTechsRepository, fakeUsersRepository);
    fakeClassesRepository = new FakeClassesRepository();
    createClass = new CreateClass(
      fakeClassesRepository,
      fakeUsersRepository,
      fakeTechsRepository
    );
  });
  //
  it("Should be able to create a new class", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    user.admin = true;

    await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user.id,
    });

    const _class = await createClass.execute({
      date: new Date(),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    expect(_class).toHaveProperty("id");
    expect(_class.tutor.id).toBe(user.id);
    expect(_class.techs).toHaveLength(1);
  });
  //
  it("Should not be able to create a new class in the same hour", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    user.admin = true;

    await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user.id,
    });

    await createClass.execute({
      date: new Date(),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    await expect(
      createClass.execute({
        date: new Date(),
        tutorId: user.id,
        description: "description",
        techs: ["nodejs"],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new class with invalid techs", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await expect(
      createClass.execute({
        date: new Date(),
        tutorId: user.id,
        description: "description",
        techs: ["invalidTech"],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new class with description length bigger than 200 chars", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    user.admin = true;

    await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user.id,
    });

    await expect(
      createClass.execute({
        date: new Date(),
        tutorId: user.id,
        description:
          "Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description.",
        techs: ["nodejs"],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new class with missing info.", async () => {
    await expect(
      createClass.execute({
        date: undefined,
        tutorId: "userId",
        description: "Test description",
        techs: ["nodejs"],
      })
    ).rejects.toBeInstanceOf(AppError);
    //
    await expect(
      createClass.execute({
        date: new Date(),
        tutorId: "",
        description: "Test description",
        techs: ["nodejs"],
      })
    ).rejects.toBeInstanceOf(AppError);
    //
    await expect(
      createClass.execute({
        date: new Date(),
        tutorId: "userId",
        description: "",
        techs: ["nodejs"],
      })
    ).rejects.toBeInstanceOf(AppError);
    //
    await expect(
      createClass.execute({
        date: new Date(),
        tutorId: "userId",
        description: "Test description",
        techs: [],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new class with invalid tutor id.", async () => {
    await expect(
      createClass.execute({
        date: new Date(),
        tutorId: "userId",
        description: "Test description",
        techs: [],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
