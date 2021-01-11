import AppError from "@shared/errors/AppError";
import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";
import ListMyClassesSvc from "./ListMyClassesSvc";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUser from "@modules/users/services/CreateUser";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let listMyClassesSvc: ListMyClassesSvc;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;

describe("List user classes", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    fakeTechsRepository = new FakeTechsRepository();
    createTech = new CreateTech(fakeTechsRepository, fakeUsersRepository);
    fakeClassesRepository = new FakeClassesRepository();
    createClass = new CreateClass(fakeClassesRepository, fakeTechsRepository);
    listMyClassesSvc = new ListMyClassesSvc(fakeClassesRepository);
  });
  //
  it("Should be able to list all user classes", async () => {
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
      date: new Date(2021, 0, 15, 15),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    await createClass.execute({
      date: new Date(2021, 0, 15, 16),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    const classes = await listMyClassesSvc.execute(user.id);

    expect(classes.teaching).toHaveLength(2);
    expect(classes.studying).toHaveLength(0);
  });
});