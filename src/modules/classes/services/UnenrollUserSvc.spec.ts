import AppError from "@shared/errors/AppError";
import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";
import EnrollUser from "./EnrollUser";
import UnenrollUserSvc from "./UnenrollUserSvc";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";
import User from "@modules/users/infra/typeorm/entities/User";
import Class from "@modules/classes/infra/typeorm/entities/Class";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let enrollUser: EnrollUser;
let unenrollUserSvc: UnenrollUserSvc;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;
let user0: User;
let user1: User;
let class0: Class;
let class1: Class;

describe("Unenroll user of class", () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
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
    enrollUser = new EnrollUser(
      fakeClassesRepository,
      fakeUsersRepository,
      fakeNotificationsRepository
    );
    unenrollUserSvc = new UnenrollUserSvc(fakeClassesRepository);

    user0 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    user1 = await createUser.execute({
      name: "Reinaldo2",
      email: "rewifetri2@gmail.com",
      passwd: "123456",
    });

    await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user0.id,
    });

    class0 = await createClass.execute({
      date: new Date(2025, 0, 15, 15),
      tutorId: user0.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    class1 = await createClass.execute({
      date: new Date(2025, 0, 15, 16),
      tutorId: user0.id,
      description: "Test description",
      techs: ["nodejs"],
    });
  });
  //
  it("Should be able to unenroll user of classes", async () => {
    await enrollUser.execute({
      classId: class0.id,
      tutorId: user0.id,
      userId: user1.id,
    });

    await expect(
      unenrollUserSvc.execute({
        classId: class0.id,
        userId: user1.id,
      })
    ).resolves.toBe(true);
  });
  //
  it("Should not be able to unenroll user with missing info", async () => {
    await expect(
      unenrollUserSvc.execute({
        classId: "",
        userId: "userId",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      unenrollUserSvc.execute({
        classId: "classId",
        userId: "",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to unenroll user of invalid class", async () => {
    await expect(
      unenrollUserSvc.execute({
        classId: "invalidId",
        userId: "userId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to unenroll user if it is not enrolled", async () => {
    await expect(
      unenrollUserSvc.execute({
        classId: class0.id,
        userId: "userId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
