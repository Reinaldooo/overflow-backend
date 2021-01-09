import AppError from "@shared/errors/AppError";
import FakeCalendarsRepository from "../repositories/fakes/FakeCalendarsRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateCalendar from "./CreateCalendar";
import CreateUser from "@modules/users/services/CreateUser";

let fakeCalendarsRepository: FakeCalendarsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createCalendar: CreateCalendar;
let createUser: CreateUser;

describe("Create Calendar", () => {
  beforeEach(() => {
    fakeCalendarsRepository = new FakeCalendarsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createCalendar = new CreateCalendar(
      fakeCalendarsRepository,
      fakeUsersRepository
    );
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
  });
  //
  it("Should be able to create a new calendar", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const calendarId = await createCalendar.execute({
      userId: user.id,
      name: "Trabalho",
    });

    expect(calendarId).toBeTruthy();
  });
  //
  it("Should not be able to create a new calendar without name or userId", async () => {
    await expect(
      createCalendar.execute({
        userId: "99572649-f0a4-469f-b11b-f23ee0a5bf58",
        name: "",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createCalendar.execute({
        userId: undefined,
        name: "Trabalho",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new calendar if userId is invalid", async () => {
    await expect(
      createCalendar.execute({
        userId: "testId",
        name: "test",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("User should not be able to create two calendars with the same name", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await createCalendar.execute({
      userId: user.id,
      name: "Trabalho",
    });

    await expect(
      createCalendar.execute({
        userId: user.id,
        name: "Trabalho",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
