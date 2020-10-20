import { Router } from "express";
import { container } from "tsyringe";
import multer from "multer";
//
import { multerConfig } from "@config/upload";
import CreateUser from "@modules/users/services/CreateUser";
import UpdateUserAvatar from "@modules/users/services/UpdateUserAvatar";
import checkAuth from "../middleware/checkAuth";

const userRouter = Router();
const upload = multer(multerConfig);

userRouter.post("/", async (req, res) => {
  //> /users
  // Body fields: name, email, passwd
  const { name, email, passwd } = req.body;

  const createUser = container.resolve(CreateUser);

  const user = await createUser.execute({
    name,
    email,
    passwd,
  });
  return res.send(user);
});

userRouter.post(
  "/avatar",
  checkAuth,
  upload.single("avatar"),
  async (req, res) => {
    //---> /users/avatar
    if (!req.file)
      return res.status(401).json({ error: "Invalid or missing file." });

    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const { avatar, name } = await updateUserAvatar.execute({
      userId: req.userId,
      avatarName: req.file.filename,
    });

    res.json({ avatar, name });
  }
);

export default userRouter;
