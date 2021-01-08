import AppError from "@shared/errors/AppError";
import FakeCalendarsRepository from "@modules/calendars/repositories/fakes/FakeCalendarsRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateCalendar from "@modules/calendars/services/CreateCalendar";
import ShowUserCalendarsSvc from "./ShowUserCalendarsSvc";
import CreateUser from "@modules/users/services/CreateUser";

let fakeCalendarsRepository: FakeCalendarsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createCalendar: CreateCalendar;
let showUserCalendarsSvc: ShowUserCalendarsSvc;
let createUser: CreateUser;

describe("Show User Calendars", () => {
  beforeEach(() => {
    fakeCalendarsRepository = new FakeCalendarsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createCalendar = new CreateCalendar(
      fakeCalendarsRepository,
      fakeUsersRepository
    );
    showUserCalendarsSvc = new ShowUserCalendarsSvc(fakeCalendarsRepository);
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
  });
  //
  it("Should be able to show user calendars", async () => {
    const user1 = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const user2 = await createUser.execute({
      name: "Tester",
      email: "tester@gmail.com",
      passwd: "123456",
    });

    await createCalendar.execute({
      userId: user1.id,
      name: "Trabalho",
    });

    await createCalendar.execute({
      userId: user1.id,
      name: "Família",
    });

    await createCalendar.execute({
      userId: user2.id,
      name: "Família",
    });

    const user1Calendars = await showUserCalendarsSvc.execute(user1.id);

    expect(user1Calendars).toHaveLength(2);
  });
  //
  it("Should not be able to show calendars of empty users id", async () => {
    await expect(showUserCalendarsSvc.execute("")).rejects.toBeInstanceOf(
      AppError
    );
  });
});
