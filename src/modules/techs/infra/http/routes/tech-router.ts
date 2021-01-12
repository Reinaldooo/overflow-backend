import { Router } from "express";
//
import checkAuth from "../middleware/checkAuth";
import TechsController from "../controllers/TechsCTRL";
import ListTopTechsCTRL from "../controllers/ListTopTechsCTRL";

const techsController = new TechsController();
const listTopTechsCTRL = new ListTopTechsCTRL();
const techRouter = Router();
techRouter.use(checkAuth);

//---> /techs/top
techRouter.get("/top", listTopTechsCTRL.index);
//---> /techs
techRouter.post("/", techsController.create);

export default techRouter;
