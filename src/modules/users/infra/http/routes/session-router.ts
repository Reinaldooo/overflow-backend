import { Router } from "express";
//
import SessionsController from "../controllers/SessionsController";

const sessionsController = new SessionsController();
const sessionRouter = Router();

//---> /session
sessionRouter.post("/", sessionsController.create);

export default sessionRouter;
