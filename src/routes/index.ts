import { Router } from "express";
//
import eventsRouter from "./events-router";
import userRouter from "./user-router";
import sessionRouter from "./session-router";

const routes = Router();

routes.use("/events", eventsRouter);
routes.use("/users", userRouter);
routes.use("/session", sessionRouter);

export default routes;
