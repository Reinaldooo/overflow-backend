import { Router } from "express";
import multer from "multer";
//
import { multerConfig } from "@config/upload";
import CreateUser from "@services/CreateUser";
import UpdateUserAvatar from "@services/UpdateUserAvatar";
import checkAuth from "../middleware/checkAuth";

const userRouter = Router();
const upload = multer(multerConfig);

userRouter.post("/", async (req, res) => {
  //---> /users
  // Body fields: name, email, passwd
  try {
    const { name, email, passwd } = req.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({
      name,
      email,
      passwd,
    });
    return res.send(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

userRouter.post(
  "/avatar",
  checkAuth,
  upload.single("avatar"),
  async (req, res) => {
    //---> /users/avatar
    if (!req.file)
      return res.status(401).json({ error: "Invalid or missing file." });
    try {
      const updateUserAvatar = new UpdateUserAvatar();

      const { avatar, name } = await updateUserAvatar.execute({
        userId: req.userId,
        avatarName: req.file.filename,
      });

      res.json({ avatar, name });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

export default userRouter;
