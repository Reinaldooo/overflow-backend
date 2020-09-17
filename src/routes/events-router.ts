import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
//
import EventsRepository from "../repositories/EventsRepository";
import CreateEvent from "../services/CreateEvent";
import { parse } from "path";

const eventsRouter = Router();

eventsRouter.get("/", async (_, res) => {
  const eventsRepository = getCustomRepository(EventsRepository);
  const events = await eventsRepository.find();
  return res.json(events);
});

eventsRouter.post("/", async (req, res) => {
  try {
    const { user, date } = req.body;

    const parsedDate = parseISO(date);

    const createEvent = new CreateEvent();

    const event = await createEvent.execute({
      date: parsedDate,
      user,
    });

    return res.json(event);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default eventsRouter;
