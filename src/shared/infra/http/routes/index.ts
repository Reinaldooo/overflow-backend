import { Router } from "express";
//
import eventsRouter from "@modules/events/infra/http/routes/events-router";
import userRouter from "@modules/users/infra/http/routes/user-router";
import sessionRouter from "@modules/users/infra/http/routes/session-router";
import passwdRouter from "@modules/users/infra/http/routes/password-router";
import profileRouter from "@modules/users/infra/http/routes/profile-router";
import calendarRouter from "@modules/calendars/infra/http/routes/calendars-router";

const routes = Router();

routes.use("/events", eventsRouter);
routes.use("/users", userRouter);
routes.use("/session", sessionRouter);
routes.use("/passwd", passwdRouter);
routes.use("/profile", profileRouter);
routes.use("/calendars", calendarRouter);

export default routes;
