import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
//
import uploadConfig from "@config/upload";
import checkAuth from "../middleware/checkAuth";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userRouter = Router();
const upload = multer(uploadConfig.multer);

//---> /users
userRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      passwd: Joi.string().min(3).required(),
    }),
  }),
  usersController.create
);
//---> /users/search
userRouter.post(
  "/search",
  celebrate({
    body: Joi.object().keys({
      searchName: Joi.string().min(3).required(),
    }),
  }),
  usersController.index
);
//---> /users/avatar
userRouter.post(
  "/avatar",
  checkAuth,
  upload.single("avatar"),
  userAvatarController.update
);

export default userRouter;
