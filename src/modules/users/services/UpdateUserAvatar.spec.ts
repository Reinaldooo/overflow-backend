import AppError from "../../../shared/errors/AppError";

import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateUserAvatar from "./UpdateUserAvatar";

describe("Update Avatar", () => {
  it("Should be able to update user avatar", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider
    );

    // The fake users repo was used here because this test focus is not on the
    // user creation
    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarName: "avatar.jpg",
    });

    // As "user" is in memory, by updating it above, i can check if it has the
    // correct avatar name below
    expect(user.avatar).toBe("avatar.jpg");
  });
  it("Should not be able to update avatar of invalid user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider
    );

    expect(
      updateUserAvatar.execute({
        userId: "invalid-id",
        avatarName: "avatar.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("Should delete old avatar if it exists before updating it", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider
    );

    // The function spyOn will track if a function as called
    const deleteFile = jest.spyOn(fakeStorageProvider, "delete");

    const user = await fakeUsersRepository.create({
      name: "Reinaldo",
      email: "rewifetri@gmail.com",
      passwd: "123456",
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarName: "avatar.jpg",
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarName: "avatar2.jpg",
    });

    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg");
    expect(user.avatar).toBe("avatar2.jpg");
  });
});
