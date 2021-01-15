import { Router } from "express";
import { celebrate, Joi } from "celebrate";
//
import checkAuth from "../middleware/checkAuth";
import TechsController from "../controllers/TechsCTRL";

const techsController = new TechsController();
const techRouter = Router();
techRouter.use(checkAuth);

//---> /techs
techRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(3).required(),
      image: Joi.string().required(),
    }),
  }),
  techsController.create
);
//---> /techs/search
techRouter.post(
  "/search",
  celebrate({
    body: {
      searchName: Joi.string().min(3).required(),
    },
  }),
  techsController.index
);

export default techRouter;
