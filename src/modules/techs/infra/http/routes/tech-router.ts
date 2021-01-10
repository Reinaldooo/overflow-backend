import { Router } from "express";
//
import checkAuth from "../middleware/checkAuth";
import TechsController from "../controllers/TechsController";

const techsController = new TechsController();
const techRouter = Router();
techRouter.use(checkAuth);

//---> /users
techRouter.post("/", techsController.create);

export default techRouter;
