import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import EventsController from "../controllers/EventsController";

const eventsController = new EventsController();
const eventsRouter = Router();

eventsRouter.use(checkAuth);

//---> /events
eventsRouter.get("/", eventsController.index);

//---> /events
eventsRouter.post("/", eventsController.create);

export default eventsRouter;
