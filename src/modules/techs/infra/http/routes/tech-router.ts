import { Router } from "express";
import { celebrate, Joi } from "celebrate";
//
import checkAuth from "../middleware/checkAuth";
import TechsCTRL from "../controllers/TechsCTRL";
import SearchTechsCTRL from "../controllers/SearchTechsCTRL";

const techsCTRL = new TechsCTRL();
const searchTechsCTRL = new SearchTechsCTRL();
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
  techsCTRL.create
);
//---> /techs/search
techRouter.post(
  "/search",
  celebrate({
    body: {
      searchName: Joi.string().min(3).required(),
    },
  }),
  searchTechsCTRL.index
);

export default techRouter;
