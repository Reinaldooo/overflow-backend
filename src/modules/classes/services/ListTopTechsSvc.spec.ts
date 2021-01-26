import FakeClassesRepository from "@modules/classes/repositories/fakes/FakeClassesRepository";
import CreateClass from "@modules/classes/services/CreateClass";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import ListTopTechsSvc from "@modules/classes/services/ListTopTechsSvc";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";
import User from "@modules/users/infra/typeorm/entities/User";
import Class from "@modules/classes/infra/typeorm/entities/Class";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let listTopTechsSvc: ListTopTechsSvc;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let user0: User;
let class0: Class;
let class1: Class;
let class2: Class;

describe("List Techs with more classes", () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    fakeTechsRepository = new FakeTechsRepository();
    createTech = new CreateTech(fakeTechsRepository, fakeUsersRepository);
    fakeClassesRepository = new FakeClassesRepository();
    listTopTechsSvc = new ListTopTechsSvc(
      fakeClassesRepository,
      fakeCacheProvider
    );
    createClass = new CreateClass(
      fakeClassesRepository,
      fakeUsersRepository,
      fakeTechsRepository,
      fakeCacheProvider
    );

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

    await createTech.execute({
      name: "graphql",
      image: "testImage",
      userId: user0.id,
    });

    class0 = await createClass.execute({
      date: new Date(2025, 0, 15, 15),
      tutorId: user0.id,
      description: "Test description",
      techs: ["nodejs", "reactjs"],
    });

    class1 = await createClass.execute({
      date: new Date(2025, 0, 15, 16),
      tutorId: user0.id,
      description: "Test description",
      techs: ["nodejs", "reactjs"],
    });

    class2 = await createClass.execute({
      date: new Date(2025, 0, 15, 17),
      tutorId: user0.id,
      description: "Test description",
      techs: ["nodejs", "graphql"],
    });
  });
  //
  it("Should be able to list top classes", async () => {
    const topTechsMock = [
      {
        name: "nodejs",
        amount: "3",
      },
      {
        name: "reactjs",
        amount: "2",
      },
      {
        name: "graphql",
        amount: "1",
      },
    ];
    await expect(listTopTechsSvc.execute()).resolves.toEqual(topTechsMock);
  });
});
