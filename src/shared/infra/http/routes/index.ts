import { Router } from "express";
//
import classesRouter from "@modules/classes/infra/http/routes/classes-router";
import userRouter from "@modules/users/infra/http/routes/user-router";
import sessionRouter from "@modules/users/infra/http/routes/session-router";
import passwdRouter from "@modules/users/infra/http/routes/password-router";
import profileRouter from "@modules/users/infra/http/routes/profile-router";
import techRouter from "@modules/techs/infra/http/routes/tech-router";

const routes = Router();

routes.use("/classes", classesRouter);
routes.use("/users", userRouter);
routes.use("/session", sessionRouter);
routes.use("/passwd", passwdRouter);
routes.use("/profile", profileRouter);
routes.use("/techs", techRouter);

export default routes;
