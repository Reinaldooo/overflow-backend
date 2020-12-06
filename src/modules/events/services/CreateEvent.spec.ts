import AppError from "@shared/errors/AppError";
import FakeEventsRepository from "../repositories/fakes/FakeEventsRepository";
import CreateEvent from "./CreateEvent";

describe("Create Event", () => {
  it("Should be able to create a new event", async () => {
    const fakeEventsRepository = new FakeEventsRepository();
    const createEvent = new CreateEvent(fakeEventsRepository);

    const event = await createEvent.execute({
      date: new Date(),
      userId: "testId",
    });

    expect(event).toHaveProperty("id");
    expect(event.userId).toBe("testId");
  });

  it("Should not be able to create a new event in the same date", async () => {
    const fakeEventsRepository = new FakeEventsRepository();
    const createEvent = new CreateEvent(fakeEventsRepository);

    const eventDate = new Date();

    await createEvent.execute({
      date: eventDate,
      userId: "testId",
    });

    await expect(
      createEvent.execute({
        date: eventDate,
        userId: "testId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new event if date or userId are not provided", async () => {
    const fakeEventsRepository = new FakeEventsRepository();
    const createEvent = new CreateEvent(fakeEventsRepository);

    const eventDate = new Date();

    await expect(
      createEvent.execute({
        date: eventDate,
        userId: undefined,
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createEvent.execute({
        userId: "testId",
        date: undefined,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
