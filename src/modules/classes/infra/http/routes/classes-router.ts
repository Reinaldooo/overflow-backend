import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import ClassesController from "../controllers/ClassesController";
import ListMyClassesController from "../controllers/ListMyClassesController";
import ListTutorClassesController from "../controllers/ListTutorClassesController";
import ListClassesByTechCTRL from "../controllers/ListClassesByTechCTRL";
import EnrollmentsController from "../controllers/EnrollmentsController";
import ListTopTechsCTRL from "../controllers/ListTopTechsCTRL";
import ListTopTutorsCTRL from "../controllers/ListTopTutorsCTRL";

const classesController = new ClassesController();
const listMyClassesController = new ListMyClassesController();
const listTutorClassesController = new ListTutorClassesController();
const enrollmentsController = new EnrollmentsController();
const listClassesByTechCTRL = new ListClassesByTechCTRL();
const listTopTechsCTRL = new ListTopTechsCTRL();
const listTopTutorsCTRL = new ListTopTutorsCTRL();
const classesRouter = Router();

classesRouter.use(checkAuth);

//---> /classes
classesRouter.get("/", classesController.index);
//---> /classes/me
classesRouter.get("/me", listMyClassesController.index);
//---> /classes/tutor
classesRouter.get("/tutor", listTutorClassesController.index);
//---> /classes/tutors/top
classesRouter.get("/tutors/top", listTopTutorsCTRL.index);
//---> /classes/techs/top
classesRouter.get("/techs/top", listTopTechsCTRL.index);
//---> /classes/techs/:techName
classesRouter.get("/tech/:techName", listClassesByTechCTRL.index);
//---> /classes
classesRouter.post("/", classesController.create);
//---> /classes/students
classesRouter.post("/students", enrollmentsController.create);
//---> /classes/students
classesRouter.delete("/students", enrollmentsController.delete);

export default classesRouter;
