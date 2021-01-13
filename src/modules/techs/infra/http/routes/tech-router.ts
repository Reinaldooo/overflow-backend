import { Router } from "express";
//
import checkAuth from "../middleware/checkAuth";
import TechsController from "../controllers/TechsCTRL";

const techsController = new TechsController();
const techRouter = Router();
techRouter.use(checkAuth);

//---> /techs
techRouter.post("/", techsController.create);
//---> /techs/search
techRouter.post("/search", techsController.index);

export default techRouter;
