import { Router } from "express";
import multer from "multer";
//
import { multerConfig } from "@config/upload";
import checkAuth from "../middleware/checkAuth";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userRouter = Router();
const upload = multer(multerConfig);

//---> /users
userRouter.post("/", usersController.create);
//---> /users/avatar
userRouter.post(
  "/avatar",
  checkAuth,
  upload.single("avatar"),
  userAvatarController.update
);

export default userRouter;
