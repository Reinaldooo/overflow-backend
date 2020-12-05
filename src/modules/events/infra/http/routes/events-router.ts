import { Router } from "express";
//
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";
import EventsController from "../controllers/EventsController";

const eventsController = new EventsController();
const eventsRouter = Router();

eventsRouter.use(checkAuth);

// eventsRouter.get("/", async (_, res) => {
//   //---> /events
//   // Token required
//   const events = await eventsRepository.find();
//   return res.json(events);
// });

//---> /events
eventsRouter.post("/", eventsController.create);

export default eventsRouter;