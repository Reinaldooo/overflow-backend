import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
// This function is used to load repos that i created (custom)
// If a repository is the stantard without custom methods, i can just use "getRepository"
//
import EventsRepository from "../repositories/EventsRepository";
import CreateEvent from "@services/CreateEvent";
import checkAuth from "../middleware/checkAuth";

const eventsRouter = Router();

eventsRouter.use(checkAuth);

eventsRouter.get("/", async (_, res) => {
  //> /events
  // Token required
  const eventsRepository = getCustomRepository(EventsRepository);
  const events = await eventsRepository.find();
  return res.json(events);
});

eventsRouter.post("/", async (req, res) => {
  //> /events
  // Token required
  // Body fields: userId, date
  try {
    const { userId, date } = req.body;

    const parsedDate = parseISO(date);

    const createEvent = new CreateEvent();

    const event = await createEvent.execute({
      date: parsedDate,
      userId,
    });

    return res.json(event);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default eventsRouter;
