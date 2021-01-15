import { Router } from "express";
import { celebrate, Joi } from "celebrate";
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
//---> /classes
classesRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      date: Joi.date().required(),
      techs: Joi.array().items(Joi.string().min(3).required()),
      description: Joi.string().min(3).required(),
    }),
  }),
  classesController.create
);
//---> /classes/me
classesRouter.get("/me", listMyClassesController.index);
//---> /classes/tutor/:tutorId
classesRouter.get(
  "/tutor/:tutorId",
  celebrate({
    params: {
      tutorId: Joi.string().uuid().required(),
    },
  }),
  listTutorClassesController.index
);
//---> /classes/tutors/top
classesRouter.get("/tutors/top", listTopTutorsCTRL.index);
//---> /classes/techs/top
classesRouter.get("/techs/top", listTopTechsCTRL.index);
//---> /classes/techs/:techName
classesRouter.get(
  "/tech/:techName",
  celebrate({
    params: {
      techName: Joi.string().min(3).required(),
    },
  }),
  listClassesByTechCTRL.index
);
//---> /classes/:classId
classesRouter.put(
  "/:classId",
  celebrate({
    params: {
      classId: Joi.string().uuid().required(),
    },
    body: Joi.object().keys({
      date: Joi.date().required(),
      techs: Joi.array().items(Joi.string().min(3).required()),
      description: Joi.string().min(3).required(),
    }),
  }),
  classesController.update
);
//---> /classes/:classId
classesRouter.delete(
  "/:classId",
  celebrate({
    params: {
      classId: Joi.string().uuid().required(),
    },
  }),
  classesController.delete
);
//---> /classes/:classId/students
classesRouter.post(
  "/:classId/students",
  celebrate({
    params: {
      classId: Joi.string().uuid().required(),
    },
    body: Joi.object().keys({
      tutorId: Joi.string().uuid().required(),
    }),
  }),
  enrollmentsController.create
);
//---> /classes/:classId/students
classesRouter.delete(
  "/:classId/students",
  celebrate({
    params: {
      classId: Joi.string().uuid().required(),
    },
  }),
  enrollmentsController.delete
);

export default classesRouter;
