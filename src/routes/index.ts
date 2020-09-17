import { Router } from "express";
//
import eventsRouter from "./events-router";

const routes = Router();

routes.use("/events", eventsRouter);

export default routes;
