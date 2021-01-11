import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import ClassesController from "../controllers/ClassesController";
import ListMyClassesController from "../controllers/ListMyClassesController";
import ListTutorClassesController from "../controllers/ListTutorClassesController";

const classesController = new ClassesController();
const listMyClassesController = new ListMyClassesController();
const listTutorClassesController = new ListTutorClassesController();
const classesRouter = Router();

classesRouter.use(checkAuth);

//---> /classes
classesRouter.get("/", classesController.index);
//---> /classes/me
classesRouter.get("/me", listMyClassesController.index);
//---> /classes/tutor
classesRouter.get("/tutor", listTutorClassesController.index);
//---> /classes
classesRouter.post("/", classesController.create);

export default classesRouter;
