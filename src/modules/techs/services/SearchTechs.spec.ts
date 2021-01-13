import AppError from "../../../shared/errors/AppError";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeTechsRepository from "@modules/techs/repositories/fakes/FakeTechsRepository";
import CreateUser from "@modules/users/services/CreateUser";
import SearchTechs from "./SearchTechs";
import CreateTech from "./CreateTech";

let fakeUsersRepository: FakeUsersRepository;
let fakeTechsRepository: FakeTechsRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let createTech: CreateTech;
let searchTechs: SearchTechs;

describe("Search Techs", () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTechsRepository = new FakeTechsRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    createTech = new CreateTech(fakeTechsRepository, fakeUsersRepository);
    searchTechs = new SearchTechs(fakeTechsRepository);

    const user = await createUser.execute({
      name: "reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });
    user.admin = true;

    await createTech.execute({
      name: "nodejs",
      image: "image",
      userId: user.id,
    });

    await createTech.execute({
      name: "node",
      image: "image",
      userId: user.id,
    });

    await createTech.execute({
      name: "graphql",
      image: "image",
      userId: user.id,
    });

    await createTech.execute({
      name: "reactjs",
      image: "image",
      userId: user.id,
    });
  });
  //
  it("Should be able to search for techs", async () => {
    await expect(searchTechs.execute("gra")).resolves.toHaveLength(1);
    await expect(searchTechs.execute("reac")).resolves.toHaveLength(1);
    await expect(searchTechs.execute("nod")).resolves.toHaveLength(2);
  });
  //
  it("Should not be able to search without search query", async () => {
    await expect(searchTechs.execute("")).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to search with a query smaller than 3 chars", async () => {
    await expect(searchTechs.execute("re")).rejects.toBeInstanceOf(AppError);
  });
});
