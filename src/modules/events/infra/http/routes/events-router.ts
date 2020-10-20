import { Router } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
//
import CreateEvent from "@modules/events/services/CreateEvent";
import checkAuth from "@modules/users/infra/http/middleware/checkAuth";

const eventsRouter = Router();

eventsRouter.use(checkAuth);

// eventsRouter.get("/", async (_, res) => {
//   //---> /events
//   // Token required
//   const events = await eventsRepository.find();
//   return res.json(events);
// });

eventsRouter.post("/", async (req, res) => {
  //---> /events
  // Token required
  // Body fields: userId, date
  const { userId, date } = req.body;

  const parsedDate = parseISO(date);

  const createEvent = container.resolve(CreateEvent);

  const event = await createEvent.execute({
    date: parsedDate,
    userId,
  });

  return res.json(event);
});

export default eventsRouter;
