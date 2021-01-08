import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import CalendarsController from "../controllers/CalendarsController";

const calendarsController = new CalendarsController();
const calendarsRouter = Router();

calendarsRouter.use(checkAuth);

//---> /calendars
calendarsRouter.get("/", calendarsController.index);

//---> /calendars/:calendarId
calendarsRouter.patch("/:calendarId", calendarsController.update);

//---> /calendars
calendarsRouter.post("/", calendarsController.create);

export default calendarsRouter;
