import { Router } from "express";
//
import eventsRouter from "@modules/events/infra/http/routes/events-router";
import userRouter from "@modules/users/infra/http/routes/user-router";
import sessionRouter from "@modules/users/infra/http/routes/session-router";

const routes = Router();

routes.use("/events", eventsRouter);
routes.use("/users", userRouter);
routes.use("/session", sessionRouter);

export default routes;
