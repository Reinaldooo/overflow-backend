import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";
import ListMyClassesSvc from "./ListMyClassesSvc";
import EnrollUser from "./EnrollUser";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateTech from "@modules/techs/services/CreateTech";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import CreateUser from "@modules/users/services/CreateUser";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;
let listMyClassesSvc: ListMyClassesSvc;
let enrollUser: EnrollUser;
let fakeTechsRepository: FakeTechsRepository;
let createTech: CreateTech;
let fakeUsersRepository: FakeUsersRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createUser: CreateUser;
let fakeHashProvider: FakeHashProvider;

describe("List user classes", () => {
  beforeEach(() => {
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
    listMyClassesSvc = new ListMyClassesSvc(fakeClassesRepository);
    enrollUser = new EnrollUser(
      fakeClassesRepository,
      fakeUsersRepository,
      fakeNotificationsRepository
    );
  });
  //
  it("Should be able to list all user classes", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const user2 = await createUser.execute({
      name: "Reinaldo2",
      email: "rewifetri2@gmail.com",
      passwd: "123456",
    });

    await createTech.execute({
      name: "nodejs",
      image: "testImage",
      userId: user.id,
    });

    await createClass.execute({
      date: new Date(2025, 0, 15, 15),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    await createClass.execute({
      date: new Date(2025, 0, 15, 16),
      tutorId: user.id,
      description: "Test description",
      techs: ["nodejs"],
    });

    const classEnrolled = await createClass.execute({
      date: new Date(2025, 0, 15, 16),
      tutorId: user2.id,
      description: "Enrolled Test description",
      techs: ["nodejs"],
    });

    await enrollUser.execute({
      classId: classEnrolled.id,
      tutorId: user2.id,
      userId: user.id,
    });

    const classes = await listMyClassesSvc.execute(user.id);

    expect(classes.teaching).toHaveLength(2);
    expect(classes.studying).toHaveLength(1);
    expect(classes.studying[0].description).toBe("Enrolled Test description");
  });
});
