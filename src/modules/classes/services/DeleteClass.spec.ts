import AppError from "@shared/errors/AppError";
import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";
import DeleteClass from "./DeleteClass";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";
import User from "@modules/users/infra/typeorm/entities/User";
import Class from "../infra/typeorm/entities/Class";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let deleteClass: DeleteClass;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;
let user: User;
let class0: Class;

describe("Delete Class", () => {
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
    deleteClass = new DeleteClass(fakeClassesRepository, fakeUsersRepository);

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
  it("Should be able to delete a class", async () => {
    const deletedClass = await deleteClass.execute({
      tutorId: user.id,
      classId: class0.id,
    });

    expect(deletedClass).toBe(true);
  });
  //
  it("Should not be able to delete a class with missing info", async () => {
    await expect(
      deleteClass.execute({
        tutorId: user.id,
        classId: "",
      })
    ).rejects.toBeInstanceOf(AppError);
    //
    await expect(
      deleteClass.execute({
        tutorId: "",
        classId: class0.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to delete a invalid class", async () => {
    await expect(
      deleteClass.execute({
        tutorId: user.id,
        classId: "invalidId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to delete class of other tutor.", async () => {
    const otherUser = await createUser.execute({
      name: "Other",
      email: "other@gmail.com",
      passwd: "123456",
    });

    const class1 = await createClass.execute({
      date: new Date(2025, 0, 14, 14),
      tutorId: otherUser.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    await expect(
      deleteClass.execute({
        tutorId: user.id,
        classId: class1.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
