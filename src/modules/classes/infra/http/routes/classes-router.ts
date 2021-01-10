import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import ClassesController from "../controllers/ClassesController";

const classesController = new ClassesController();
const classesRouter = Router();

classesRouter.use(checkAuth);

//---> /classes
classesRouter.get("/", classesController.index);

//---> /classes
classesRouter.post("/", classesController.create);

export default classesRouter;
