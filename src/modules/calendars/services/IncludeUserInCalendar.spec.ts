import AppError from "@shared/errors/AppError";
import FakeCalendarsRepository from "../repositories/fakes/FakeCalendarsRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import IncludeUserInCalendar from "./IncludeUserInCalendar";
import CreateCalendar from "./CreateCalendar";
import CreateUser from "@modules/users/services/CreateUser";

let fakeCalendarsRepository: FakeCalendarsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let includeUserInCalendar: IncludeUserInCalendar;
let createCalendar: CreateCalendar;
let createUser: CreateUser;

describe("Include User in Calendar", () => {
  beforeEach(() => {
    fakeCalendarsRepository = new FakeCalendarsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    includeUserInCalendar = new IncludeUserInCalendar(
      fakeCalendarsRepository,
      fakeUsersRepository
    );
    createCalendar = new CreateCalendar(
      fakeCalendarsRepository,
      fakeUsersRepository
    );
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
  });
  //
  it("Should be able to include user in calendar", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const calendar = await createCalendar.execute({
      userId: user.id,
      name: "Trabalho",
    });

    const newUser = await createUser.execute({
      name: "Reinaldo2",
      email: "rewifetri2@gmail.com",
      passwd: "123456",
    });

    await includeUserInCalendar.execute({
      userId: newUser.id,
      calendarId: calendar.id,
    });

    expect(calendar).toHaveProperty("id");
    expect(calendar.users[0].id).toBe(user.id);
    expect(calendar.users[1].id).toBe(newUser.id);
  });
  //
  it("Should not be able to include invalid user to calendar", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const calendar = await createCalendar.execute({
      userId: user.id,
      name: "Trabalho",
    });

    await expect(
      includeUserInCalendar.execute({
        userId: "invalid",
        calendarId: calendar.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to include user if the calendar already have 5 users", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const user1 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri1@gmail.com",
      passwd: "123456",
    });

    const user2 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri2@gmail.com",
      passwd: "123456",
    });

    const user3 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri3@gmail.com",
      passwd: "123456",
    });

    const user4 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri4@gmail.com",
      passwd: "123456",
    });

    const user5 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri5@gmail.com",
      passwd: "123456",
    });

    const calendar = await createCalendar.execute({
      userId: user.id,
      name: "Trabalho",
    });

    await includeUserInCalendar.execute({
      userId: user1.id,
      calendarId: calendar.id,
    });

    await includeUserInCalendar.execute({
      userId: user2.id,
      calendarId: calendar.id,
    });

    await includeUserInCalendar.execute({
      userId: user3.id,
      calendarId: calendar.id,
    });

    await includeUserInCalendar.execute({
      userId: user4.id,
      calendarId: calendar.id,
    });

    await expect(
      includeUserInCalendar.execute({
        userId: user5.id,
        calendarId: calendar.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
