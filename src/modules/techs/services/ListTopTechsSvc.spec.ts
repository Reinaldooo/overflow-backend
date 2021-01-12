import FakeClassesRepository from "@modules/classes/repositories/fakes/FakeClassesRepository";
import CreateClass from "@modules/classes/services/CreateClass";
import EnrollUser from "@modules/classes/services/EnrollUser";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import ListTopTechsSvc from "@modules/techs/services/ListTopTechsSvc";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";
import User from "@modules/users/infra/typeorm/entities/User";
import Class from "@modules/classes/infra/typeorm/entities/Class";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let enrollUser: EnrollUser;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let listTopTechsSvc: ListTopTechsSvc;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;
let user0: User;
let class0: Class;
let class1: Class;

describe("List Techs with more classes", () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    fakeTechsRepository = new FakeTechsRepository();
    createTech = new CreateTech(fakeTechsRepository, fakeUsersRepository);
    listTopTechsSvc = new ListTopTechsSvc(fakeTechsRepository);
    fakeClassesRepository = new FakeClassesRepository();
    createClass = new CreateClass(fakeClassesRepository, fakeTechsRepository);
    enrollUser = new EnrollUser(fakeClassesRepository, fakeUsersRepository);

    user0 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    user0.admin = true;

    const nodejs = await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user0.id,
    });

    const reactjs = await createTech.execute({
      name: "reactjs",
      image: "testImage",
      userId: user0.id,
    });

    const graphql = await createTech.execute({
      name: "graphql",
      image: "testImage",
      userId: user0.id,
    });

    class0 = await createClass.execute({
      date: new Date(2021, 0, 15, 15),
      tutorId: user0.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    class1 = await createClass.execute({
      date: new Date(2021, 0, 15, 16),
      tutorId: user0.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    nodejs.classes.push(class0);
    nodejs.classes.push(class1);
    reactjs.classes.push(class1);
  });
  //
  it("Should be able to list top classes", async () => {
    const topTechsMock = [
      {
        name: "nodejs",
        amount: "2",
      },
      {
        name: "reactjs",
        amount: "1",
      },
      {
        name: "graphql",
        amount: "0",
      },
    ];

    await expect(listTopTechsSvc.execute()).resolves.toEqual(topTechsMock);
  });
});
