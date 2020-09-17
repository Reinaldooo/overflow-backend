import { Router } from "express";
//
import eventsRouter from "./events-router";
import userRouter from "./user-router";

const routes = Router();

routes.use("/events", eventsRouter);
routes.use("/users", userRouter);

export default routes;
