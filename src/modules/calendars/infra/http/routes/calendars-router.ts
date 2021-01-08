import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import CalendarsController from "../controllers/CalendarsController";

const eventsController = new CalendarsController();
const eventsRouter = Router();

eventsRouter.use(checkAuth);

//---> /calendars
eventsRouter.get("/", eventsController.index);

//---> /calendars
eventsRouter.post("/", eventsController.create);

export default eventsRouter;
