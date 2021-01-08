import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileSvc from "./ShowProfileSvc";

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileSvc;

describe("ShowUserProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileSvc(fakeUsersRepository);
  });

  it("should be able to show the user profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile.name).toBe("Reinaldo");
    expect(profile.email).toBe("rewifetri@gmail.com");
  });

  it("should not be able to show the profile from non-existing user", async () => {
    await expect(
      showProfile.execute({
        userId: "non-existing-user-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
