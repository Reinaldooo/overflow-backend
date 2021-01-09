import AppError from "@shared/errors/AppError";
import FakeEventsRepository from "../repositories/fakes/FakeEventsRepository";
import FakeCalendarsRepository from "@modules/calendars/repositories/fakes/FakeCalendarsRepository";
import CreateEvent from "./CreateEvent";
import ListEventsInMonthByCalendar from "./ListEventsInMonthByCalendar";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateUser from "@modules/users/services/CreateUser";

let fakeEventsRepository: FakeEventsRepository;
let createEvent: CreateEvent;
let fakeCalendarsRepository: FakeCalendarsRepository;
let listEventsInMonthByCalendar: ListEventsInMonthByCalendar;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;

describe("List events in month by calendar id", () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    createEvent = new CreateEvent(fakeEventsRepository);
    fakeCalendarsRepository = new FakeCalendarsRepository();
    listEventsInMonthByCalendar = new ListEventsInMonthByCalendar(
      fakeCalendarsRepository,
      fakeEventsRepository
    );
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
  });
  //
  it("Should be able to list events in a month from a given calendar id", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const calendarId = await fakeCalendarsRepository.create({
      name: "TestCalendar",
      user,
    });

    // January
    await createEvent.execute({
      date: new Date(2021, 0, 15, 10),
      userId: "testId",
      calendarId,
    });
    await createEvent.execute({
      date: new Date(2021, 0, 15, 11),
      userId: "testId",
      calendarId,
    });
    // February
    await createEvent.execute({
      date: new Date(2021, 1, 15, 11),
      userId: "testId",
      calendarId,
    });
    // march
    await createEvent.execute({
      date: new Date(2021, 2, 15, 11),
      userId: "testId",
      calendarId,
    });

    const eventsInJanuary = await listEventsInMonthByCalendar.execute({
      month: 1,
      year: 2021,
      calendarId,
      userId: user.id,
    });

    const eventsInMarch = await listEventsInMonthByCalendar.execute({
      month: 3,
      year: 2021,
      calendarId,
      userId: user.id,
    });

    expect(eventsInJanuary).toHaveLength(2);
    expect(eventsInMarch).toHaveLength(1);
  });
  //
  it("Only users included in the calendar should be able to list it's events", async () => {
    const user = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const wrongUser = await createUser.execute({
      name: "Reinaldo",
      email: "rewifetri2@gmail.com",
      passwd: "123456",
    });

    const calendarId = await fakeCalendarsRepository.create({
      name: "TestCalendar",
      user,
    });

    await createEvent.execute({
      date: new Date(2021, 0, 15, 10),
      userId: user.id,
      calendarId,
    });

    await expect(
      listEventsInMonthByCalendar.execute({
        month: 1,
        year: 2021,
        calendarId,
        userId: user.id,
      })
    ).resolves.toHaveLength(1);

    // User not included in the calendar must not be able to list it's events
    await expect(
      listEventsInMonthByCalendar.execute({
        month: 1,
        year: 2021,
        calendarId,
        userId: wrongUser.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to list events with missing parameters", async () => {
    await expect(
      listEventsInMonthByCalendar.execute({
        month: undefined,
        year: 2021,
        calendarId: "testId",
        userId: "testId",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      listEventsInMonthByCalendar.execute({
        month: 1,
        year: undefined,
        calendarId: "testId",
        userId: "testId",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      listEventsInMonthByCalendar.execute({
        month: 1,
        year: 2021,
        calendarId: undefined,
        userId: "testId",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      listEventsInMonthByCalendar.execute({
        month: 1,
        year: 2021,
        calendarId: "testId",
        userId: undefined,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to list events with invalid calendar id", async () => {
    await expect(
      listEventsInMonthByCalendar.execute({
        month: 1,
        year: 2021,
        calendarId: "invalidId",
        userId: "testId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
