import AppError from "@shared/errors/AppError";
import FakeCalendarsRepository from "../repositories/fakes/FakeCalendarsRepository";
import CreateCalendar from "./CreateCalendar";

let fakeCalendarsRepository: FakeCalendarsRepository;
let createCalendar: CreateCalendar;

describe("Create Calendar", () => {
  beforeEach(() => {
    fakeCalendarsRepository = new FakeCalendarsRepository();
    createCalendar = new CreateCalendar(fakeCalendarsRepository);
  });
  //
  it("Should be able to create a new calendar", async () => {
    const calendar = await createCalendar.execute({
      date: new Date(),
      userId: "testId",
    });

    expect(calendar).toHaveProperty("id");
    expect(calendar.userId).toBe("testId");
  });
  //
  it("Should not be able to create a new calendar in the same date", async () => {
    const eventDate = new Date();

    await createCalendar.execute({
      date: eventDate,
      userId: "testId",
    });

    await expect(
      createCalendar.execute({
        date: eventDate,
        userId: "testId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new calendar if date or userId are not provided", async () => {
    const eventDate = new Date();

    await expect(
      createCalendar.execute({
        date: eventDate,
        userId: undefined,
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createCalendar.execute({
        userId: "testId",
        date: undefined,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
