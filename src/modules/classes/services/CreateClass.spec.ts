import AppError from "@shared/errors/AppError";
import FakeClassesRepository from "../repositories/fakes/FakeClassesRepository";
import CreateClass from "./CreateClass";

let fakeClassesRepository: FakeClassesRepository;
let createClass: CreateClass;

describe("Create Class", () => {
  beforeEach(() => {
    fakeClassesRepository = new FakeClassesRepository();
    createClass = new CreateClass(fakeClassesRepository);
  });
  //
  it("Should be able to create a new class", async () => {
    const class = await createClass.execute({
      date: new Date(),
      userId: "testId",
      calendarId: "testCalendarId",
    });

    expect(class).toHaveProperty("id");
    expect(class.userId).toBe("testId");
    expect(class.calendarId).toBe("testCalendarId");
  });
  //
  it("Should not be able to create a new class in the same date", async () => {
    const classDate = new Date();

    await createClass.execute({
      date: classDate,
      userId: "testId",
      calendarId: "testCalendarId",
    });

    await expect(
      createClass.execute({
        date: classDate,
        userId: "testId",
        calendarId: "testCalendarId",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //
  it("Should not be able to create a new class if complete info are not provided", async () => {
    const classDate = new Date();

    await expect(
      createClass.execute({
        date: classDate,
        userId: undefined,
        calendarId: "testCalendarId",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createClass.execute({
        date: undefined,
        userId: "testId",
        calendarId: "testCalendarId",
      })
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createClass.execute({
        date: classDate,
        userId: "testId",
        calendarId: undefined,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
