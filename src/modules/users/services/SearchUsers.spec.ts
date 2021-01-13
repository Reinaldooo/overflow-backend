import AppError from "../../../shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUser from "./CreateUser";
import SearchUsers from "./SearchUsers";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let searchUsers: SearchUsers;

describe("Search Users", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    searchUsers = new SearchUsers(fakeUsersRepository);
  });
  //
  it("Should be able to search for users", async () => {
    await createUser.execute({
      name: "reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });
    await createUser.execute({
      name: "reginaldo",
      email: "regifetri@gmail.com",
      passwd: "123456",
    });
    await createUser.execute({
      name: "felipe",
      email: "felipe@gmail.com",
      passwd: "123456",
    });

    await expect(searchUsers.execute("eli")).resolves.toHaveLength(1);
    await expect(searchUsers.execute("naldo")).resolves.toHaveLength(2);
  });
  //
  it("Should not be able to search without search query", async () => {
    await createUser.execute({
      name: "reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await expect(searchUsers.execute("")).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to search with a query smaller than 3 chars", async () => {
    await expect(searchUsers.execute("re")).rejects.toBeInstanceOf(AppError);
  });
});
