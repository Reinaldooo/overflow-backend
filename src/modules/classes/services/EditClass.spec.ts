import AppError from "@shared/errors/AppError";
import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";
import EditClass from "./EditClass";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";
import User from "@modules/users/infra/typeorm/entities/User";
import Class from "../infra/typeorm/entities/Class";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let editClass: EditClass;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;
let user: User;
let class0: Class;

describe("Edit Class", () => {
  beforeEach(async () => {
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
    editClass = new EditClass(
      fakeClassesRepository,
      fakeUsersRepository,
      fakeTechsRepository
    );

    user = await createUser.execute({
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

    await createTech.execute({
      name: "graphql",
      image: "testImage",
      userId: user.id,
    });

    class0 = await createClass.execute({
      date: new Date(2025, 0, 14, 14),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });
  });
  //
  it("Should be able to edit a class", async () => {
    const updatedClass = await editClass.execute({
      date: new Date(2025, 0, 14, 15),
      tutorId: user.id,
      description: "New description",
      techs: ["nodejs", "graphql"],
      classId: class0.id,
    });

    expect(updatedClass).toHaveProperty("id");
    expect(updatedClass.description).toBe("New description");
    expect(updatedClass.techs).toHaveLength(2);
    expect(updatedClass.date.getHours()).toBe(15);
  });
  //
  it("Should not be able to edit a invalid class", async () => {
    await expect(
      editClass.execute({
        date: new Date(2019, 0, 14, 15),
        tutorId: user.id,
        description: "description",
        techs: ["nodejs"],
        classId: "invalid",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to edit class date to a already used date", async () => {
    const class1 = await createClass.execute({
      date: new Date(2025, 0, 14, 15),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: user.id,
        description: "new description",
        techs: ["nodejs", "graphql"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to edit class with invalid techs", async () => {
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: user.id,
        description: "new description",
        techs: ["invalid"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to edit class with description length bigger than 200 chars", async () => {
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: user.id,
        description:
          "Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description.",
        techs: ["nodejs"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to edit class with missing info.", async () => {
    await expect(
      editClass.execute({
        date: undefined,
        tutorId: user.id,
        description:
          "Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description.",
        techs: ["nodejs"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
    //
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: undefined,
        description:
          "Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description.",
        techs: ["nodejs"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
    //
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: user.id,
        description: "",
        techs: ["nodejs"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
    //
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: user.id,
        description: "description",
        techs: [],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
    // //
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: user.id,
        description: "description",
        techs: ["nodejs"],
        classId: "",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to edit class with more than 4 techs.", async () => {
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: user.id,
        description: "description",
        techs: ["nodejs", "nodejs", "nodejs", "nodejs", "nodejs"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to edit class to a date in the past.", async () => {
    await expect(
      editClass.execute({
        date: new Date(2019, 0, 14, 15),
        tutorId: user.id,
        description: "description",
        techs: ["nodejs"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to edit class with invalid tutor id.", async () => {
    await expect(
      editClass.execute({
        date: new Date(2025, 0, 14, 15),
        tutorId: "Invalid",
        description: "description",
        techs: ["nodejs"],
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
