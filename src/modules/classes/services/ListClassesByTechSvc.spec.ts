import AppError from "@shared/errors/AppError";
import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";
import ListClassesByTechSvc from "./ListClassesByTechSvc";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";
import User from "@modules/users/infra/typeorm/entities/User";
import Class from "@modules/classes/infra/typeorm/entities/Class";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let listClassesByTechSvc: ListClassesByTechSvc;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let user0: User;
let class0: Class;
let class1: Class;
let class2: Class;

describe("List classes by tech", () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    fakeTechsRepository = new FakeTechsRepository();
    createTech = new CreateTech(fakeTechsRepository, fakeUsersRepository);
    fakeClassesRepository = new FakeClassesRepository();
    createClass = new CreateClass(
      fakeClassesRepository,
      fakeUsersRepository,
      fakeTechsRepository,
      fakeCacheProvider
    );
    listClassesByTechSvc = new ListClassesByTechSvc(fakeClassesRepository);

    user0 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user0.id,
    });

    await createTech.execute({
      name: "reactjs",
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

    class2 = await createClass.execute({
      date: new Date(2025, 0, 15, 17),
      tutorId: user0.id,
      description: "Test description",
      techs: ["reactjs"],
    });
  });
  //
  it("Should be able to list classes by technology", async () => {
    await expect(listClassesByTechSvc.execute("nodejs")).resolves.toHaveLength(
      2
    );

    await expect(listClassesByTechSvc.execute("reactjs")).resolves.toHaveLength(
      1
    );
  });
  //
  it("Should not be able to list classes without technology name", async () => {
    await expect(listClassesByTechSvc.execute("")).rejects.toBeInstanceOf(
      AppError
    );
  });
});
