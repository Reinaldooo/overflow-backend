import AppError from "@shared/errors/AppError";
import FakeEventsRepository from "../repositories/fakes/FakeEventsRepository";
import CreateEvent from "./CreateEvent";

let fakeEventsRepository: FakeEventsRepository;
let createEvent: CreateEvent;

describe("Create Event", () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    createEvent = new CreateEvent(fakeEventsRepository);
  });
  //
  it("Should be able to create a new event", async () => {
    const event = await createEvent.execute({
      date: new Date(),
      userId: "testId",
      calendarId: "testCalendarId",
    });

    expect(event).toHaveProperty("id");
    expect(event.userId).toBe("testId");
    expect(event.calendarId).toBe("testCalendarId");
  });
  //
  it("Should not be able to create a new event in the same date", async () => {
    const eventDate = new Date();

    await createEvent.execute({
      date: eventDate,
      userId: "testId",
      calendarId: "testCalendarId",
    });

    await expect(
      createEvent.execute({
        date: eventDate,
        userId: "testId",
        calendarId: "testCalendarId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new event if complete info are not provided", async () => {
    const eventDate = new Date();

    await expect(
      createEvent.execute({
        date: eventDate,
        userId: undefined,
        calendarId: "testCalendarId",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createEvent.execute({
        date: undefined,
        userId: "testId",
        calendarId: "testCalendarId",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createEvent.execute({
        date: eventDate,
        userId: "testId",
        calendarId: undefined,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
