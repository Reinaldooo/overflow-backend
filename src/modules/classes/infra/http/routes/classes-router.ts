import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import ClassesController from "../controllers/ClassesController";
import ListUserClassesController from "../controllers/ListUserClassesController";

const classesController = new ClassesController();
const listUserClassesController = new ListUserClassesController();
const classesRouter = Router();

classesRouter.use(checkAuth);

//---> /classes
classesRouter.get("/", classesController.index);
//---> /classes/me
classesRouter.get("/me", listUserClassesController.index);
//---> /classes
classesRouter.post("/", classesController.create);

export default classesRouter;
